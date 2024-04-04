/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        'primary': '#19191B',
        'main-text': '#09080A',
        'sub-text': '#70707A',
        snow: {
          'bg': '#FEFFFE',
          'text': '#FAFAFA'
        }
      }
    },
  },
  plugins: [],
}

