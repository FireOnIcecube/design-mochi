<!-- src/views/LoginView.vue -->
<template>
  <div class="container">
    <h1>🔐 請使用 Google 登入</h1>
    <button @click="login">Google 登入</button>
  </div>
</template>

<script setup lang="ts">
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { checkWhitelist } from '@admin/whitelist'

const auth = getAuth()
const db = getFirestore()
const router = useRouter()

async function login() {
  try {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)

    const email = result.user.email?.toLowerCase()
    if (!email) throw new Error('找不到 Email')

    const isAdminExist = await checkWhitelist(email)

    if (!isAdminExist) {
      alert('未授權帳號，將登出')
      await signOut(auth)
      return
    }

    // ✅ 通過驗證 → 導向首頁
    router.push('/')
  } catch (err) {
    console.error('登入失敗', err)
    alert('登入失敗，請稍後再試')
  }
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
