<script lang="ts" setup>
import { ThumbnailCategory } from '@/packages/types'

const props = defineProps<{
  thumbnailCategories: ThumbnailCategory[]
}>()
</script>
<template>
  <div class="flex h-full w-full items-center justify-center p-4">
    <div
      class="text-content font-notosans dark:text-content-dark flex gap-x-8 overflow-x-auto bg-amber-400 bg-red-300 px-8 text-lg"
    >
      <div
        v-for="cat in props.thumbnailCategories"
        :key="cat.id"
        class="min-w-[120px] flex-shrink-0"
      >
        {{ cat.name }}
      </div>
    </div>
  </div>
</template>
