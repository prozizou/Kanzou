import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#120E09",
        surface: "#1B140D",
        surface2: "#241A10",
        line: "#3A2E1F",
        parchment: "#EFE7D8",
        muted: "#9C8F76",
        brass: "#C9A15A",
        brassSoft: "#8A7038",
        alert: "#B4483A",
      },
      fontFamily: {
        display: ["var(--font-amiri)", "serif"],
        body: ["var(--font-plex)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      backgroundImage: {
        grain: "radial-gradient(circle at 20% 20%, rgba(201,161,90,0.06), transparent 40%), radial-gradient(circle at 80% 60%, rgba(201,161,90,0.05), transparent 45%)",
      },
    },
  },
  plugins: [],
};

export default config;
