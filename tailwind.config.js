import {colors as chartColors} from './apex.config';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
 
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        heroSection: "url('./public/index.jpg')",
        houses: "url('/img/Properties/default-bg.jpg')",
      },

      keyframes: {
        indicatorAnimation: {
          '0%': {
            height: 0,
          },

          '100%': {
            height: '100%',
          }
        },

        slideup: {
          '0%': {
            transform: "translateY(12px)",
            opacity: 0
          },
    
          '100%': {
            transform: "translateY(0)",
            opacity: 1,
          }
        }
      },

      animation: {
        'slideup-slow': 'slideup 0.5s ease-out',
        'slideup-fast': 'slideup 0.2s ease-out',
      },

      gridTemplateColumns: {
        inputComponentColumns: '1fr 3fr',
      },

      colors: {
        primary: "#e3a149",
        heating: chartColors.heat,
        electricity: chartColors.electric,
        water: chartColors.water,
      },

      screens: {
        xs: '360px',
      }
    },
  },
  plugins: [],
}