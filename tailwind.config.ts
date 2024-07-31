import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "6rem",
      },
    },
    extend: {
      colors: {
        primary: "#305080",
        light: "#D3D3D3",
        dark: "#000000",
        "bg-light": "#FBFBFB",
      },
    },
  },
  plugins: [],
};
export default config;
