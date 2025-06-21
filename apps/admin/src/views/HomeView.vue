<!-- src/views/Home.vue -->
<template>
  <div class="container">
    <h1>🎉 歡迎進入主頁</h1>
    <p>你已經成功登入，且通過白名單驗證！</p>
    <button @click="logout">登出</button>
  </div>
</template>

<script setup lang="ts">
import { getAuth, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const auth = getAuth()

function logout() {
  signOut(auth).then(() => {
    router.push('/login')
  })
}
</script>

<style scoped>
.container {
  padding: 2rem;
  font-family: sans-serif;
}
button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
}
</style>
