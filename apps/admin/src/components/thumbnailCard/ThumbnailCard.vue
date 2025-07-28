<script lang="ts" setup>
import { Thumbnail } from '@/packages/types'
import { Icon } from '@iconify/vue'

const props = defineProps<{
  thumbnail: Thumbnail
}>()

const emit = defineEmits<{
  (e: 'toggle-hidden', id: string): void
}>()

function handleToggleHidden() {
  emit('toggle-hidden', props.thumbnail.id)
}
</script>

<template>
  <div class="group relative">
    <!-- Thumbnail 工具列 -->
    <div
      class="curosr-default absolute top-0 right-0 left-0 z-10 -translate-y-2 bg-black/40 opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100"
    >
      <div class="flex items-center justify-end gap-3 px-4 py-1">
        <div @click="handleToggleHidden">
          <Icon icon="streamline:visible-solid" class="size-7 text-white" />
        </div>

        <div><Icon icon="material-symbols:delete" class="size-8 text-red-500" /></div>
      </div>
    </div>
    <router-link :to="{ name: 'ThumbnailDetail', params: { id: props.thumbnail.id } }">
      <div class="relative aspect-video w-full">
        <div
          class="absolute inset-0 transition duration-300 ease-in-out group-hover:bg-white/30"
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
    </router-link>
  </div>
</template>
