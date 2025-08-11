<script lang="ts" setup>
import { ThumbnailCategory } from '@/packages/types'

const props = defineProps<{
  thumbnailCategories: ThumbnailCategory[]
}>()
</script>
<template>
  <div class="flex h-full w-full items-center justify-center p-4">
    <div class="text-content dark:text-content-dark flex items-center justify-center gap-x-8 px-8">
      <div v-for="cat in props.thumbnailCategories" :key="cat.id">
        {{ cat.name }}
      </div>
    </div>
  </div>
</template>
