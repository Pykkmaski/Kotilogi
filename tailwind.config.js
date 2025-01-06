const tailwindColors = require('tailwindcss/colors');

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
        houses: "url('/img/Properties/default-bg.jpg')",
        'about-hero': "url('/img/about_page/bridge.jpg')",
        'index-hero': "url('/index_blur.jpg')",
        kitchen: "url('/img/kitchen.jpg')",
        room: "url('/img/room.jpg')",
        houses: "url('/houses.jpg')",
        'about-profile': "url('/img/about_page/portrait.jpg')",
        'about-house': "url('/img/about_page/house.jpg')",
        'hero-logo': "url('/img/hero_logo.png')",
        balloons: "url('/img/balloons.jpg')",
        cta: "url('/images/cta.avif')",
      },

      keyframes: {
        indicatorAnimation: {
          '0%': {
            height: 0,
          },

          '100%': {
            height: '100%',
          },
        },

        slideup: {
          '0%': {
            transform: 'translateY(12px)',
            opacity: 0,
          },

          '100%': {
            transform: 'translateY(0)',
            opacity: 1,
          },
        },
      },

      animation: {
        'slideup-slow': 'slideup 0.5s ease-out',
        'slideup-fast': 'slideup 0.2s ease-out',
      },

      gridTemplateColumns: {
        inputComponentColumns: '1fr 3fr',
      },

      colors: {
        ...require('./colors'),
      },

      screens: {
        xs: '360px',
      },
    },
  },
  plugins: [
    function ({ addUtilities, theme }) {
      addUtilities({
        '.px-wf-index': {
          paddingRight: '15rem',
          paddingLeft: '15rem',
        },

        '.py-wf-index': {
          paddingTop: '8rem',
          paddingBottom: '8rem',
        },

        //Responsive padding for mobile screens
        [`@media (max-width: ${theme('screens.lg')})`]: {
          '.px-wf-index': {
            paddingRight: '0.5rem', // Smaller padding for mobile
            paddingLeft: '0.5rem', // Smaller padding for mobile
          },

          '.py-wf-index': {
            paddingTop: '4rem',
            paddingBottom: '4rem',
          },
        },

        [`@media (min-width: ${theme('screens.lg')}) and (max-width: ${theme('screens.2xl')})`]: {
          '.px-wf-index': {
            paddingRight: '4rem',
            paddingLeft: '4rem',
          },
        },
      });
    },
  ],
};
