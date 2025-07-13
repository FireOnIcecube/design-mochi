<script lang="ts" setup>
import { ThumbnailCategory } from '@pkg/types'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import { ref } from 'vue'

// const props = defineProps<{
//   categories: ThumbnailCategory[]
// }>()

// const emit = defineEmits<{
//   (e: 'udpateValue'): void
// }>()

const categories = ref({
  Recent: [
    {
      id: 1,
      title: 'Does drinking coffee make you smarter?',
      date: '5h ago',
      commentCount: 5,
      shareCount: 2,
    },
    {
      id: 2,
      title: "So you've bought coffee... now what?",
      date: '2h ago',
      commentCount: 3,
      shareCount: 2,
    },
  ],
  Popular: [
    {
      id: 1,
      title: 'Is tech making coffee better or worse?',
      date: 'Jan 7',
      commentCount: 29,
      shareCount: 16,
    },
    {
      id: 2,
      title: 'The most innovative things happening in coffee',
      date: 'Mar 19',
      commentCount: 24,
      shareCount: 12,
    },
  ],
  Trending: [
    {
      id: 1,
      title: 'Ask Me Anything: 10 answers to your questions about coffee',
      date: '2d ago',
      commentCount: 9,
      shareCount: 5,
    },
    {
      id: 2,
      title: "The worst advice we've ever heard about coffee",
      date: '4d ago',
      commentCount: 1,
      shareCount: 2,
    },
  ],
})
</script>

<!-- <template>
  <TabGroup>
    <div class="text-content dark:text-content-dark flex h-full flex-col">
      <TabList class="flex flex-nowrap overflow-auto bg-amber-200">
        <Tab class="min-w-[120px] rounded-md rounded-b-none border px-4 py-2">Tab 1</Tab>
        <Tab class="min-w-[120px] border px-4 py-2">Tab 2</Tab>
        <Tab class="min-w-[120px] border px-4 py-2">Tab 3</Tab>
      </TabList>
      <TabPanels class="flex-1 bg-blue-400">
        <TabPanel>Content 1</TabPanel>
        <TabPanel>Content 2</TabPanel>
        <TabPanel>Content 3</TabPanel>
      </TabPanels>
    </div>
  </TabGroup>
</template> -->

<template>
  <div class="w-full px-2 sm:px-0">
    <TabGroup>
      <TabList class="flex flex-nowrap space-x-1 overflow-x-auto rounded-xl bg-blue-900/20 p-1">
        <Tab
          v-for="category in Object.keys(categories)"
          as="template"
          :key="category"
          v-slot="{ selected }"
        >
          <button
            :class="[
              'w-full rounded-lg py-2.5 text-sm leading-5 font-medium',
              'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:ring-2 focus:outline-none',
              selected
                ? 'bg-white text-blue-700 shadow'
                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
            ]"
          >
            {{ category }}
          </button>
        </Tab>
      </TabList>

      <TabPanels class="border-outline mt-2 border-2">
        <TabPanel
          v-for="(posts, idx) in Object.values(categories)"
          :key="idx"
          :class="[
            'rounded-xl bg-white p-3',
            'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:ring-2 focus:outline-none',
          ]"
        >
          <ul>
            <li
              v-for="post in posts"
              :key="post.id"
              class="relative rounded-md p-3 hover:bg-gray-100"
            >
              <h3 class="text-sm leading-5 font-medium">
                {{ post.title }}
              </h3>

              <ul class="mt-1 flex space-x-1 text-xs leading-4 font-normal text-gray-500">
                <li>{{ post.date }}</li>
                <li>&middot;</li>
                <li>{{ post.commentCount }} comments</li>
                <li>&middot;</li>
                <li>{{ post.shareCount }} shares</li>
              </ul>

              <a
                href="#"
                :class="[
                  'absolute inset-0 rounded-md',
                  'ring-blue-400 focus:z-10 focus:ring-2 focus:outline-none',
                ]"
              />
            </li>
          </ul>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>
