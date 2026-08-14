/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        link: '#ab4f00',
        hover: '#cc0000',
      },
      fontFamily: {
        // NB: "inter" is a legacy name from an earlier design pass that used
        // Inter for headings; it now points at Londrina Shadow.
        inter: ['"Londrina Shadow"', 'sans-serif'],
        main: ['"Atkinson Hyperlegible"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
