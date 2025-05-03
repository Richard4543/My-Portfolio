/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'sky',
    'day',
    'night'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
