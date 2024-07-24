/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        'gray-transparent': 'rgba(192, 192, 192, 0.5)' 
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
],
}