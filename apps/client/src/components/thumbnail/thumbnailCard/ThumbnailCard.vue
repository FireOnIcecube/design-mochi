<script lang="ts" setup>
import { Thumbnail } from '@/packages/types'
import { Icon } from '@iconify/vue'
import { ref, watch } from 'vue'

const props = defineProps<{
  thumbnail: Thumbnail
  openThumbnailModal: (t: Thumbnail) => void
}>()
</script>

<template>
  <div class="group relative" @click="openThumbnailModal(props.thumbnail)">
    <!-- Thumbnail 工具列 -->
    <div
      class="curosr-default absolute left-0 right-0 top-0 z-10 -translate-y-2 bg-black/40 opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100"
    ></div>
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

      <div class="absolute bottom-2 right-2 bg-black/40 p-1">
        <div class="flex items-center gap-2 text-white">
          <Icon icon="icon-park-outline:click" class="h-6 w-6" />

          <span class="font-notosans text-md">{{ props.thumbnail.clickCount }}</span>
        </div>
      </div>
    </div>

    <p
      class="font-notosans dark:text-content-dark group-hover:text-content-link dark:group-hover:text-content-link-dark mt-2 line-clamp-2 select-none text-xs lg:text-lg"
    >
      {{ props.thumbnail.name }}
    </p>
    <!-- </router-link> -->
  </div>
</template>
