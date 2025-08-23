<script setup lang="ts">
import { ref, defineExpose, computed, onMounted } from 'vue'
import type { Thumbnail, ThumbnailCategory } from '@/packages/types'
import { useThumbnailStore } from '@admin/stores/useThumbnailStore'
import { useThumbnailCategoryStore } from '@admin/stores/useThumbnailCategoryStore'
import { deleteThumbnail, editThumbnail } from '@/packages/firebase/db/entities/thumbnail'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'

const router = useRouter()

const isOpen = ref(false)
const thumbnail = ref<Thumbnail | null>(null)

const thumbnailStore = useThumbnailStore()
const categoryStore = useThumbnailCategoryStore()

const enrichedThumbnail = computed(() => {
  if (!thumbnail.value) return null

  // 從 store 撈出最新的完整資料
  const storeThumbnail = thumbnailStore.data.find((t) => t.id === thumbnail.value?.id)
  if (!storeThumbnail) return null

  return enrichThumbnail(storeThumbnail, categoryStore.data)
})

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

function open(t: Thumbnail) {
  thumbnail.value = t
  isOpen.value = true
}

function close() {
  isOpen.value = false
  thumbnail.value = null
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
      router.push({ name: 'ThumbnailList', params: {} })
    } catch (e) {
      alert('暫時無法 刪除封面 , 請稍後再試')
      console.error(e)
    } finally {
      await thumbnailStore.fetchAll({ order: { createdAt: 'desc' } })
      close()
    }
  }
}

defineExpose({ open, close })
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    @click="close"
  >
    <div
      v-if="enrichedThumbnail"
      @click.stop
      class="max-w-8xl bg-surface dark:bg-surface-dark max-h-[90vh] w-[95%] overflow-y-auto rounded-2xl p-6 shadow-xl sm:w-[90%] md:w-[85%]"
    >
      <div
        v-if="enrichedThumbnail.isArchived"
        class="mb-10 flex w-full items-center justify-center gap-2 bg-amber-500 py-2 text-white"
      >
        <Icon icon="material-symbols:archive" class="size-7" />
        <span class="font-notosans text-lg">此封面已被封存</span>
      </div>

      <div class="flex h-full flex-col justify-around lg:flex-row">
        <div class="w-full lg:w-1/2">
          <div
            class="flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg bg-gray-200"
          >
            <img
              :src="enrichedThumbnail.imageUrl"
              class="h-full w-full object-cover object-center"
            />
          </div>

          <div class="flex flex-nowrap">
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
          <section class="border-outline mt-8 border-b-2 pb-6 lg:mt-0">
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
            v-if="thumbnailStore.data.length"
            class="border-outline flex flex-col justify-items-center gap-y-8 border-b-2 pt-3 pb-6"
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
                    class="border-outline hover:bg-surface-hover cursor-pointer rounded-lg border px-3 py-2 hover:shadow-xs"
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
            <div class="font-notosans text-2xl">點閱數: {{ enrichedThumbnail.clickCount }}</div>
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
    </div>
  </div>
</template>
