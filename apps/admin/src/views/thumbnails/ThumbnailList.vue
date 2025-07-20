<script setup lang="ts">
import { fetchThumbnails } from '@/packages/firebase/db/entities/thumbnail'
import { Thumbnail } from '@/packages/types'
import { onMounted, ref } from 'vue'

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
  <hr />
  <template v-if="thumbnails && thumbnails.length > 0">
    <div v-for="(thumbnail, index) in thumbnails" :key="index">
      <div>
        <img :src="thumbnail.imageUrl" alt="Thumbnail Image" />
        <p>{{ thumbnail.name }}</p>
        <p>Video ID: {{ thumbnail.videoId }}</p>
        <p>Categories: {{ thumbnail.categories.map((cat) => cat.category).join(', ') }}</p>
        <p>Tags: {{ thumbnail.categories.flatMap((cat) => cat.tags).join(', ') }}</p>
      </div>
      <hr />
    </div>
  </template>
</template>
