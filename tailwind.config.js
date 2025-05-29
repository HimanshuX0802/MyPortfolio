/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        blink: 'blink 1s infinite',
        float: 'float 6s ease-in-out infinite',
        fadeIn: 'fadeIn 1s ease-out forwards',
        fadeInLeft: 'fadeInLeft 1s ease-out forwards',
        fadeInRight: 'fadeInRight 1s ease-out forwards',
        progressBar: 'progressBar 1.5s ease-out forwards',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      boxShadow: {
        'custom': '0 10px 30px -10px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
};