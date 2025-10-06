<script lang="ts" setup>
import { Thumbnail } from '@/packages/types'
import { Icon } from '@iconify/vue'
import { useLocalStorage } from '@vueuse/core'
import { computed, ref, watch } from 'vue'

const props = defineProps<{
  thumbnail: Thumbnail
  openThumbnailModal: (t: Thumbnail) => void
}>()

// 定義儲存 收藏 Thumbnail 的 id
const favoriteIds = useLocalStorage<string[]>('favoriteThumbnailIds', [])

const isFavorited = computed(() => favoriteIds.value.includes(props.thumbnail.id))

const emit = defineEmits<{
  (e: 'toggle-favorite', thumbnailId: string): void
}>()

function onToggleFavorite(id: string) {
  emit('toggle-favorite', id)
}
</script>

<template>
  <div class="group relative select-none" @click="openThumbnailModal(props.thumbnail)">
    <!-- <router-link :to="{ name: 'ThumbnailDetail', params: { id: props.thumbnail.id } }"> -->
    <div class="relative aspect-video w-full">
      <!-- <div
        class="absolute inset-0 transition duration-300 ease-in-out group-hover:bg-white/30"
      ></div> -->
      <img
        :src="props.thumbnail.imageUrl"
        class="h-full w-full rounded object-cover"
        alt="Thumbnail"
      />

      <!-- <div class="absolute bottom-2 right-2 bg-black/40 p-1">
        <div class="flex items-center gap-2 text-white">
          <Icon icon="icon-park-outline:click" class="h-6 w-6" />

          <span class="font-notosans text-md">{{ props.thumbnail.clickCount }}</span>
        </div>
      </div> -->

      <div
        class="icon-wrapper pointer-events-none absolute bottom-2 right-2 hidden rounded-full bg-black/40 p-2 xl:block"
        @click.stop="onToggleFavorite(props.thumbnail.id)"
      >
        <Icon
          :icon="isFavorited ? 'mdi:heart' : 'mdi:heart-outline'"
          class="size-7"
          :class="isFavorited ? 'text-red-500' : 'text-white'"
        />
      </div>
    </div>

    <p
      class="font-notosans dark:text-content-dark group-hover:text-content-link dark:group-hover:text-content-link-dark mt-2 line-clamp-2 select-none text-xs lg:text-lg"
    >
      {{ props.thumbnail.name }}
    </p>
    <div class="mt-2 flex flex-wrap gap-x-2 gap-y-1">
      <template v-for="value in props.thumbnail.categories.flatMap((cat) => cat.tags)">
        <span class="rounded-md bg-blue-500 px-2 py-1">{{ value }}</span>
      </template>
    </div>

    <!-- </router-link> -->
  </div>
</template>

<style scoped>
.icon-wrapper {
  opacity: 0;
  transform: scale(0.9);
  pointer-events: none;
  transition:
    opacity 0.3s,
    transform 0.15s;
}

.group:hover .icon-wrapper {
  opacity: 1;
  transform: scale(1);
  pointer-events: auto;
  cursor: pointer;
}

/* hover + active 狀態 */
.group:hover .icon-wrapper:active {
  transform: scale(0.8);
}
</style>
