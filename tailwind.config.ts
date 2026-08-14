import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#f5fbff",
          100: "#e6f4fd",
          200: "#ffffff",
        },
        toast: {
          crust: "#152233",
          bread: "#38bdf8",
          DEFAULT: "#0ea5e9",
        },
        brand: {
          red: "#dc4a3d",
          green: "#1f9d5c",
          gold: "#ffcc00",
          ink: "#241d02",
          sky: "#0ea5e9",
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
