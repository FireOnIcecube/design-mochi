<script setup lang="ts">
import NavHeader from '../components/NavHeader.vue'
</script>

<template>
  <div class="flex h-screen flex-col">
    <div class="border-b px-4 lg:p-4 dark:border-gray-700">
      <NavHeader />
    </div>
    <slot />
  </div>
</template>
