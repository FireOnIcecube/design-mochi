<script setup lang="tsx">
import { Icon } from '@iconify/vue'

const props = defineProps<{
  title: string
  primaryColor: string
  icon: string
  routeName: string
}>()
</script>

<template>
  <router-link
    :to="{ name: props.routeName }"
    :class="props.primaryColor"
    class="flex items-center justify-end gap-2 py-2.5 px-4 z-10 rounded-r-full cursor-pointer transition-all hover:-translate-y-1.5 hover:scale-[1.15] hover:shadow-2xl"
  >
    <div class="text-white font-semibold tracking-wide text-nowrap text-lg lg:text-xl">
      {{ props.title }}
    </div>

    <Icon :icon="props.icon" class="text-white text-4xl" />
  </router-link>
</template>

<style lang="css" scoped></style>
