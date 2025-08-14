<script lang="ts" setup>
import { ThumbnailTag } from '@/packages/types'
import { MenuItem } from '@headlessui/vue'

const props = defineProps<{
  tag: ThumbnailTag
}>()
</script>
<template>
  <MenuItem v-slot="{ active }">
    <button
      :class="[
        active ? 'bg-violet-500 text-white' : 'text-gray-900',
        'group flex w-full items-center rounded-md px-2 py-2 text-sm',
      ]"
    >
      {{ props.tag.name }}
    </button>
  </MenuItem>
</template>
