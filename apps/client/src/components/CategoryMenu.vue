<script setup lang="tsx">
import { computed, ref } from 'vue'
import { ChevronDown, ChevronFirst, ChevronRight } from 'lucide-vue-next'
import { Icon } from '@iconify/vue'
import { SearchDialog } from '@client/components/SearchDialog'

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
import { RouterLink } from 'vue-router'

const props = defineProps<{
  thumbnailCategories: {
    id: string
    label: string
    options: { id: number; label: string; value: string }[]
  }[]
}>()

const isCategoryOpen = ref(false)

const toggleCategoryMenu = () => {
  isCategoryOpen.value = !isCategoryOpen.value
}
</script>

<template>
  <div class="bg-surface dark:bg-surface-dark transition-theme shadow-md">
    <div class="mx-auto flex max-w-screen-xl justify-center">
      <NavigationMenu class="py-2">
        <NavigationMenuList class="gap-x-8">
          <NavigationMenuItem
            v-for="(category, categoryIndex) in props.thumbnailCategories"
            :key="categoryIndex"
          >
            <NavigationMenuTrigger class="text-content dark:text-content-dark text-lg font-bold">{{
              category.label
            }}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul
                class="w-max gap-3 p-4"
                :class="`grid grid-cols-${Math.ceil(category.options.length / 5)} `"
              >
                <li v-for="(opt, optIndex) in category.options" :key="optIndex" class="w-[250px]">
                  <NavigationMenuLink as-child>
                    <RouterLink
                      to="/"
                      class="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block select-none space-y-1 rounded-md p-4 leading-none no-underline outline-none transition-colors"
                    >
                      <div
                        class="text-content dark:text-content-dark flex items-center justify-between"
                      >
                        <p class="font-notosans text-lg leading-none">
                          {{ opt.label }}
                        </p>
                        <ChevronRight class="size-5" aria-hidden="true" />
                      </div>
                    </RouterLink>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div
        class="group ml-12 flex cursor-pointer items-center justify-center bg-gray-200 dark:bg-gray-800"
      >
        <SearchDialog :thumbnailCategories="props.thumbnailCategories" />
      </div>
    </div>
  </div>
</template>
