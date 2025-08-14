<script setup lang="ts">
import { computed, ref } from 'vue'
// import { ChevronDown, ChevronFirst, ChevronRight } from 'lucide-vue-next'
import { Icon } from '@iconify/vue'
// import { SearchDialog } from '@client/components/SearchDialog'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '@admin/components/ui/navigation-menu'
import { RouterLink } from 'vue-router'
import { ThumbnailCategory } from '@/packages/types'

const props = defineProps<{
  thumbnailCategories: ThumbnailCategory[]
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
          <NavigationMenuItem v-for="category in props.thumbnailCategories" :key="category.id">
            <NavigationMenuTrigger class="text-content dark:text-content-dark text-lg font-bold">{{
              category.name
            }}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul
                class="w-max gap-3 p-4"
                :class="
                  category.tags?.length && category.tags.length >= 5
                    ? `grid [grid-template-columns:repeat(${Math.ceil(category.tags.length / 5)},minmax(0,1fr))]`
                    : ''
                "
              >
                <li v-for="tag in category.tags" :key="tag.id" class="w-[250px]">
                  <NavigationMenuLink as-child>
                    <RouterLink
                      to="/"
                      class="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-4 leading-none no-underline transition-colors outline-none select-none"
                    >
                      <div
                        class="text-content dark:text-content-dark flex items-center justify-between"
                      >
                        <p class="font-notosans text-lg leading-none">
                          {{ tag.name }}
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
