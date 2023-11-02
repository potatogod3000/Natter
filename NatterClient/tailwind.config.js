/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js}"
  ],
  theme: {
    extend: {
      colors: {
        "dark": "#1e1e20",
        "dark-soft": "#252529",
        "light": "#e3e3e5",
        "light-soft": "#f6f6f7",
        "accent": "#646cff"
      },
      fontFamily: {
        palanquin: ['Palanquin', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      container: {
        padding: "2rem",
        center: true
      }
    },
  },
  plugins: [],
}