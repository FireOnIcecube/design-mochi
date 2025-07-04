<script setup lang="ts">
import { ref } from 'vue'
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from 'firebase/storage'
import { storage } from '@pkg/firebase'
import imageCompression from 'browser-image-compression'

// 狀態變數
const youtubeURL = ref('')
const thumbnailURL = ref('')
const videoID = ref('')
const videoTitle = ref('')

const uploadURL = ref('')

const compressedSizeMB = ref<number | null>(null)
const uploadProgress = ref(0)

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

function handleInput() {
  // 清除之前的結果
  thumbnailURL.value = ''
  videoID.value = ''
  videoTitle.value = ''
  uploadURL.value = ''
  compressedSizeMB.value = null
  uploadProgress.value = 0
}

// 擷取縮圖與標題
async function fetchThumbnail() {
  const id = extractVideoID(youtubeURL.value)
  if (!id) {
    alert('無法解析影片 ID')
    return
  }

  videoID.value = id
  uploadURL.value = ''
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
  if (!thumbnailURL.value || !videoTitle.value) {
    alert('請先擷取縮圖和標題')
    return
  }

  try {
    const response = await fetch(thumbnailURL.value)
    const blob = await response.blob()

    const options = {
      maxSizeMB: 1, // 最大 1MB
      maxWidthOrHeight: 1920, // 最大寬高 1280px
      useWebWorker: true, // 使用 Web Worker 進行壓縮
    }
    const file = new File([blob], `${videoID.value}.jpg`, { type: blob.type })
    const compressedBlob = await imageCompression(file, options)

    // 生成檔名
    const safeTitle = videoID.value
    const filename = `thumbnails/${safeTitle}.jpg`
    const ref = storageRef(storage, filename)

    const uploadTask = uploadBytesResumable(ref, compressedBlob)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        uploadProgress.value = Math.round(progress)
        console.log(`上傳進度: ${uploadProgress.value}%`)
      },
      (error) => {
        console.error('上傳錯誤:', error)
      },
      async () => {
        // 上傳完成後獲取下載 URL
        uploadURL.value = await getDownloadURL(uploadTask.snapshot.ref)
        compressedSizeMB.value = compressedBlob.size / (1024 * 1024) // 轉換為 MB
        console.log('上傳成功:', uploadURL.value)
      },
    )

    uploadURL.value = await getDownloadURL(ref)
  } catch (err) {
    console.error('上傳錯誤:', err)
  }
}
</script>

<template>
  <div class="flex h-full flex-col space-y-4 p-4">
    <h1 class="text-content dark:text-content-dark text-xl font-bold">上傳 YouTube 縮圖</h1>

    <input
      type="text"
      v-model="youtubeURL"
      placeholder="輸入 YouTube 網址"
      class="w-full border p-2"
      @input="handleInput"
    />
    <div class="space-x-4">
      <button
        @click="fetchThumbnail"
        class="cursor-pointer rounded bg-blue-500 px-4 py-2 text-white"
      >
        預覽縮圖
      </button>
      <button
        @click="uploadThumbnail"
        :disabled="!thumbnailURL"
        class="mt-4 cursor-pointer rounded bg-green-500 px-4 py-2 text-white"
      >
        上傳縮圖到 Firebase
      </button>
    </div>

    <div v-if="compressedSizeMB !== null" class="mt-2 text-sm text-gray-600">
      壓縮後大小：{{ compressedSizeMB }} MB
    </div>

    <div v-if="uploadProgress > 0" class="mt-2 w-full rounded bg-gray-200">
      <div
        class="rounded bg-green-500 py-1 text-center text-sm text-white transition-all"
        :style="{ width: uploadProgress + '%' }"
      >
        上傳中 {{ uploadProgress }}%
      </div>
    </div>

    <div class="mt-4 grid grid-cols-1 gap-8 md:grid-cols-2">
      <div
        v-if="thumbnailURL"
        class="text-content dark:text-content-dark text-md flex flex-col font-semibold"
      >
        <div class="h-12 overflow-y-auto">
          <p>{{ videoTitle }}</p>
        </div>
        <img :src="thumbnailURL" class="flex-1 rounded object-cover shadow" />
        <div v-if="uploadURL" class="mt-4">
          <p>✅ 縮圖上傳成功！</p>
          <a :href="uploadURL" target="_blank" class="text-blue-600 underline">點此開啟縮圖</a>
        </div>
      </div>

      <div
        v-if="thumbnailURL"
        class="text-content dark:text-content-dark text-md flex flex-col font-semibold"
      >
        <div class="h-12">
          <p>選擇 Tag</p>
        </div>

        <div class="bg-surface border-outline h-full w-full flex-1 rounded border-2">1</div>
      </div>
    </div>
  </div>
</template>
