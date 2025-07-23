<script setup lang="ts">
import { fetchThumbnails } from '@/packages/firebase/db/entities/thumbnail'
import { Thumbnail } from '@/packages/types'
import { onMounted, ref } from 'vue'
import { ThumbnailCard } from '@/apps/admin/src/components/thumbnailCard'

const thumbnails = ref<Thumbnail[]>([])

async function loadThumbnails() {
  try {
    thumbnails.value = await fetchThumbnails()
  } catch (error) {
    alert('無法載入縮圖資料，請稍後再試。')
    console.error('Error fetching thumbnails:', error)
  }
}

onMounted(() => {
  loadThumbnails()
})
</script>

<template>
  <h1>ThumbnailList</h1>
  <template v-if="thumbnails && thumbnails.length > 0">
    <div class="grid grid-cols-2 gap-y-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12 xl:grid-cols-4">
      <div v-for="item in thumbnails" :key="item.id">
        <ThumbnailCard :thumbnail="item" />
      </div>
    </div>
  </template>
  <template v-else>
    <p class="text-center text-gray-500">沒有縮圖可顯示</p>
  </template>
</template>
