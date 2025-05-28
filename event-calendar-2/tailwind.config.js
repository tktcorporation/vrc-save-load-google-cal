/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // A common Shadcn recommendation
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    container: { // Recommended by Shadcn docs
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {},
  },
  plugins: [require('tailwindcss-animate')], // Correctly in array
}
