import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import { MotionPlugin } from '@vueuse/motion'

import DashboardLayout from '@/layouts/DashboardLayout.vue'
import EmptyLayout from '@/layouts/EmptyLayout.vue'

const app = createApp(App)

app.component('DefaultLayout', DashboardLayout)
app.component('EmptyLayout', EmptyLayout)

app.use(router)
app.use(MotionPlugin)

app.use(PrimeVue, {
  // Default theme configuration
  theme: {
    preset: Aura
  }
})
app.mount('#app')
