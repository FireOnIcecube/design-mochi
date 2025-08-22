<script setup lang="ts">
import { Thumbnail } from '@/packages/types'

const props = defineProps<{
  thumbnail: Thumbnail
}>()

const model = defineModel<{
  isOpen: boolean
}>({
  default: () => ({ isOpen: false }),
})
</script>

<template>
  <div v-if="model.isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div class="w-full max-w-2xl rounded bg-white p-6 shadow-lg">
      <h2 class="mb-4 text-xl font-bold">{{ thumbnail?.name }}</h2>
      <img :src="thumbnail?.imageUrl" class="mb-4 w-full object-contain" />
      <p>Click Count: {{ thumbnail?.clickCount }}</p>
      <button @click="close" class="mt-4 rounded bg-red-500 px-4 py-2 text-white">關閉</button>
    </div>
  </div>
</template>
