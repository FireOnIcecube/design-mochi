import { fileURLToPath, URL } from 'node:url'
import Inspect from 'vite-plugin-inspect'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), Inspect()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('../', import.meta.url)),
      '@client': fileURLToPath(new URL('../apps/client/src', import.meta.url)),
      '@admin': fileURLToPath(new URL('../apps/admin/src', import.meta.url)),
      '@configs': fileURLToPath(new URL('../configs', import.meta.url))
    }
  }
})
