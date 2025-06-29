<script setup lang="ts">
import { getAuth, signOut } from 'firebase/auth'
import NavHeader from '@admin/components/NavHeader.vue'
import Sidebar from '../components/Sidebar.vue'

const auth = getAuth()
</script>

<template>
  <div class="flex h-screen flex-col">
    <!-- <header>
      <div>{{ auth.currentUser?.displayName }}</div>
      <div>{{ auth.currentUser?.email }}</div>
    </header> -->

    <header class="border-b px-4 lg:p-4 dark:border-gray-700">
      <NavHeader />
    </header>

    <div class="flex flex-1 overflow-hidden">
      <aside class="border-r dark:border-gray-700">
        <Sidebar />
        <!-- <router-link to="/">首頁</router-link>
      <router-link to="/login">登入</router-link>
      <router-link to="/about">關於</router-link> -->
      </aside>

      <main class="container mx-auto overflow-auto p-4"><router-view /></main>
    </div>
  </div>
</template>
