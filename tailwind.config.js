/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: '#14213d',
        brand: '#315efb',
        mint: '#1eb980',
      },
      boxShadow: {
        soft: '0 16px 45px rgba(20, 33, 61, 0.08)',
      },
    },
  },
  plugins: [],
}
