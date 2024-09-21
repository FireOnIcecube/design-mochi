<script setup lang="tsx">
import { Icon } from '@iconify/vue'
import type { JsxElement } from 'typescript'

const props = defineProps<{ title: string; primaryColor: string; icon: string }>()
</script>

<template>
  <div
    :class="props.primaryColor"
    class="flex items-center justify-end gap-2 py-2.5 px-4 z-10 rounded-r-full cursor-pointer peer"
  >
    <div class="text-white font-semibold tracking-wide text-lg lg:text-xl">{{ props.title }}</div>

    <Icon :icon="props.icon" class="text-white text-6xl lg:text-4xl" />
  </div>
</template>

<style lang="css" scoped></style>
