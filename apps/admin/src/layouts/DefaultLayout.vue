<script setup lang="ts">
import { getAuth, signOut } from 'firebase/auth'
import NavHeader from '@admin/components/NavHeader.vue'
import Sidebar from '../components/Sidebar.vue'

const auth = getAuth()
</script>

<template>
  <div class="flex h-screen flex-col">
    <header class="border-b px-4 lg:p-4 dark:border-gray-700">
      <NavHeader />
    </header>

    <div class="flex flex-1 overflow-hidden">
      <aside class="border-r dark:border-gray-700">
        <Sidebar />
      </aside>

      <div class="mt-10 flex-1 overflow-auto md:ml-8">
        <main class="container mx-auto p-4">
          <router-view />
        </main>
      </div>
    </div>
  </div>
</template>
