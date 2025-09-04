<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import MenuIcon from './MenuIcon.vue'
import { onMounted, ref } from 'vue'
import { useThumbnailCategoryStore } from '@client/stores/useThumbnailCategoryStore'

const isOpen = ref(false)

const categoryStore = useThumbnailCategoryStore()
onMounted(async () => {
  if (!categoryStore.data) {
    categoryStore.fetchAll({ order: { createdAt: 'asc' } })
  }
})
</script>
<template>
  <div
    class="flex justify-center rounded bg-[#E6D7C5] p-2 dark:bg-gray-800"
    @click="isOpen = !isOpen"
  >
    <div class="text-content dark:text-content-dark flex items-center gap-x-4">
      <menu-icon v-model="isOpen" />
      <span class="font-notosans text-lg">Category</span>
      <menu-icon v-model="isOpen" />
    </div>
  </div>
</template>
