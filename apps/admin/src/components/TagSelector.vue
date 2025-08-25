<script lang="ts" setup>
import { ThumbnailCategory } from '@pkg/types'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import { reactive, ref } from 'vue'

const props = defineProps<{
  thumbnailCategories: ThumbnailCategory[]
}>()

const emit = defineEmits<{
  (e: 'change', payload: Record<string, string[]>): void
}>()

const seletedTags = reactive<Record<string, Set<string>>>({})

function isTagSelected(catSlug: string, tagSlug: string): boolean {
  return seletedTags[catSlug]?.has(tagSlug) ?? false
}

function toggleTag(catSlug: string, tagSlug: string) {
  seletedTags[catSlug] ??= new Set()

  if (seletedTags[catSlug].has(tagSlug)) {
    seletedTags[catSlug].delete(tagSlug)
  } else {
    seletedTags[catSlug].add(tagSlug)
  }
  emit('change', serializeSelectedTags())
}

function serializeSelectedTags(): Record<string, string[]> {
  return Object.fromEntries(
    Object.entries(seletedTags).map(([catSlug, tagSet]) => [catSlug, Array.from(tagSet)]),
  )
}
</script>

<template>
  <TabGroup as="div" class="flex h-full w-full flex-col px-2 sm:px-0">
    <TabList
      class="dark:bg-surface-dark grid auto-cols-max grid-flow-col gap-x-2 overflow-x-auto rounded-lg bg-gray-100 p-1 text-center text-gray-500"
    >
      <Tab
        v-for="(category, index) in props.thumbnailCategories"
        as="template"
        :key="index"
        v-slot="{ selected }"
      >
        <button
          :class="[
            'border-outline dark:border-outline-dark w-full min-w-[120px] cursor-pointer rounded-lg border-2 px-4 py-2 text-sm leading-5 font-medium',
            'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:ring-2 focus:outline-none',
            selected
              ? 'bg-white text-blue-700 shadow dark:bg-gray-950 dark:text-blue-300'
              : 'text-content dark:text-content-dark hover:bg-white/[0.12] hover:text-blue-700',
          ]"
        >
          {{ category.name }}
        </button>
      </Tab>
    </TabList>

    <TabPanels class="border-outline mt-2 flex-1 border-2">
      <TabPanel
        v-for="category in props.thumbnailCategories"
        :key="category.id"
        :class="[
          'h-full p-4',
          'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:ring-2 focus:outline-none',
        ]"
      >
        <h2 class="mb-4 text-lg font-semibold text-gray-700 dark:text-gray-200">
          {{ category.name }}
        </h2>

        <ul
          v-if="category.tags && category.tags.length > 0"
          class="grid auto-rows-[40px] grid-cols-2 gap-3 p-4 sm:grid-cols-3 md:grid-cols-4"
        >
          <li
            v-for="tag in category.tags"
            :key="tag.id"
            class="border-outline dark:border-outline-dark overflow-hidden rounded-md border-2"
          >
            <label
              class="inline-flex h-full w-full cursor-pointer items-center px-2 hover:bg-gray-100 dark:hover:bg-gray-950"
            >
              <input
                type="checkbox"
                :checked="isTagSelected(category.slug, tag.slug)"
                class="peer sr-only"
                @change="toggleTag(category.slug, tag.slug)"
              />
              <div
                class="h-5 w-5 flex-shrink-0 rounded border-2 border-gray-400 peer-checked:border-blue-500 peer-checked:bg-blue-500"
              ></div>
              <span
                class="ml-2 flex-1 truncate text-sm font-medium text-gray-800 dark:text-gray-200"
              >
                {{ tag.name }}
              </span>
            </label>
          </li>
        </ul>

        <div
          v-else
          class="flex h-32 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 text-sm text-gray-400 dark:border-gray-700 dark:bg-gray-900/30 dark:text-gray-600"
        >
          無標籤資料
        </div>
      </TabPanel>
    </TabPanels>
  </TabGroup>
</template>
