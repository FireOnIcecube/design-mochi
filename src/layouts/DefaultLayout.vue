<script setup>
import NavHeader from '@/components/NavHeader.vue'
</script>

<template>
  <header>
    <NavHeader />
  </header>
  <main>
    <router-view />
  </main>
  <footer>Footer</footer>
</template>
