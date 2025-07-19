<script setup lang="ts">
import { onMounted, ref, toRaw } from 'vue'
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from 'firebase/storage'
import { storage } from '@pkg/firebase'
import imageCompression from 'browser-image-compression'
import type { ThumbnailBase, ThumbnailCategory } from '@/packages/types'
import TagSelector from '@admin/components/TagSelector.vue'
import { fetchThumbnailCategories } from '@pkg/firebase/db/entities/thumbnailCategory'
import { createThumbnail } from '@pkg/firebase/db/entities/thumbnail'
import { doc } from 'firebase/firestore'
import axios, { isAxiosError } from 'axios'
import { error } from 'console'

// 狀態變數

// youtube 影片網址
const youtubeUrl = ref('')

// 預覽縮圖的 url
const thumbnailPreviewUrl = ref('https://i.ytimg.com/vi/0EiAOUVYy8Q/maxresdefault.jpg')

// 影片 id 和標題
const videoId = ref('')
const videoTitle = ref('')

// 上傳後的縮圖 url
const uploadedThumbnailUrl = ref('')

// 檔案狀態相關的ref 變數
const thumbnailCompressedSizeMb = ref<number | null>(null)
const uploadProgress = ref(0)

// 封面類別資料
const thumbnailCategories = ref<ThumbnailCategory[]>([])
const selectedTagsByCategory = ref<Record<string, string[]>>()

// 依序嘗試多個解析度
const youtubeThumbnailResolutions = [
  'maxresdefault.jpg',
  'sddefault.jpg',
  'hqdefault.jpg',
  'mqdefault.jpg',
  'default.jpg',
]

onMounted(fetchCategories)

async function fetchCategories() {
  try {
    thumbnailCategories.value = await fetchThumbnailCategories()
  } catch (e) {
    alert('無法獲取封面類別，請稍後再試。')
    console.error(e)
  }
}

// 取得目標封面並以 blob 封裝
async function getThumbnailBlob(url: string): Promise<Blob> {
  try {
    const res = await axios.get(url, { responseType: 'blob' })
    return res.data
  } catch (err) {
    throw err
  }
}

async function compressImage(blob: Blob, filename: string): Promise<Blob> {
  try {
    const file = new File([blob], filename, { type: blob.type })
    const compressed = await imageCompression(file, {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    })

    return compressed
  } catch (err) {
    console.error('❌ 圖片壓縮失敗:', err)
    throw err
  }
}

async function uploadThumbnailToStorage(file: Blob, path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const ref = storageRef(storage, path)
    const task = uploadBytesResumable(ref, file)

    task.on(
      'state_changed',
      (snapshot) => {
        uploadProgress.value = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
      },
      (error) => {
        console.error('❌ 上傳失敗:', error)
        reject(error)
      },
      async () => {
        try {
          const downloadUrl = await getDownloadURL(task.snapshot.ref)
          resolve(downloadUrl)
        } catch (error) {
          reject(error)
        }
      },
    )
  })
}

async function submitThumbnailUpload() {
  if (!thumbnailPreviewUrl.value || !videoTitle.value || !videoId.value) {
    alert('請先預覽縮圖')
    return
  }

  try {
    const blob = await getThumbnailBlob(thumbnailPreviewUrl.value)
    const compressedBlob = await compressImage(blob, `${videoId.value}.jpg`)
    thumbnailCompressedSizeMb.value = compressedBlob.size / (1024 * 1024) // 轉換為 MB

    const path = `thumbnails/${videoId.value}.jpg`
    const downloadUrl = await uploadThumbnailToStorage(compressedBlob, path)

    uploadedThumbnailUrl.value = downloadUrl
    console.log('✅ 上傳成功:', downloadUrl)

    //  建立 firestore 資料
    await createThumbnail({
      name: videoTitle.value,
      imageUrl: downloadUrl,
    })
  } catch (error) {
    alert('上傳失敗，請稍後再試。')
  }
}

