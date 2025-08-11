<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, onMounted, computed } from 'vue'
import { deleteThumbnail, editThumbnail, getThumbnail } from '@pkg/firebase/db/entities/thumbnail'
import type { Thumbnail, ThumbnailCategory } from '@/packages/types'
import { useThumbnailStore } from '@admin/stores/useThumbnailStore'
import { Icon } from '@iconify/vue'
import { useThumbnailCategoryStore } from '@admin/stores/useThumbnailCategoryStore'
import axios from 'axios'
import router from '../../router'

const props = defineProps<{
  id: string
}>()

const thumbnailStore = useThumbnailStore()
const categoryStore = useThumbnailCategoryStore()

const allThumbnails = computed(() => thumbnailStore.thumbnails)
const currentIndex = computed(() => allThumbnails.value.findIndex((t) => t.id === props.id))
const currentThumbnail = computed(() => allThumbnails.value[currentIndex.value])

const enrichedThumbnail = computed(() => {
  if (!currentThumbnail.value) return null
  return enrichThumbnail(currentThumbnail.value, categoryStore.thumbnailCategories)
})

const prev = computed(() => allThumbnails.value[currentIndex.value - 1] ?? null)
const next = computed(() => allThumbnails.value[currentIndex.value + 1] ?? null)

function enrichThumbnail(thumbnail: Thumbnail, categories: ThumbnailCategory[]) {
  const enrichedCategories = thumbnail.categories
    .map(({ category: categorySlug, tags: selectedTagSlugs }) => {
      const categoryMeta = categories.find((cat) => cat.slug === categorySlug)
      if (!categoryMeta) return null

      const selectedTags = categoryMeta.tags?.filter((tag) => selectedTagSlugs.includes(tag.slug))

      return {
        categorySlug: categoryMeta.slug,
        categoryName: categoryMeta.name,
        tags: selectedTags,
      }
    })
    .filter(Boolean)

  return {
    ...thumbnail,
    categories: enrichedCategories,
  }
}

async function downloadImage(url: string, filename: string) {
  try {
    const res = await fetch(url, { mode: 'cors' })
    const blob = await res.blob()
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(link.href)
  } catch (err) {
    console.error('下載失敗', err)
    alert('下載失敗，請稍後再試')
  }
}

// 封存封面
async function toggleArchive({ id, value }: { id: string; value: boolean }) {
  try {
    await editThumbnail(id, { isArchived: value })
    await thumbnailStore.fetchAll({ order: { createdAt: 'desc' } })
  } catch (e) {
    alert('暫時無法 封存/顯示 封面 , 請稍後再試')
  }
}

// 刪除封面
async function onThumbnailDelete(id: string) {
  if (confirm('確定要刪除這個封面嗎？')) {
    try {
      await deleteThumbnail(id)
      router.push({ name: 'ThumbnailList' })
    } catch (e) {
      alert('暫時無法 刪除封面 , 請稍後再試')
      console.error(e)
    }
  }
}

/** 增加點擊數，僅可於前台啟用 */
// async function incrementClickCount() {
//   try {
//     await axios.post('https://incrementthumbnailclick-xpujuvtkea-de.a.run.app', {
//       thumbnailId: props.id,
//     })
//   } catch (err) {
//     console.error('❌ Failed to increment click count', err)
//   }
// }

// const liked = ref(false)

onMounted(async () => {
  if (!thumbnailStore.thumbnails.length) {
    await thumbnailStore.fetchAll()
  }
  if (!categoryStore.thumbnailCategories.length) {
    await categoryStore.fetchAll()
  }
})
</script>

