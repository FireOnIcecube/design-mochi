<script setup lang="ts">
import { fetchThumbnails } from '@/packages/firebase/db/entities/thumbnail'
import { Thumbnail } from '@/packages/types'
import { onMounted, ref } from 'vue'
import { ThumbnailCard } from '@admin/components/ThumbnailCard'

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
    <div v-for="item in thumbnails" :key="item.id">
      <ThumbnailCard :thumbnail="item" />
    </div>
  </template>
</template>
