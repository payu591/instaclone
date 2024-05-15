/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
    screens: {
      'sm': '480px',
      'md': '768px',
      'lg': '1279px',    
    },
  },
  plugins: [],
}

