<script setup lang="ts">
import { computed, onMounted, Suspense } from 'vue'
import { resourceData } from './stores/resourceStore'

onMounted(() => {
  resourceData.getAllResources('fonts')
})
</script>

<template>
  <Suspense> <router-view /> </Suspense>
</template>
