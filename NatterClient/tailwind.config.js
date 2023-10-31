/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "hero": "url('@/assets/images/hero-bg.png')"
      },
      colors: {
        "primary": "",
        "dark-primary": "",
        "secondary": "",
        "dark-secondary": "",
        "accent": ""
      },
      fontFamily: {
        palanquin: ['Palanquin', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      screens: {
        "wide": "1440px"
      }
    },
  },
  plugins: [],
}