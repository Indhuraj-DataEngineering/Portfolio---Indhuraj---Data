import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import App from "./App";
import { PORTFOLIO_TABS } from "./data/portfolioContent";

describe("Scrolling Portfolio Shell & Professional Content", () => {
  afterEach(() => {
    cleanup();
    window.location.hash = "";
  });

  it("renders all portfolio sections in a continuous scroll view with dot-free headlines and sound toggle", () => {
    render(<App />);

    for (const item of PORTFOLIO_TABS) {
      const section = document.getElementById(item.id);
      expect(section).not.toBeNull();
    }

    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1.textContent?.trim().endsWith(".")).toBe(false);

    const h2List = screen.getAllByRole("heading", { level: 2 });
    expect(h2List.length).toBeGreaterThanOrEqual(7);
    h2List.forEach((heading) => {
      const text = heading.textContent?.trim() ?? "";
      expect(text.endsWith(".")).toBe(false);
    });

    const soundBtn = screen.getByRole("button", { name: /mute ui interaction sounds/i });
    expect(soundBtn).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(soundBtn);
    expect(screen.getByRole("button", { name: /enable ui interaction sounds/i })).toHaveAttribute(
      "aria-pressed",
      "false"
    );
  });

  it("navigates across sections via header links and updates active location indicator", () => {
    render(<App />);

    for (const item of PORTFOLIO_TABS) {
      const navButton = document.getElementById(`nav-${item.id}`);
      expect(navButton).not.toBeNull();
      expect(navButton?.textContent?.trim()).toBe(item.label);

      fireEvent.click(navButton!);
      expect(navButton).toHaveAttribute("aria-current", "location");
      expect(window.location.hash).toBe(`#${item.id}`);
    }
  });
});
