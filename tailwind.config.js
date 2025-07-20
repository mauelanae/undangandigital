/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        dmsans : ['DM Sans', 'sans-serif'],
        spicyrice : ['Spicy Rice', 'cursive'],
      },
      colors: {
        blue : '#0F0E83',
      }
    },
  },
  plugins: [],
}

