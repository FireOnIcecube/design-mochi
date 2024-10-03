<script setup lang="ts">
import { computed, onMounted, Suspense } from 'vue'
import { useRouter } from 'vue-router'
import { resourceData } from './composables/useResourceData'

const defaultLayout = 'default'

const { currentRoute } = useRouter()

const layout = computed(() => `${currentRoute.value.meta.layout || defaultLayout}-layout`)

onMounted(() => {
  resourceData.getAllResources('fonts')
})
</script>

<template>
  <component :is="layout">
    <Suspense> <router-view /> </Suspense>
  </component>
</template>
