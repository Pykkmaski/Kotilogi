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
        }
      }
    },
  },
  plugins: [],
}