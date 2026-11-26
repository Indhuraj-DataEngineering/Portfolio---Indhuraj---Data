import { build as esbuildBundle } from "esbuild";
import type { Plugin } from "vite";
import { defineConfig } from "vitest/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

const VIRTUAL_REACT_TARGETS: Record<
  string,
  { contents: string; external: string[] }
> = {
  react: {
    contents: `
      import * as ReactNS from "react";
      export default ReactNS;
      export const {
        Children, Component, Fragment, Profiler, PureComponent, StrictMode, Suspense,
        act, cache, captureOwnerStack, cloneElement, createContext, createElement, createRef,
        forwardRef, isValidElement, lazy, memo, startTransition, use, useActionState,
        useCallback, useContext, useDebugValue, useDeferredValue, useEffect, useId,
        useImperativeHandle, useInsertionEffect, useLayoutEffect, useMemo, useOptimistic,
        useReducer, useRef, useState, useSyncExternalStore, useTransition, version
      } = ReactNS;
    `,
    external: [],
  },
  "react/jsx-runtime": {
    contents: `
      import * as JsxRT from "react/jsx-runtime";
      export default JsxRT;
      export const { Fragment, jsx, jsxs } = JsxRT;
    `,
    external: ["react"],
  },
  "react/jsx-dev-runtime": {
    contents: `
      import * as JsxDevRT from "react/jsx-dev-runtime";
      export default JsxDevRT;
      export const { Fragment, jsxDEV } = JsxDevRT;
    `,
    external: ["react"],
  },
  "react-dom": {
    contents: `
      import * as ReactDomNS from "react-dom";
      export default ReactDomNS;
      export const {
        createPortal, flushSync, preconnect, prefetchDNS, preinit, preinitModule,
        preload, preloadModule, requestFormReset, version
      } = ReactDomNS;
    `,
    external: ["react"],
  },
  "react-dom/client": {
    contents: `
      import * as ReactDomClientNS from "react-dom/client";
      export default ReactDomClientNS;
      export const { createRoot, hydrateRoot, version } = ReactDomClientNS;
    `,
    external: ["react", "react-dom"],
  },
};

/**
 * Pre-bundles CommonJS React 19 entrypoints via esbuild during production builds
 * so Rollup avoids slow single-file CommonJS AST conversion on Windows/OneDrive.
 */
function prebundleReactForBuild(): Plugin {
  let rootDir = ".";
  const cache = new Map<string, string>();

  return {
    name: "prebundle-react-for-build",
    apply: "build",
    enforce: "pre",
    configResolved(config) {
      rootDir = config.root;
    },
    resolveId(source) {
      if (source in VIRTUAL_REACT_TARGETS) {
        return `\0virtual-react:${source}`;
      }
      return null;
    },
    async load(id) {
      if (!id.startsWith("\0virtual-react:")) return null;
      const pkg = id.slice("\0virtual-react:".length);
      const cached = cache.get(pkg);
      if (cached) return cached;

      const target = VIRTUAL_REACT_TARGETS[pkg];
      const result = await esbuildBundle({
        stdin: {
          contents: target.contents,
          resolveDir: rootDir,
          loader: "js",
        },
        bundle: true,
        format: "esm",
        write: false,
        platform: "browser",
        external: target.external,
        define: { "process.env.NODE_ENV": '"production"' },
      });

      const code = result.outputFiles[0].text;
      cache.set(pkg, code);
      return code;
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
  plugins: [prebundleReactForBuild(), react(), optimizeLucideImports(), tailwindcss()],
  test: {
    environment: "jsdom",
    setupFiles: "./src/testSetup.ts",
    css: true,
  },
});
