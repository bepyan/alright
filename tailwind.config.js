const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    colors: {
      ...colors,
      al: {
        blue: '#0C79FE',
        sky: '#63C7F1',
        green: '#00DAB3',
        gray: '#EAECEF',
        'gray-100': '#F5F6F8',
        red: '#F95E5E',
        border: '#E9EAEC',
        disabled: '#AFB1B5',
        slate: '#697483',
      },
    },
    extend: {
      container: {
        center: true,
        screens: {
          sm: '640px',
        },
      },
      opacity: {
        click: '0.7',
      },
      borderWidth: {
        1.5: '1.5px',
        7: '7px',
      },
      spacing: {
        container: '20px',
      },
    },
  },
};
