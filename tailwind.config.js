const { fontFamily } = require("tailwindcss/defaultTheme");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
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
        plateShareTheme: {
          primary: "#FF7F50",
          secondary: "#4CAF50",
          accent: "#FFE082",
          neutral: "#212121",
          "base-100": "#D4EDDA",
          "base-200": "#FFF8F0",
          "base-300": "#F5EFE1",
          "base-content": "#212121",
          info: "#29B6F6",
          success: "#4CAF50",
          warning: "#FFE082",
          error: "#FF6B6B",
        },
      },
    ],
  },
};
