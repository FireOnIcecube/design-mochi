<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from '@admin/layouts/DefaultLayout.vue'

const router = useRoute()
const layout = computed(() => router.meta.layout || DefaultLayout)
</script>
<template>
  <div class="bg-surface dark:bg-surface-dark transition-theme duration-300">
    <component :is="layout"> <RouterView /> </component>
  </div>
</template>
