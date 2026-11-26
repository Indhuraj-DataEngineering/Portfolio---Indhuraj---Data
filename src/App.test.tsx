import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import App from "./App";
import { PORTFOLIO_TABS } from "./data/portfolioContent";

describe("Tabbed Portfolio Shell & Professional Content", () => {
  afterEach(() => {
    cleanup();
    window.location.hash = "";
  });

  it("renders Home tab by default with dot-free headline and toggles sound", () => {
    render(<App />);

    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1.textContent?.trim().endsWith(".")).toBe(false);

    const soundBtn = screen.getByRole("button", { name: /mute ui interaction sounds/i });
    expect(soundBtn).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(soundBtn);
    expect(screen.getByRole("button", { name: /enable ui interaction sounds/i })).toHaveAttribute(
      "aria-pressed",
      "false"
    );
  });

  it("switches through every tab and guarantees zero trailing dots on section headlines", () => {
    render(<App />);

    for (const tab of PORTFOLIO_TABS) {
      const desktopTab = document.getElementById(`tab-${tab.id}`);
      expect(desktopTab).not.toBeNull();
      fireEvent.click(desktopTab!);

      const headings = screen.getAllByRole("heading", { level: tab.id === "home" ? 1 : 2 });
      expect(headings.length).toBeGreaterThan(0);
      headings.forEach((heading) => {
        const text = heading.textContent?.trim() ?? "";
        expect(text.endsWith(".")).toBe(false);
      });
    }
  });
});
