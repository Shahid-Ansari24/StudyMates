/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      inter: ["Inter", "sans-serif"],
    },
    colors: {
      white: "#ffffff",
      offwhite: "#FEFFFE",
      black: "#000000",
      richblack: {
        1000: '#161C28',
        900: '#000814',
        800: '#050D18',
        700: '#2C333F',
        600: "#424854",
        300: '#838894',
        400: '#786F80',
        200: '#999DAA',
        100: "#AFB2BF",
        25: "#DBDDEA",
        5: "#F1F2FF",
        cardColor: '#161D29',
      },
      richblue: {
        100: '#45E5EA',
      },
      blue: {
        200: '#073A51',
        300: "#0F7A9D",
      },
      yellow: {
        50: '#FFD60A',
        25: '#EEAB2D',
      },
      puregreys: {
        5: "#F9F9F9",
      },
      caribbeangreen: {
        700: "#014A32",
        300: "#05A77B",
      },
      brown: {
        5: '#FFF4C4',
        50: '#FFD166',
        500: '#88662D'
      }
    },
    extend: {},
  },
  plugins: [],
}

