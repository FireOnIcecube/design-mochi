<script setup lang="ts">
import { computed, Suspense } from 'vue'
import { useRouter } from 'vue-router'

const defaultLayout = 'default'

const { currentRoute } = useRouter()

const layout = computed(() => `${currentRoute.value.meta.layout || defaultLayout}-layout`)
</script>

<template>
  <component :is="layout">
    <Suspense> <router-view /> </Suspense>
  </component>
</template>
