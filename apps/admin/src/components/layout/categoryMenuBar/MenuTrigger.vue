<script lang="ts" setup>
import { Menu, MenuButton, MenuItems } from '@headlessui/vue'
import MenuItem from './MenuItem.vue'

import { ThumbnailTag } from '@pkg/types'

const props = defineProps<{
  category: {
    name: string
    slug: string
    tags?: ThumbnailTag[]
  }
}>()
</script>

<template>
  <Menu as="div" class="relative inline-block text-left">
    <MenuButton
      class="font-notosans inline-flex w-full cursor-pointer justify-center rounded-md px-4 py-2 text-lg font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
    >
      {{ props.category.name }}
    </MenuButton>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems
        class="absolute left-1/2 z-60 mt-2 w-56 origin-top -translate-x-1/2 divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
      >
        <div class="px-1 py-1">
          <template v-for="(tag, index) in props.category.tags" :key="index">
            <MenuItem :tag="tag" />
          </template>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>
