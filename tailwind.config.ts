import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'selector',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors:{
        primary:"#FF6B05",
        primary_more:"#D95800",
        primary_less:"#FF7A1F",
        mygray:"#9c9f9e",
        mygray_more:"#7a7e7d",
        secondary:"#171C22",
        secondary_more:"#0C1014",
        secondary_less:"#2E343B",
        success:"#1CD174",
        danger:"#FF5658",
        light:"#FFFFFF",
        dark:"#000000",
        black_rgba:'rgba(0, 0, 0, 0.7)',
        gray_rgba:'rgba(46, 52, 59, 0.7)',
        white_rgba:'rgba(255, 255, 255, 0.7)',
        secondary_rgba:'rgba(23,28,34, 0.9)',
        placeholder:'#9CA3AF'
      }
    },
  },
  plugins: [],
};
export default config;
