import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#fffdf8",
          100: "#fdf6e9",
          200: "#f8e9c9",
        },
        toast: {
          crust: "#8a4b26",
          bread: "#e8b968",
          DEFAULT: "#c9702e",
        },
        brand: {
          red: "#b5231c",
          green: "#2f5233",
          gold: "#d4a017",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        steam: {
          "0%": { transform: "translateY(0) scaleX(1)", opacity: "0.6" },
          "50%": { transform: "translateY(-14px) scaleX(1.3)", opacity: "0.3" },
          "100%": { transform: "translateY(-28px) scaleX(1)", opacity: "0" },
        },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        steam: "steam 2.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
