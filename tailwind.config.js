/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Lexend Deca', 'sans-serif'],
      },
      lineClamp: {
        2: '2',
      },
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#F5F0E8',
          200: '#EFE8DB',
          300: '#DFD5C4',
        },
        beige: {
          100: '#F2EFE6',
          200: '#E5E0D4',
          300: '#D8D1C2',
          400: '#C2B8A5',
          500: '#B3A791',
        }
      }
    },
  },
  plugins: [],
};
