import { build as esbuildBundle } from "esbuild";
import type { Plugin } from "vite";
import { defineConfig } from "vitest/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

const VENDOR_IMPORT_PLACEHOLDER = "/__vreact_vendor__";
const SHIM_PREFIX = "\0react-shim:";

const REACT_SHIM_CONFIGS: Record<string, { exportKey: string; namedExports: string[] }> = {
  react: {
    exportKey: "__react",
    namedExports: [
      "Children", "Component", "Fragment", "Profiler", "PureComponent", "StrictMode", "Suspense",
      "__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE", "__COMPILER_RUNTIME",
      "act", "cache", "captureOwnerStack", "cloneElement", "createContext", "createElement",
      "createRef", "forwardRef", "isValidElement", "lazy", "memo", "startTransition",
      "unstable_useCacheRefresh", "use", "useActionState", "useCallback", "useContext",
      "useDebugValue", "useDeferredValue", "useEffect", "useId", "useImperativeHandle",
      "useInsertionEffect", "useLayoutEffect", "useMemo", "useOptimistic", "useReducer",
      "useRef", "useState", "useSyncExternalStore", "useTransition", "version",
    ],
  },
  "react/jsx-runtime": {
    exportKey: "__jsxRuntime",
    namedExports: ["Fragment", "jsx", "jsxs"],
  },
  "react/jsx-dev-runtime": {
    exportKey: "__jsxDevRuntime",
    namedExports: ["Fragment", "jsxDEV"],
  },
  "react-dom": {
    exportKey: "__reactDom",
    namedExports: [
      "__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE",
      "createPortal", "flushSync", "preconnect", "prefetchDNS", "preinit", "preinitModule",
      "preload", "preloadModule", "requestFormReset", "unstable_batchedUpdates",
      "useFormState", "useFormStatus", "version",
    ],
  },
  "react-dom/client": {
    exportKey: "__reactDomClient",
    namedExports: ["createRoot", "hydrateRoot", "version"],
  },
};

function shortHash(text: string): string {
  let hash = 0x811c9dc5;
  for (let i = 0; i < text.length; i += 1) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}

/**
 * Emits React 19 + ReactDOM as a single pre-bundled ESM vendor chunk via esbuild
 * so Rollup avoids parsing 15k+ lines of CommonJS React internals on Windows/OneDrive
 * while keeping one shared React runtime instance across all imports.
 */
function prebundleReactVendor(): Plugin {
  let rootDir = ".";
  let baseUrl = "/";
  let vendorPromise: Promise<{ fileName: string; code: string }> | null = null;

  const ensureVendorBundle = () => {
    if (vendorPromise) return vendorPromise;

    vendorPromise = (async () => {
      const entryLines = Object.entries(REACT_SHIM_CONFIGS).map(
        ([pkg, cfg]) => `export const ${cfg.exportKey} = require(${JSON.stringify(pkg)});`,
      );
      const result = await esbuildBundle({
        stdin: {
          contents: entryLines.join("\n"),
          resolveDir: rootDir,
          loader: "js",
        },
        bundle: true,
        minify: true,
        format: "esm",
        write: false,
        platform: "browser",
        define: { "process.env.NODE_ENV": '"production"' },
      });

      const code = result.outputFiles[0].text;
      const hash = shortHash(code);
      return {
        fileName: `assets/react-vendor-${hash}.js`,
        code,
      };
    })();

    return vendorPromise;
  };

  return {
    name: "prebundle-react-vendor",
    apply: "build",
    enforce: "pre",
    configResolved(config) {
      rootDir = config.root;
      baseUrl = config.base.endsWith("/") ? config.base : `${config.base}/`;
    },
    buildStart() {
      vendorPromise = null;
    },
    resolveId(source) {
      if (source === VENDOR_IMPORT_PLACEHOLDER) {
        return { id: VENDOR_IMPORT_PLACEHOLDER, external: true };
      }
      if (source in REACT_SHIM_CONFIGS) {
        return `${SHIM_PREFIX}${source}`;
      }
      return null;
    },
    load(id) {
      if (!id.startsWith(SHIM_PREFIX)) return null;
      const pkg = id.slice(SHIM_PREFIX.length);
      const cfg = REACT_SHIM_CONFIGS[pkg];
      if (!cfg) return null;

      return [
        `import { ${cfg.exportKey} as __m } from "${VENDOR_IMPORT_PLACEHOLDER}";`,
        `export default __m;`,
        `export const { ${cfg.namedExports.join(", ")} } = __m;`,
      ].join("\n");
    },
    async generateBundle(_options, bundle) {
      const vendor = await ensureVendorBundle();
      const vendorBaseName = vendor.fileName.split("/").pop()!;

      this.emitFile({
        type: "asset",
        fileName: vendor.fileName,
        source: vendor.code,
      });

      for (const item of Object.values(bundle)) {
        if (item.type === "chunk" && item.code.includes(VENDOR_IMPORT_PLACEHOLDER)) {
          const importTarget = item.fileName.startsWith("assets/")
            ? `./${vendorBaseName}`
            : `${baseUrl}${vendor.fileName}`;
          item.code = item.code.split(VENDOR_IMPORT_PLACEHOLDER).join(importTarget);
        } else if (
          item.type === "asset" &&
          item.fileName === "index.html" &&
          typeof item.source === "string"
        ) {
          const preloadTag = `    <link rel="modulepreload" crossorigin href="${baseUrl}${vendor.fileName}">\n`;
          item.source = item.source.replace("  </head>", `${preloadTag}  </head>`);
        }
      }
    },
  };
}

function toLucideKebab(name: string): string {
  return name
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([a-zA-Z])(\d)/g, "$1-$2")
    .toLowerCase();
}

/**
 * Rewrites barrel `lucide-react` imports to direct ESM icon files during
 * production builds so Rollup skips parsing 1,500+ unused icon modules.
 */
function optimizeLucideImports(): Plugin {
  return {
    name: "optimize-lucide-imports",
    apply: "build",
    transform(code, id) {
      if (id.includes("node_modules") || !code.includes("lucide-react")) {
        return null;
      }

      const importRegex = /import\s*\{([^}]+)\}\s*from\s*['"]lucide-react['"];?/g;
      let changed = false;
      const nextCode = code.replace(importRegex, (fullMatch, specifiersRaw: string) => {
        const specs = specifiersRaw
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);

        const lines: string[] = [];
        for (const spec of specs) {
          if (spec.startsWith("type ")) {
            return fullMatch;
          }
          const [origName, alias] = spec.split(/\s+as\s+/).map((p) => p.trim());
          if (!origName) continue;
          const fileSlug = toLucideKebab(origName);
          lines.push(`import ${alias || origName} from "lucide-react/dist/esm/icons/${fileSlug}.js";`);
        }

        if (lines.length === 0) return fullMatch;
        changed = true;
        return lines.join("\n");
      });

      return changed ? { code: nextCode, map: null } : null;
    },
  };
}

export default defineConfig({
  plugins: [prebundleReactVendor(), react(), optimizeLucideImports(), tailwindcss()],
  test: {
    environment: "jsdom",
    setupFiles: "./src/testSetup.ts",
    css: true,
  },
});
