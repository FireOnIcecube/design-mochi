import tailwindForm from '@tailwindcss/forms'
import tailwindTypography from '@tailwindcss/typography'
import tailwindAspectRatio from '@tailwindcss/aspect-ratio'

/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    screens: {
      xs: '375px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1920px'
    },

    extend: {
      fontFamily: {
        mantou: ['MantouSans', 'sans-serif'],
        notosans: ['NotoSansTC', 'ui-sans-serif', 'system-ui']
      },
      colors: {
        surface: {
          DEFAULT: '#ffffff', // 白天模式的 主要 顏色
          dark: '#0F172A', // 黑夜模式的 主要 顏色
          hover: '#f3f4f6', // 白天模式的 Hover 顏色
          'hover-dark': '#1E293B' // 黑夜模式的 Hover 顏色
        },
        content: {
          DEFAULT: '#1E293B', // 白天模式的 文字 顏色
          dark: '#F8FAFC', // 黑夜模式的 文字 顏色

          link: {
            DEFAULT: '#3B82F6', // 白天模式的 連結 顏色
            dark: '#60A5FA' // 黑夜模式的 連結 顏色
          }
        },
        outline: {
          DEFAULT: '#e5e7eb', // 白天模式的 框線 顏色
          dark: '#374151' // 黑夜模式的 框線 顏色
        },
        elevation: {
          DEFAULT: 'rgba(0, 0, 0, 0.05)', // 白天模式的 陰影 顏色
          dark: 'rgba(255, 255, 255, 0.08)' // 黑夜模式的 陰影 顏色
        }
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [tailwindForm, tailwindTypography, tailwindAspectRatio]
}
