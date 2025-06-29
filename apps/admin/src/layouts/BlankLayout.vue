<script setup lang="ts">
import NavHeader from '@admin/components/NavHeader.vue'
</script>

<template>
  <div class="flex h-screen flex-col">
    <header class="border-b px-4 lg:p-4 dark:border-gray-700">
      <NavHeader />
    </header>

    <slot></slot>
  </div>
</template>
