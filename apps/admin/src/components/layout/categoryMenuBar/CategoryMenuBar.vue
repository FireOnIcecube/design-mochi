<script lang="ts" setup>
import { ThumbnailCategory } from '@/packages/types'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

const props = defineProps<{
  thumbnailCategories: ThumbnailCategory[]
}>()

const links = [
  { href: '/account-settings', label: 'Account settings' },
  { href: '/support', label: 'Support' },
  { href: '/license', label: 'License' },
  { href: '/sign-out', label: 'Sign out' },
]
</script>
<template>
  <div class="flex h-full w-full items-center justify-center px-4 py-2">
    <div
      class="text-content font-notosans dark:text-content-dark flex h-full items-center gap-x-8 overflow-x-auto overflow-y-hidden text-lg"
    >
      <div
        v-for="cat in props.thumbnailCategories"
        :key="cat.id"
        class="min-w-[120px] flex-shrink-0 cursor-pointer bg-amber-400 p-4 text-center"
      >
        {{ cat.name }}
      </div>
    </div>
  </div>
</template>
