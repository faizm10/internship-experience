import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        sans: ["DM Sans", "system-ui", "sans-serif"],
        handwritten: ["Caveat", "cursive"],
      },
      colors: {
        cream: {
          50: "#FDFAF5",
          100: "#F7F3EC",
          200: "#EFE8DC",
          300: "#E3D8C8",
        },
        charcoal: {
          DEFAULT: "#1A1918",
          muted: "#6B645C",
          light: "#9E9890",
        },
        amber: {
          accent: "#E8622A",
          warm: "#F0884A",
          pale: "#FDF0E8",
        },
      },
      boxShadow: {
        polaroid: "0 4px 32px rgba(0,0,0,0.14), 0 1px 4px rgba(0,0,0,0.08)",
        "polaroid-hover": "0 16px 64px rgba(0,0,0,0.22), 0 2px 8px rgba(0,0,0,0.1)",
        spotlight: "0 0 0 9999px rgba(0,0,0,0.75)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "grain": "grain 0.5s steps(1) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-2%, -3%)" },
          "20%": { transform: "translate(3%, 1%)" },
          "30%": { transform: "translate(-1%, 4%)" },
          "40%": { transform: "translate(2%, -2%)" },
          "50%": { transform: "translate(-3%, 2%)" },
          "60%": { transform: "translate(1%, -4%)" },
          "70%": { transform: "translate(-2%, 3%)" },
          "80%": { transform: "translate(3%, -1%)" },
          "90%": { transform: "translate(-1%, 2%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
