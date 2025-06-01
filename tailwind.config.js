/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./app/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./components/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  // tailwind.config.js
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2A62F3", // Cobalt Blue
        },
        secondary: {
          DEFAULT: "#FF8C42", // Vivid Orange
        },
        highlight: {
          DEFAULT: "#FFC107", // Golden Yellow
        },
        background: {
          DEFAULT: "#F5F7FA", // Light Grayish White
        },
        surface: {
          DEFAULT: "#FFFFFF", // Pure White
        },
        text: {
          primary: "#212121", // Deep Charcoal Gray
          secondary: "#616161", // Medium Gray
        },
        border: {
          DEFAULT: "#E0E0E0", // Light Gray
        },
        error: {
          DEFAULT: "#D84315", // Warm Red
        },
        success: {
          DEFAULT: "#2E7D32", // Calming Green
        },
      },
      fontFamily: {
        sans: ["Lexend", "sans-serif"], // This makes Lexend the default
        normal: ["Lexend-Regular", "sans-serif"], // This makes Lexend the default
        bold: ["Lexend-Bold", "sans-serif"],
        semibold: ["Lexend-SemiBold", "sans-serif"],
      },
    },
  },

  plugins: [],
};
