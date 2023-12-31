/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: "Roboto",
      serif: "Playfair",
      mono: "Open Sans",
      body: "Roboto Slab",
    },
    extend: {},
  },
  plugins: [],
};
