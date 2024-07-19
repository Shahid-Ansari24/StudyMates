/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      white: "#ffffff",
      black: "#000000",
      richblack: {
        900: '#000814',
        800: '#050D18',
        700: '#2C333F',
        300: '#161D29',
        400: '#786F80',
        200: '#999DAA',
      },
      richblue: {
        100: '#45E5EA',
      },
      blue: {
        200: '#073A51',
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
      }
    },
    extend: {},
  },
  plugins: [],
}

