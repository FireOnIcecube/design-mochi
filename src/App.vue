<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const route = useRoute()
const layout = computed(() => route.meta.layout || DefaultLayout)
</script>

<template>
  <div class="min-h-screen bg-primary dark:bg-primary-dark">
    <component :is="layout"> <router-view /> </component>
  </div>
</template>
