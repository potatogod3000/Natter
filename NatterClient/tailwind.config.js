/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js}"
  ],
  theme: {
    extend: {
      colors: {
        darkest: '#352F44',
        darker: '#5C5470',
        lighter: '#B9B4C7',
        lightest: '#FAF0E6',
      }
    },
  },
  plugins: [],
}

