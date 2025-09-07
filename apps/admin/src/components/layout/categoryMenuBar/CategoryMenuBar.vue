<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { SearchDialog } from '@admin/components/common/SearchDialog'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@admin/components/ui/navigation-menu'
import { RouterLink } from 'vue-router'
import { useThumbnailCategoryStore } from '@admin/stores/useThumbnailCategoryStore'

const categoryStore = useThumbnailCategoryStore()
onMounted(async () => {
  if (!categoryStore.data) {
    categoryStore.fetchAll({ order: { createdAt: 'asc' } })
  }
})

const props = defineProps<{
  isVtuber: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle-vtuber-mode', value: boolean): void
}>()

const localVtuber = ref<boolean>(false)

function onToggleVtuberMode() {
  localVtuber.value = !localVtuber.value
  emit('toggle-vtuber-mode', localVtuber.value)
}

watch(
  () => props.isVtuber,
  (newVal) => {
    localVtuber.value = newVal
  },
)
</script>

<template>
  <div class="transition-theme h-full w-full">
    <div
      class="bg-primary/70 dark:bg-primary-dark/60 mx-auto flex max-w-screen-xl justify-center rounded-full backdrop-blur-md"
    >
      <NavigationMenu class="py-2">
        <NavigationMenuList class="gap-x-8">
          <NavigationMenuItem v-for="category in categoryStore.data" :key="category.id">
            <NavigationMenuTrigger class="text-content dark:text-content-dark text-lg font-bold">{{
              category.name
            }}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul
                v-if="category.tags?.length"
                class="grid w-max gap-3 p-4"
                :style="{
                  gridTemplateColumns: `repeat(${Math.ceil(category.tags.length / 5)}, minmax(0, 1fr))`,
                }"
              >
                <li v-for="tag in category.tags" :key="tag.id" class="w-[250px]">
                  <NavigationMenuLink as-child>
                    <RouterLink
                      :to="{
                        name: 'ThumbnailList',
                        query: {
                          [category.slug]: tag.slug,
                        },
                      }"
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

      <div class="group ml-12 flex items-center justify-center gap-x-8">
        <button
          type="button"
          :class="
            localVtuber
              ? 'scale-95 bg-[#997557] shadow-[inset_4px_4px_8px_#00000066]'
              : 'bg-[#BFA488] shadow-lg'
          "
          class="cursor-pointer rounded px-4 py-2 text-white transition-all duration-150 active:scale-95"
          @click="onToggleVtuberMode"
        >
          Vtuber
        </button>

        <div class="cursor-pointer rounded-full bg-[#E6D7C5] dark:bg-gray-800">
          <SearchDialog :thumbnailCategories="categoryStore.data" />
        </div>
      </div>
    </div>
  </div>
</template>
