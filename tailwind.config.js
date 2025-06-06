/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        manrope: ["Manrope", "sans-serif"],
      },
      colors: {
        green: {
          DEFAULT: "#133A30",
          50: "#81D6C0",
          100: "#71D1B8",
          200: "#53C6A9",
          300: "#3BB596",
          400: "#31967C",
          500: "#277763",
          600: "#1D5949",
          700: "#133A30",
          800: "#05100D",
          900: "#000000",
          950: "#000000",
        },
        "light-green": {
          DEFAULT: "#C9E4C5",
          50: "#FFFFFF",
          100: "#FFFFFF",
          200: "#FFFFFF",
          300: "#FDFEFD",
          400: "#E3F1E1",
          500: "#C9E4C5",
          600: "#A5D29F",
          700: "#82C078",
          800: "#5EAF52",
          900: "#498940",
          950: "#3F7637",
        },
      },
    },
  },
  plugins: [],
};
