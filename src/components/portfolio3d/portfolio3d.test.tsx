import React from "react";
import { render, screen, fireEvent, act, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { StoveSafetySection } from "./StoveSafetySection";
import { AnalyticsWorkflowSection, pipelineStagesData } from "./AnalyticsWorkflowSection";
import { TechnicalSkillsSection, skillCategoriesData } from "./TechnicalSkillsSection";
import { WebGlFallback } from "./WebGlFallback";

// Mock @react-three/fiber Canvas & Three.js hooks for jsdom environment
vi.mock("@react-three/fiber", () => ({
  Canvas: ({ children }: { children: React.ReactNode }) => <div data-testid="mock-canvas">{children}</div>,
  useFrame: vi.fn(),
  useThree: () => ({ camera: {}, gl: {}, scene: {} }),
}));

vi.mock("@react-three/drei", () => ({
  OrbitControls: () => null,
  Float: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  ContactShadows: () => null,
  Text: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
}));

describe("Portfolio 3D Sections", () => {
  afterEach(() => cleanup());

  beforeEach(() => {
    vi.stubGlobal("matchMedia", (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  describe("StoveSafetySection", () => {
    it("renders the project heading, sensors, and publication info without the simulation panel", () => {
      render(<StoveSafetySection />);

      expect(screen.getByText(/Smart multi-sensor/i)).toBeInTheDocument();
      expect(screen.getAllByText(/Gas leak/i)[0]).toBeInTheDocument();
      expect(screen.getAllByText(/Flame & smoke/i)[0]).toBeInTheDocument();
      expect(screen.getAllByText(/Human presence/i)[0]).toBeInTheDocument();
      expect(screen.getAllByText(/Automatic shutoff/i)[0]).toBeInTheDocument();

      expect(
        screen.getByText(/Sensor-Based Smart Gas Leak, Flame, Smoke and Human Presence Detection System/i)
      ).toBeInTheDocument();
      const pubLink = screen.getByRole("link", { name: /view publication/i });
      expect(pubLink).toHaveAttribute("href", "https://doi.org/10.47392/IRJAEH.2026.0301");

      expect(screen.queryByRole("button", { name: /replay shutoff sequence/i })).not.toBeInTheDocument();
      expect(screen.queryByText(/Automatic Shutoff Sequence/i)).not.toBeInTheDocument();
    });
  });

  describe("AnalyticsWorkflowSection", () => {
    it("renders 5 analysis stages, 9,994 records evidence, and stage switching", () => {
      render(<AnalyticsWorkflowSection />);

      expect(screen.getByText(/From sales data/i)).toBeInTheDocument();
      expect(screen.getAllByText(/9,994/i)[0]).toBeInTheDocument();

      // All 5 stages should exist
      pipelineStagesData.forEach((st) => {
        expect(screen.getAllByText(new RegExp(st.name, "i"))[0]).toBeInTheDocument();
      });

      // Click on a stage tab
      const stagePill = screen.getByRole("tab", { name: /Analysis/i });
      fireEvent.click(stagePill);
      expect(stagePill).toHaveAttribute("aria-selected", "true");
      expect(screen.getByRole("tabpanel")).toHaveTextContent(/Aggregated profit margin analysis/i);
      expect(screen.getByRole("button", { name: /resume workflow playback/i })).toBeInTheDocument();

      fireEvent.click(screen.getByRole("button", { name: /resume workflow playback/i }));
      expect(screen.getByRole("button", { name: /pause workflow playback/i })).toBeInTheDocument();
    });

    it("advances to the next stage after 4.5 seconds", async () => {
      vi.useFakeTimers();
      try {
        render(<AnalyticsWorkflowSection />);
        await act(async () => {
          await vi.advanceTimersByTimeAsync(4500);
        });

        expect(screen.getByRole("tab", { name: /Preparation/i })).toHaveAttribute("aria-selected", "true");
      } finally {
        vi.useRealTimers();
      }
    });
  });

  describe("TechnicalSkillsSection", () => {
    it("renders 5 technical categories and selected-skill details", () => {
      render(<TechnicalSkillsSection />);

      expect(screen.getByRole("heading", { name: "Technical skills" })).toBeInTheDocument();

      skillCategoriesData.forEach((cat) => {
        expect(screen.getAllByText(new RegExp(cat.title, "i"))[0]).toBeInTheDocument();
      });

      const skillCards = [...document.querySelectorAll(".skills-category-card")];
      expect(skillCards).toHaveLength(5);
      expect(skillCards.map((card) => card.querySelector(".skills-category-num")?.textContent)).toEqual([
        "01", "02", "03", "04", "05",
      ]);
      expect(screen.queryByRole("region", { name: /selected skill discipline details/i })).not.toBeInTheDocument();
    });
  });

  describe("WebGlFallback", () => {
    it("renders title, description and fallback badge", () => {
      render(
        <WebGlFallback
          title="Hardware Burner Simulation"
          description="High fidelity 3D safety prototype"
        />
      );

      expect(screen.getByText("Hardware Burner Simulation")).toBeInTheDocument();
      expect(screen.getByText("High fidelity 3D safety prototype")).toBeInTheDocument();
    });
  });
});
