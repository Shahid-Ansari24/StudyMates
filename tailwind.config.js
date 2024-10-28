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
        5: "#FFF970",
        25: "#FFE83D",
        50: "#FFD60A",
        100: "#E7C009",
        200: "#CFAB08",
        300: "#B69507",
        400: "#9E8006",
        500: "#866A04",
        600: "#6E5503",
        700: "#553F02",
        800: "#3D2A01",
        900: "#251400",
      },
      puregreys: {
        5: "#F9F9F9",
      },
      caribbeangreen: {
        5: "#C1FFFD",
        25: "#83F1DE",
        50: "#44E4BF",
        100: "#06D6A0",
        200: "#05BF8E",
        300: "#05A77B",
        400: "#049069",
        500: "#037957",
        600: "#026144",
        700: "#014A32",
        800: "#01321F",
        900: "#001B0D",
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

