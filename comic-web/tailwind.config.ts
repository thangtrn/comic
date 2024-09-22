import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
        background: "var(--background-color)",
        text: {
          DEFAULT: "var(--text-color)",
          foreground: "var(--text-text-foreground-color)",
          secondary: "var(--subtext-color)",
        },
        accent: {
          DEFAULT: "var(--accent-color)",
        },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
      boxShadow: {
        header: "0 2px 8px var(--header-shadow)",
      },
      aspectRatio: {
        comic: "3 / 4",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
