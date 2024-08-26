import { transform } from 'framer-motion';

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "gradient-x": "gradient-x 5s ease infinite",
        "fade-in-down": "fade-in-down 0.5s ease-out forwards",
        "fade-in-up": "fade-in-up 0.5s ease-out forwards",
        "moveUp":"moveUp 6s ease-in-out infinite",
        "moveUpNormal":"moveUpNormal 3s ease-in-out forwards",
        "slideInFromRight": 'slideInFromRight 2s ease-in-out forwards',
        "slideInFromLeft": 'slideInFromLeft 2s ease-in-out forwards',
        backgroundImage: {
          'custom-gradient': 'linear-gradient(89deg, #ff7ac6, rgba(255, 189, 122, 0.8) 23%, rgba(195, 122, 255, 0.94) 50%, #4d67ff 75%, rgba(122, 255, 248, 0.82) 99%)',
        },

      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
        "fade-in-down": {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "moveUp": {
          "0%": { opacity: "0", transform: "translateY(200px)" },
          "50%": { opacity: "1", transform: "translateY(0px)" },
          "100%": { opacity: "0", transform: "translateY(200px)" },
        },
        "moveUpNormal": {
          "0%": { opacity: "0", transform: "translateY(200px)" },
          "100%": { opacity: "1", transform: "translateY(0px)" },
        },
        "slideInFromRight": {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        "slideInFromLeft": {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};
