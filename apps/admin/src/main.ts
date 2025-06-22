import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const app = createApp(App)

app.use(createPinia())

const auth = getAuth()

// ⭐ 等待 Firebase auth 初始化
onAuthStateChanged(auth, () => {
  app.use(router)
  app.mount('#app')
})
