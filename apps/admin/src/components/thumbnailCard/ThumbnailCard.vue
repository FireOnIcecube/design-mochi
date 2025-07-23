<script lang="ts" setup>
import { Thumbnail } from '@/packages/types'

const props = defineProps<{
  thumbnail: Thumbnail
}>()
</script>

<template>
  <router-link
    :to="{ name: 'ThumbnailDetail', params: { id: props.thumbnail.videoId } }"
    class="group block"
  >
    <div class="aspect-video w-full">
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
  </router-link>
</template>
