/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3490dc', // 主色
          dark: '#2779bd', // 深色版本
          light: '#6cb2eb' // 淺色版本
        },
        secondary: {
          DEFAULT: '#755540', // 主色
          dark: '#2779bd', // 深色版本
          light: '#6cb2eb' // 淺色版本
        },
        background: {
          DEFAULT: '#FEF7EC',
          light: '#FEF7EC', // 淺色背景
          dark: '#1a202c' // 深色背景
        }
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
