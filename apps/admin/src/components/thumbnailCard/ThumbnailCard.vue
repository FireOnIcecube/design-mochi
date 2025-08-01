<script lang="ts" setup>
import { Thumbnail } from '@/packages/types'
import { Icon } from '@iconify/vue'
import { ref, watch } from 'vue'

const props = defineProps<{
  thumbnail: Thumbnail
}>()

const emit = defineEmits<{
  (e: 'toggle-archive', payload: { id: string; value: boolean }): void
  (e: 'request-delete', id: string): void
}>()

const localArchived = ref(props.thumbnail.isArchived)

function handleToggleArchived() {
  const nextValue = !localArchived.value
  localArchived.value = nextValue // 立即切換 UI

  emit('toggle-archive', { id: props.thumbnail.id, value: !props.thumbnail.isArchived })
}

function handleDelete() {
  emit('request-delete', props.thumbnail.id)
}

// 如果外部 props 有變化，保持同步（防止外部強制改變）
watch(
  () => props.thumbnail.isHidden,
  (newVal) => {
    localArchived.value = newVal
  },
)
</script>

<template>
  <div class="group relative">
    <!-- Thumbnail 工具列 -->
    <div
      class="curosr-default absolute top-0 right-0 left-0 z-10 -translate-y-2 bg-black/40 opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100"
    >
      <div class="flex items-center justify-end gap-3 px-4 py-1">
        <div @click="handleToggleArchived">
          <Icon
            :icon="localArchived ? 'material-symbols:archive' : 'material-symbols:archive-outline'"
            class="size-7 text-white"
          />
        </div>

        <div @click="handleDelete">
          <Icon icon="material-symbols:delete" class="size-8 text-red-500" />
        </div>
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
