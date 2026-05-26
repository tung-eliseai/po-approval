/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        purple: {
          50: '#eee7ff',
          100: '#cabafc',
          200: '#a78df3',
          300: '#8460ed',
          400: '#6032e6',
          500: '#4719cd',
          600: '#3712a0',
          700: '#260d74',
          800: '#170747',
          900: '#09011d',
        },
        teal: {
          50: '#e1f8ff',
          100: '#bee4f1',
          200: '#9ad1e4',
          300: '#75bfd9',
          400: '#50accd',
          500: '#3993b4',
          600: '#29728c',
          700: '#1b5265',
          800: '#09313f',
          900: '#001219',
        },
      },
      fontFamily: {
        sans: ['SF Pro', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      borderRadius: {
        xs: '2px',
        sm: '6px',
        md: '10px',
        lg: '16px',
      },
    },
  },
};
