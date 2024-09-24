import defaultTheme from 'tailwindcss/defaultTheme'
import tailwindForm from '@tailwindcss/forms'
import tailwindTypography from '@tailwindcss/typography'
import tailwindAspectRatio from '@tailwindcss/aspect-ratio'
import primeUi from 'tailwindcss-primeui'

/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        mantou: ['MantouSans', ...defaultTheme.fontFamily.sans],
        sans: ['Inter var', ...defaultTheme.fontFamily.sans]
      }

      // colors: {
      //   primary: {
      //     DEFAULT: '#3490dc', // 主色
      //     dark: '#2779bd', // 深色版本
      //     light: '#6cb2eb' // 淺色版本
      //   },
      //   secondary: {
      //     DEFAULT: '#755540', // 主色
      //     dark: '#2779bd', // 深色版本
      //     light: '#6cb2eb' // 淺色版本
      //   },
      //   background: {
      //     DEFAULT: '#FEF7EC',
      //     light: '#FEF7EC', // 淺色背景
      //     dark: '#1a202c' // 深色背景
      //   }
      // }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [tailwindForm, tailwindTypography, primeUi, tailwindAspectRatio]
}
