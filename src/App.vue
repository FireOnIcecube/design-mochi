<script setup lang="ts">
import { computed, onMounted, Suspense } from 'vue'
</script>

<template>
  <Suspense> <router-view /> </Suspense>
</template>
