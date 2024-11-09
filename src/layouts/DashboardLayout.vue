<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue'
import MainHeader from '@/components/MainHeader.vue'
</script>

<template>
  <div class="flex h-screen bg-[#FEF7EC]">
    <Sidebar />

    <div class="flex-1 flex overflow-x-hidden flex-col">
      <MainHeader />

      <main class="flex-1 overflow-y-auto px-6 py-8">
        <div class="container mx-auto">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>
