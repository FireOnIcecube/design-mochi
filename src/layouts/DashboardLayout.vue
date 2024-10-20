<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue'
import Header from '@/components/Header.vue'
</script>

<template>
  <div class="flex h-screen bg-[#FEF7EC]">
    <Sidebar />

    <div class="flex-grow flex flex-col">
      <Header />

      <main class="overflow-x-hidden overflow-y-auto px-6 py-8">
        <div class="container mx-auto">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>
