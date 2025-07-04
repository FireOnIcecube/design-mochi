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

  // 以 fallback 方式取得縮圖
  for (const resolution of fallbackResolutions) {
    try {
      const response = await fetch(`https://i.ytimg.com/vi/${id}/${resolution}`)
      if (response.ok) {
        thumbnailURL.value = `https://i.ytimg.com/vi/${id}/${resolution}`
        break
      }
    } catch (e) {
      console.error(`無法取得 ${resolution} 縮圖`)
    }
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
    const safeTitle = videoID.value
    const filename = `thumbnails/${safeTitle}.jpg`

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
    <h1 class="text-content dark:text-content-dark text-xl font-bold">上傳 YouTube 縮圖</h1>

    <input
      type="text"
      v-model="youtubeURL"
      placeholder="輸入 YouTube 網址"
      class="w-full border p-2"
    />
    <div class="space-x-4">
      <button @click="fetchThumbnail" class="rounded bg-blue-500 px-4 py-2 text-white">
        預覽縮圖
      </button>
      <button
        @click="uploadThumbnail"
        :disabled="!thumbnailURL"
        class="mt-4 rounded bg-green-500 px-4 py-2 text-white"
      >
        上傳縮圖到 Firebase
      </button>
    </div>

    <div v-if="thumbnailURL" class="mt-4">
      <p class="text-content dark:text-content-dark font-medium">影片標題：{{ videoTitle }}</p>
      <img :src="thumbnailURL" class="max-w-xl rounded shadow" />
    </div>

    <div v-if="uploadURL" class="mt-4">
      <p class="text-content dark:text-content-dark font-medium">✅ 縮圖上傳成功！</p>
      <a :href="uploadURL" target="_blank" class="text-blue-600 underline">點此開啟縮圖</a>
    </div>
  </div>
</template>
