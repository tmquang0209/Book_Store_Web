/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,jsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#1182c5",
                secondary: "#2aa6df",
            },
            container: {
                center: true,
                padding: {
                    DEFAULT: "1rem",
                    sm: "3rem",
                },
            },
            animation: {
                "spin-slow": "spin 40s linear infinite",
            },
        },
    },
    plugins: [],
};
