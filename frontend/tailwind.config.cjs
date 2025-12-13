/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#E31E24', // Haldiram Red
        secondary: '#F4C75B', // Haldiram Yellow
        accent: '#FFF8E1', // Light Cream/Yellow bg
        dark: '#333333',
        light: '#FFFFFF',
        'haldiram-red': '#D32F2F',
        'haldiram-yellow': '#FFCA28',
      },
      backgroundImage: {
        'candy-gradient': 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 99%, #FECFEF 100%)',
        'lush-gradient': 'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)',
      }
    },
  },
  plugins: [],
}
