<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const route = useRoute()
const layout = computed(() => route.meta.layout || DefaultLayout)
</script>

<template>
  <div class="bg-surface dark:bg-surface-dark transition-theme min-h-screen">
    <component :is="layout"> <router-view /> </component>
  </div>
</template>
