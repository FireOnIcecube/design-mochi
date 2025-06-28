<script setup lang="ts">
import { getAuth, signOut } from 'firebase/auth'
import NavHeader from '@client/components/NavHeader.vue'

const auth = getAuth()
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <!-- <header>
      <div>{{ auth.currentUser?.displayName }}</div>
      <div>{{ auth.currentUser?.email }}</div>
    </header> -->

    <header class="border-b px-4 lg:p-4 dark:border-gray-700">
      <NavHeader />
    </header>

    <header>共用導航</header>

    <router-view />

    <footer>共用底部</footer>
  </div>
</template>
