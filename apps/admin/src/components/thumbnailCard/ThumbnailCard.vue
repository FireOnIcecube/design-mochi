<script lang="ts" setup>
import { Thumbnail } from '@/packages/types'

const props = defineProps<{
  thumbnail: Thumbnail
}>()
</script>

<template>
  <div class="group relative">
    <!--  -->
    <div
      class="curosr-default absolute top-0 right-0 left-0 z-10 flex -translate-y-2 bg-black/40 opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100"
    >
      {{ props.thumbnail.name }}
    </div>
    <router-link :to="{ name: 'ThumbnailDetail', params: { id: props.thumbnail.videoId } }">
      <div class="relative aspect-video w-full">
        <div
          class="absolute inset-0 transition duration-300 ease-in-out group-hover:bg-white/40"
        ></div>
        <img
          :src="props.thumbnail.imageUrl"
          class="h-full w-full rounded object-cover"
          alt="Thumbnail"
        />
      </div>

      <p
        class="font-notosans dark:text-content-dark group-hover:text-content-link dark:group-hover:text-content-link-dark mt-2 line-clamp-2 text-xs lg:text-lg"
      >
        {{ props.thumbnail.name }}
      </p>

      <!-- <button
      class="absolute top-2 right-2 hidden rounded-full bg-white p-1 text-red-500 shadow transition group-hover:block hover:bg-red-100"
      title="刪除"
    >
      🗑️
    </button> -->
    </router-link>
  </div>
</template>
