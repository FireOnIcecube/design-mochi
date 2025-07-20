<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { getThumbnail } from '@pkg/firebase/db/entities/thumbnail'
import type { Thumbnail } from '@/packages/types'

const route = useRoute()
const videoId = route.params.id as string

const thumbnail = ref<Thumbnail | null>(null)

onMounted(async () => {
  thumbnail.value = await getThumbnail(videoId)
})
</script>

<template>
  <div v-if="thumbnail">
    <h1>詳細頁</h1>
    <img :src="thumbnail.imageUrl" />
    <p>{{ thumbnail.name }}</p>
    <p>Video ID: {{ thumbnail.videoId }}</p>
    <p>分類: {{ thumbnail.categories.map((c) => c.category).join(', ') }}</p>
    <p>標籤: {{ thumbnail.categories.flatMap((c) => c.tags).join(', ') }}</p>
  </div>
  <div v-else>
    <p>載入中或找不到資料</p>
  </div>
</template>
