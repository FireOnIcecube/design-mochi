<script setup lang="ts">
import { ref } from 'vue'
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '@pkg/firebase'

// 狀態變數
const youtubeURL = ref('')
const thumbnailURL = ref('')
const videoID = ref('')
const videoTitle = ref('')

const uploadURL = ref('')

// 依序嘗試多個解析度
const fallbackResolutions = [
  'maxresdefault.jpg',
  'sddefault.jpg',
  'hqdefault.jpg',
  'mqdefault.jpg',
  'default.jpg',
]

// 解析影片 ID
function extractVideoID(url: string): string | null {
  const regex = /(?:v=|youtu\.be\/|embed\/)([a-zA-Z0-9_-]{11})/
  const match = url.match(regex)
  return match ? match[1] : null
}

// 擷取縮圖與標題
async function fetchThumbnail() {
  const id = extractVideoID(youtubeURL.value)
  if (!id) {
    alert('無法解析影片 ID')
    return
  }

  videoID.value = id
  thumbnailURL.value = `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`

  // 以 fallback 方式取得縮圖

  try {
    const response = await fetch(thumbnailURL.value)
    if (!response.ok) {
      thumbnailURL.value = `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`
    }
  } catch (e) {
    console.error('無法取得最高解析度縮圖，使用預設縮圖')
    thumbnailURL.value = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
  }

  // 用 oEmbed API 抓取標題（安全快速）
  try {
    const response = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`,
    )
    const data = await response.json()
    videoTitle.value = data.title
  } catch (e) {
    console.error('無法取得影片標題')
    videoTitle.value = 'Unknown'
  }
}

// 上傳縮圖到 Firebase
async function uploadThumbnail() {
  if (!thumbnailURL.value || !videoTitle.value) return

  try {
    const response = await fetch(thumbnailURL.value)
    const blob = await response.blob()

    // 生成檔名
    const safeTitle = videoTitle.value.replace(/[^\w\u4e00-\u9fa5\s-]/g, '_').slice(0, 100)
    const filename = `youtube_thumbnails/${safeTitle}-${Date.now()}.jpg`

    const ref = storageRef(storage, filename)
    await uploadBytes(ref, blob)
    uploadURL.value = await getDownloadURL(ref)
  } catch (err) {
    console.error('上傳錯誤:', err)
  }
}
</script>

<template>
  <div class="space-y-4 p-4">
    <h1 class="text-xl font-bold">上傳 YouTube 縮圖</h1>

    <input
      type="text"
      v-model="youtubeURL"
      placeholder="輸入 YouTube 網址"
      class="w-full border p-2"
    />
    <button @click="fetchThumbnail" class="rounded bg-blue-500 px-4 py-2 text-white">
      預覽縮圖
    </button>

    <div v-if="thumbnailURL" class="mt-4">
      <p class="font-medium">影片標題：{{ videoTitle }}</p>
      <img :src="thumbnailURL" class="max-w-xs rounded shadow" />
    </div>

    <button
      @click="uploadThumbnail"
      :disabled="!thumbnailURL"
      class="mt-4 rounded bg-green-500 px-4 py-2 text-white"
    >
      上傳縮圖到 Firebase
    </button>

    <div v-if="uploadURL" class="mt-4">
      ✅ 上傳成功！<br />
      <a :href="uploadURL" target="_blank" class="text-blue-600 underline">點此開啟縮圖</a>
    </div>
  </div>
</template>
