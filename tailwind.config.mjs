import defaultTheme from 'tailwindcss/defaultTheme'
import tailwindForm from '@tailwindcss/forms'
import tailwindTypography from '@tailwindcss/typography'
import tailwindAspectRatio from '@tailwindcss/aspect-ratio'
import primeUi from 'tailwindcss-primeui'

/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        mantou: ['MantouSans', ...defaultTheme.fontFamily.sans],
        sans: ['Inter var', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [tailwindForm, tailwindTypography, primeUi, tailwindAspectRatio]
}
