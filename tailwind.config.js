const plugin = require('tailwindcss/plugin');
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
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
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
        border:
          '2px 2px 0px #FFFFFF, -2px -2px 0px #FFFFFF, 0px 2px 0px #FFFFFF, 0px -2px 0px #FFFFFF, 2px 0px 0px #FFFFFF, -2px 0px 0px #FFFFFF',
      },
      colors: {
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
          black: '#1C1B1F',
        },
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') },
      );
    }),
    function ({ addVariant }) {
      addVariant('child', '& > *');
      addVariant('child-first', '& > :first-child');
      addVariant('space', '& > :not([hidden]) ~ :not([hidden])');
    },
  ],
};
