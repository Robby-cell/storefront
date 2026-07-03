import { browser } from "$app/environment";

class ThemeState {
  accent = $state("blue");
  mode = $state("light");

  constructor() {
    if (browser) {
      this.accent = localStorage.getItem("theme-accent") || "blue";
      const savedMode = localStorage.getItem("theme-mode");
      this.mode =
        savedMode ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light");
      this.apply();
    }
  }

  setAccent(color: string) {
    this.accent = color;
    if (browser) localStorage.setItem("theme-accent", color);
    this.apply();
  }

  setMode(mode: "light" | "dark") {
    this.mode = mode;
    if (browser) localStorage.setItem("theme-mode", mode);
    this.apply();
  }

  apply() {
    if (browser) {
      document.documentElement.setAttribute("data-theme", this.accent);
      if (this.mode === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }
}

export const theme = new ThemeState();
