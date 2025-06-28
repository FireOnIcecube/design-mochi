<!-- src/views/LoginView.vue -->

<script setup lang="ts">
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { checkWhitelist } from '@admin/utils/whitelist'

const auth = getAuth()
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

<template>
  <div class="grid h-screen place-items-center">
    <div class="flex flex-col items-center gap-6">
      <h1 class="font-notosans text-2xl text-gray-600">🔐 請使用 Google 登入</h1>
      <button
        @click="login"
        class="rounded-md bg-blue-400 px-4 py-2 text-lg font-black text-white shadow-md transition-colors hover:bg-blue-500 active:translate-y-0.5 active:scale-95 active:bg-blue-700 active:shadow-inner"
      >
        Google 登入
      </button>
    </div>
  </div>
</template>

<style scoped></style>
