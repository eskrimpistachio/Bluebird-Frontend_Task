/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors : {
        'cust-blue' : '#0657A3'
      },
      fontFamily : {
        'mont' : ['Montserrat'],
      },
      backgroundImage : {
        'landing-bg' : "url('./assets/landingpage-bg.png')",
      }
    },
  },
  plugins: [],
};
