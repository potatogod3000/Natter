/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ["./index.html", "./src/**/*.{vue,js}"],

    darkMode: "class",

    theme: {
        extend: {
            colors: {
                dark: "#252525",
                "dark-soft": "#333333",
                light: "#d6ebff",
                "light-soft": "#f2f9ff",
                accent: "#3366ff",
                "accent-light": "#5588ff",
            },
            fontFamily: {
                palanquin: ["Palanquin", "sans-serif"],
                montserrat: ["Montserrat", "sans-serif"],
            },
            container: {
                padding: "2rem",
                center: true,
            },
        },
    },

    plugins: [],
};
