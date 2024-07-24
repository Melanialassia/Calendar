/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        'gray-transparent': 'rgba(192, 192, 192, 0.5)',
      },
      boxShadow: {
        'inset-custom': 'inset 0px 4px 6px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'rotate-scale': 'rotate-scale 0.5s ease-in-out',
      },
      keyframes: {
        'rotate-scale': {
          '0%': {
            transform: 'rotate(0deg) scale(1)', 
          },
          '100%': {
            transform: 'rotate(180deg) scale(1.2)', 
          },
        },
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
],
}