<script setup lang="tsx">
import { computed, ref } from 'vue'
import { ChevronDown, ChevronFirst, ChevronRight } from 'lucide-vue-next'
import { Icon } from '@iconify/vue'
import SearchDialog from '@client/components/SearchDialog.vue'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport
} from '@client/components/ui/navigation-menu'

const isCategoryOpen = ref(false)

const toggleCategoryMenu = () => {
  isCategoryOpen.value = !isCategoryOpen.value
}

type Category = {
  title: string
  items: { name: string; href: string; description?: string }[]
  children?: Category[]
}

const categories = ref<Category[]>([
  {
    title: '類別一',
    items: [
      { name: '測試項目 A', href: '#' },
      { name: '測試項目 B', href: '#' }
    ]
  },

  {
    title: '類別二',
    items: [{ name: '測試項目 A', href: '#' }]
  },
  {
    title: '類別三',
    items: [
      { name: '測試項目 A', href: '#' },
      { name: '測試項目 B', href: '#' },
      { name: '測試項目 C', href: '#' }
    ]
  },
  {
    title: '類別四',
    items: [
      { name: '測試項目 A', href: '#' },
      { name: '測試項目 B', href: '#' },
      { name: '測試項目 C', href: '#' }
    ]
  },
  {
    title: '類別五',
    items: [
      { name: '測試項目 A', href: '#' },
      { name: '測試項目 B', href: '#' }
    ]
  },
  {
    title: '類別六',
    items: [
      { name: '測試項目 A', href: '#' },
      { name: '測試項目 B', href: '#' },
      { name: '測試項目 C', href: '#' },
      { name: '測試項目 A', href: '#' },
      { name: '測試項目 B ', href: '#' },
      { name: '測試項目 C', href: '#' }
    ]
  },
  {
    title: '類別七',
    items: [
      { name: '測試項目 A', href: '#' },
      { name: '測試項目 B', href: '#' },
      { name: '測試項目 C', href: '#' }
    ]
  },
  {
    title: '類別八',
    items: [
      { name: '測試項目 A', href: '#' },
      { name: '測試項目 B', href: '#' },
      { name: '測試項目 C', href: '#' }
    ]
  }
])
</script>

<template>
  <div class="bg-surface dark:bg-surface-dark transition-theme shadow-md">
    <div class="mx-auto flex max-w-screen-xl">
      <NavigationMenu class="mx-auto py-2">
        <NavigationMenuList class="gap-x-8">
          <NavigationMenuItem v-for="(category, categoryIndex) in categories" :key="categoryIndex">
            <NavigationMenuTrigger class="text-content dark:text-content-dark text-lg font-bold">{{
              category.title
            }}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul
                class="w-max gap-3 p-4"
                :class="`grid grid-cols-${Math.ceil(category.items.length / 5)} `"
              >
                <li v-for="(item, itemIndex) in category.items" :key="itemIndex" class="w-[250px]">
                  <NavigationMenuLink as-child>
                    <a
                      :href="item.href"
                      class="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block select-none space-y-1 rounded-md p-4 leading-none no-underline outline-none transition-colors"
                    >
                      <div
                        class="text-content dark:text-content-dark flex items-center justify-between"
                      >
                        <p class="text-md font-notosans leading-none">
                          {{ item.name }}
                        </p>
                        <ChevronRight class="size-5" aria-hidden="true" />
                      </div>
                    </a>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div
        class="group ml-16 flex cursor-pointer items-center justify-center bg-gray-200 dark:bg-gray-800"
      >
        <SearchDialog />
      </div>
    </div>
  </div>
</template>
