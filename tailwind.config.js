/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Nunito Sans"', ...fontFamily.sans],
        heading: ['"Lexend"', ...fontFamily.sans],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        plateShareTheme: { // Light Theme
          "primary": "#FF7F50",
          "secondary": "#4CAF50",
          "accent": "#FFE082",
          "neutral": "#212121",
          "base-100": "#D4EDDA", // Main background
          "base-200": "#FFF8F0", // Slightly darker bg for cards
          "base-300": "#F5EFE1", // Borders
          "base-content": "#212121", // Main text
          "info": "#29B6F6",
          "success": "#4CAF50",
          "warning": "#FFE082",
          "error": "#FF6B6B",
        },
      },
    ],
  },
}