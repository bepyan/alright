/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      container: {
        center: true,
        screens: {
          sm: '640px',
        },
      },
      spacing: {
        container: '20px',
      },
      theme: {
        colors: {
          al: {
            blue: '#0C79FE',
            gray: '#EAECEF',
            'dark-gray': '#F5F6F8',
            border: '#E9EAEC',
            disabled: '#AFB1B5',
            slate: '#697483',
          },
        },
      },
    },
  },
};