<template>
  <template v-if="enrichedThumbnail">
    <div
      v-if="enrichedThumbnail.isArchived"
      class="text-content-dark mb-10 flex w-full items-center justify-center gap-2 bg-amber-500 py-2"
    >
      <Icon icon="material-symbols:archive" class="size-7" />
      <span class="font-notosans text-lg">此封面已被封存</span>
    </div>

    <div class="flex flex-col justify-around lg:flex-row">
      <div class="w-full lg:w-1/2">
        <div
          class="flex items-center justify-center rounded bg-gray-100 select-none dark:bg-gray-400"
        >
          <img :src="enrichedThumbnail.imageUrl" class="object-contain" />
        </div>

        <div class="text-content dark:text-content-dark flex flex-nowrap">
          <span class="text-sm">
            來源:
            <a
              :href="`https://www.youtube.com/watch?v=${enrichedThumbnail.videoId}`"
              target="_blank"
              class="hover:text-blue-400"
              >https://www.youtube.com/watch?v={{ enrichedThumbnail.videoId }}
            </a>
          </span>
        </div>
      </div>

      <div class="w-full lg:w-1/3">
        <section class="border-outline dark:text-content-dark mt-8 border-b-2 pb-6 lg:mt-0">
          <p class="font-notosans text-xl lg:text-2xl">
            {{ enrichedThumbnail.name }}
          </p>
          <!-- 
          <div class="flex justify-end lg:hidden">
            <button
              @click="liked = !liked"
              aria-label="收藏"
              class="mt-4 transition-colors duration-300"
            >
              <div
                class="dark:border-outline-dark cursor-pointer rounded-full border p-3 shadow-md hover:shadow-lg"
              >
                <Icon
                  :icon="liked ? 'mdi:heart' : 'mdi:heart-outline'"
                  width="2rem"
                  height="2rem"
                  class="text-red-500 transition-all duration-300 ease-in-out"
                  :class="liked ? 'scale-110' : 'scale-100'"
                />
              </div>
            </button>
          </div> -->
        </section>

        <section
          class="border-outline text-content dark:text-content-dark flex flex-col justify-items-center gap-y-8 border-b-2 pt-3 pb-6"
        >
          <div
            v-for="cat in enrichedThumbnail.categories"
            :key="cat?.categorySlug"
            class="flex items-center gap-x-8"
          >
            <div class="font-notosans text-xl whitespace-nowrap">{{ cat?.categoryName }}:</div>
            <div class="text-md font-notosans flex flex-wrap gap-x-4 gap-y-2">
              <template v-for="(tag, index) in cat?.tags" :key="index">
                <div
                  class="border-outline hover:bg-surface-hover dark:hover:bg-surface-hover-dark cursor-pointer rounded-lg border px-3 py-2 hover:shadow-xs"
                >
                  #{{ tag.name }}
                </div>
              </template>
            </div>
          </div>
        </section>

        <section
          class="mt-8 flex flex-col items-center justify-between gap-y-8 lg:flex-row xl:mt-16"
        >
          <div class="font-notosans dark:text-content-dark text-content text-2xl">
            點閱數: {{ enrichedThumbnail.clickCount }}
          </div>
          <div class="flex gap-8 text-lg font-black text-white">
            <button
              class="flex cursor-pointer gap-1 rounded-md bg-blue-500 px-6 py-3 shadow-md hover:bg-blue-500/80 active:bg-blue-700 active:shadow-inner"
              @click="downloadImage(enrichedThumbnail.imageUrl, `${enrichedThumbnail.name}.jpg`)"
            >
              <Icon icon="mdi:download" class="size-7" />
              <span class="font-notosans truncate text-xl">下載圖片</span>
            </button>
          </div>
        </section>

        <div class="mt-8 flex justify-center gap-8 text-lg font-black text-white lg:justify-end">
          <button
            class="flex shrink-0 cursor-pointer gap-1 rounded-md bg-amber-500 px-6 py-3 shadow-md hover:bg-amber-500/80 active:bg-amber-700 active:shadow-inner"
            @click="
              toggleArchive({ id: enrichedThumbnail.id, value: !enrichedThumbnail.isArchived })
            "
          >
            <Icon
              :icon="
                enrichedThumbnail.isArchived
                  ? 'material-symbols:archive'
                  : 'material-symbols:archive-outline'
              "
              class="size-7 text-white"
            />
            <template v-if="enrichedThumbnail.isArchived">
              <span>解除封存</span>
            </template>
            <template v-else>
              <span>封存</span>
            </template>
          </button>
          <button
            class="flex shrink-0 cursor-pointer gap-1 rounded-md bg-red-500 px-6 py-3 shadow-md hover:bg-red-500/80 active:bg-red-700 active:shadow-inner"
            @click="onThumbnailDelete(enrichedThumbnail.id)"
          >
            <Icon icon="material-symbols:delete" class="size-7" />

            <span>刪除</span>
          </button>
        </div>

        <!-- 分享功能，暫時不實裝 -->
        <!-- <div class="mt-8 flex gap-x-4">
          <div class="">
            <Icon icon="fa-brands:facebook-square" class="text-[#0866FF]" width="48" height="48" />
          </div>
          <div class="">
            <Icon icon="fa6-brands:line" class="text-[#00C300]" width="48" height="48" />
          </div>
        </div> -->
      </div>
    </div>

    <section class="mt-16 px-4">
      <div class="flex flex-col gap-4 md:flex-row md:justify-between">
        <!-- Prev -->

        <template v-if="prev">
          <router-link
            :to="{ name: 'ThumbnailDetail', params: { id: prev.videoId } }"
            class="border-outline block w-full cursor-pointer rounded-xl border p-4 shadow-md hover:bg-gray-100 hover:shadow-lg md:max-w-1/2 xl:max-w-2xl dark:hover:bg-gray-800"
          >
            <div class="flex items-center gap-4">
              <Icon
                icon="bxs:left-arrow"
                class="text-content dark:text-content-dark size-12 shrink-0"
              />

              <div
                class="text-content font-notosans dark:text-content-dark hidden text-2xl md:block lg:hidden"
              >
                Prev
              </div>

              <div
                class="text-content dark:text-content-dark line-clamp-2 hidden grow text-lg font-semibold lg:[display:-webkit-box]"
              >
                {{ prev.name }}
              </div>

              <div class="flex h-28 w-36 shrink-0 items-center justify-center">
                <img :src="prev.imageUrl" class="w-full rounded object-contain" />
              </div>
            </div>
          </router-link>
        </template>
        <template v-else>
          <!-- 這裡用透明或佔位元素固定高度 -->
          <div class="h-full opacity-0">佔位</div>
        </template>

        <!-- Next -->
        <template v-if="next">
          <router-link
            :to="{ name: 'ThumbnailDetail', params: { id: next.videoId } }"
            class="border-outline hover:bg-surface-hover dark:hover:bg-surface-hover-dark block w-full cursor-pointer rounded-xl border p-4 shadow-md hover:shadow-lg md:max-w-1/2 lg:max-w-2xl xl:max-w-2xl"
          >
            <div class="flex items-center justify-around gap-4">
              <div class="flex h-28 w-36 shrink-0 items-center justify-center">
                <img :src="next.imageUrl" class="w-full rounded object-contain" />
              </div>
              <div
                class="text-content dark:text-content-dark line-clamp-2 hidden grow text-lg font-semibold lg:[display:-webkit-box]"
              >
                {{ next.name }}
              </div>

              <div
                class="text-content font-notosans dark:text-content-dark hidden truncate text-2xl md:block lg:hidden"
              >
                Next
              </div>

              <Icon
                icon="bxs:right-arrow"
                class="text-content dark:text-content-dark size-12 shrink-0"
              />
            </div>
          </router-link>
        </template>
        <template v-else>
          <div class="h-full opacity-0">佔位</div>
        </template>
      </div>
    </section>
  </template>
  <template v-else>載入中或找不到資料...</template>
</template>
