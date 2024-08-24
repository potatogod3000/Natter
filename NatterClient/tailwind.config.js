/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,ts}"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                dark: "#252525",
                "dark-soft": "#333333",
                light: "#d6ebff",
                "light-soft": "#f2f9ff",
                accent: "#5588ff",
                "accent-light": "#77aaff",
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