// 解析影片 ID
function extractYoutubeVideoId(url: string): string | null {
  const regex = /(?:v=|youtu\.be\/|embed\/)([a-zA-Z0-9_-]{11})/
  const match = url.match(regex)
  return match ? match[1] : null
}

function resetThumbnailForm() {
  // 清除之前的結果
  thumbnailPreviewUrl.value = ''
  videoId.value = ''
  videoTitle.value = ''
  uploadedThumbnailUrl.value = ''
  thumbnailCompressedSizeMb.value = null
  uploadProgress.value = 0
}

function normalizCategoryTagList() {
  const raw = toRaw(selectedTagsByCategory)

  return Object.entries(raw).map(([category, tags]) => ({
    category,
    tags,
  }))
}

// 擷取縮圖與標題
async function fetchThumbnail() {
  const id = extractYoutubeVideoId(youtubeUrl.value)
  if (!id) {
    alert('無法解析影片 ID')
    return
  }

  videoId.value = id
  uploadedThumbnailUrl.value = ''
  // 以 fallback 方式取得縮圖
  for (const resolution of youtubeThumbnailResolutions) {
    try {
      const response = await fetch(`https://i.ytimg.com/vi/${id}/${resolution}`)
      if (response.ok) {
        thumbnailPreviewUrl.value = `https://i.ytimg.com/vi/${id}/${resolution}`
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

function updateSelectedTags(data: Record<string, string[]>) {
  selectedTagsByCategory.value = data
}
</script>

<template>
  <div class="flex h-full flex-col space-y-4 p-4">
    <h1 class="text-content dark:text-content-dark text-xl font-bold">上傳 YouTube 縮圖</h1>

    <input
      type="text"
      v-model="youtubeUrl"
      placeholder="輸入 YouTube 網址"
      class="w-full border p-2"
      @input="resetThumbnailForm"
    />
    <div class="space-x-4">
      <button
        @click="fetchThumbnail"
        class="cursor-pointer rounded bg-blue-500 px-4 py-2 text-white"
      >
        預覽縮圖
      </button>
      <button
        :disabled="!thumbnailPreviewUrl"
        class="mt-4 cursor-pointer rounded bg-green-500 px-4 py-2 text-white"
        @click="submitThumbnailUpload"
      >
        上傳縮圖到 Firebase
      </button>
    </div>

    <div v-if="thumbnailCompressedSizeMb !== null" class="mt-2 text-sm text-gray-600">
      壓縮後大小：{{ thumbnailCompressedSizeMb }} MB
    </div>

    <div v-if="uploadProgress > 0" class="mt-2 w-full rounded bg-gray-200">
      <div
        class="rounded bg-green-500 py-1 text-center text-sm text-white transition-all"
        :style="{ width: uploadProgress + '%' }"
      >
        上傳中 {{ uploadProgress }}%
      </div>
    </div>

    <div class="mt-4 grid grid-cols-1 gap-12 lg:grid-cols-2">
      <div
        v-if="thumbnailPreviewUrl"
        class="text-content dark:text-content-dark text-md flex flex-col font-semibold"
      >
        <div class="max-h-12 overflow-y-auto">
          <p>{{ videoTitle }}</p>
        </div>
        <img :src="thumbnailPreviewUrl" class="flex-1 rounded object-cover shadow" />
        <div v-if="uploadedThumbnailUrl" class="mt-4">
          <p>✅ 縮圖上傳成功！</p>
          <a :href="uploadedThumbnailUrl" target="_blank" class="text-blue-600 underline"
            >點此開啟縮圖</a
          >
        </div>
      </div>

      <div
        v-if="thumbnailPreviewUrl"
        class="text-content dark:text-content-dark text-md font-semibold"
      >
        <!-- <div class="h-8">
          <p>選擇 Tag</p>
        </div> -->

        <div class="h-full min-h-64 w-full flex-1">
          <TagSelector :thumbnail-categories="thumbnailCategories" @change="updateSelectedTags" />
        </div>
      </div>
    </div>
  </div>
</template>
