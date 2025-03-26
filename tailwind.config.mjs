import tailwindForm from '@tailwindcss/forms'
import tailwindTypography from '@tailwindcss/typography'
import tailwindAspectRatio from '@tailwindcss/aspect-ratio'
import primeUi from 'tailwindcss-primeui'

/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ffffff', // 白天模式的主要顏色
          dark: '#0F172A' // 黑夜模式的主要顏色
        },
        text: {
          DEFAULT: '#1E293B', // 白天模式的文字顏色
          dark: '#F8FAFC' // 黑夜模式的文字顏色
        }
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [tailwindForm, tailwindTypography, primeUi, tailwindAspectRatio]
}
