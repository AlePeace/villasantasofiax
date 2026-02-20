/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        montecatini: ["'var(--font-montecatini)'", "serif"],
        nunito: ["'var(--font-nunito)'", "sans-serif"],
      },
      colors: {
        red: "#C53452",
        green: "#57A691",
        ocra: "#EFAC53",
        blue: "#1F5189",
        lightgreen: "#A0B898",
        lightocra: "#FFAB67",
        lightblue: "#00ABD5",
      }
    },
  },
  plugins: [],
};
