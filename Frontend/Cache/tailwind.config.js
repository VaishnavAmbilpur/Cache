/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        purple:{
          100: "#e0e5fd",
          200: "#483edd"
        },
        
'flush-orange': {
    '50': '#fffaec',
    '100': '#fff4d3',
    '200': '#ffe5a5',
    '300': '#ffd16d',
    '400': '#ffb232',
    '500': '#ff980a',
    '600': '#ff8000',
    '700': '#cc5d02',
    '800': '#a1480b',
    '900': '#823d0c',
    '950': '#461d04',
},

      },
      fontFamily:{
        roboto:["Roboto","sans-serif"],
        Static:["Static","sans-sertf"]
      },animation: {
        'gradient-move': 'gradient-move 8s ease-in-out infinite',
      },
      keyframes: {
        'gradient-move': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}

