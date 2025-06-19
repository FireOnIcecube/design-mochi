<!-- <script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template> -->

<template>
  <div>
    <h1>歡迎回來，{{ user?.displayName }}</h1>
    <button @click="logout">登出</button>
  </div>
</template>

<script setup lang="ts">
import { auth } from '@pkg/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const user = ref(auth.currentUser)
const router = useRouter()

onMounted(() => {
  onAuthStateChanged(auth, (u) => {
    user.value = u
  })
})

function logout() {
  signOut(auth).then(() => {
    router.push('/login')
  })
}
</script>
