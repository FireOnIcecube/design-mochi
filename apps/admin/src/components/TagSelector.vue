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
  Featured: [
    {
      id: 1,
      title: 'The science behind espresso pressure',
      date: '1w ago',
      commentCount: 14,
      shareCount: 8,
    },
    {
      id: 2,
      title: 'How baristas train for competitions',
      date: '3w ago',
      commentCount: 6,
      shareCount: 3,
    },
  ],
  EditorsPick: [
    {
      id: 1,
      title: '5 coffees to try before you die',
      date: 'May 12',
      commentCount: 20,
      shareCount: 10,
    },
    {
      id: 2,
      title: 'What makes a coffee truly single-origin?',
      date: 'May 9',
      commentCount: 11,
      shareCount: 7,
    },
  ],
  WeeklyTop: [
    {
      id: 1,
      title: 'New trends in iced coffee brewing',
      date: '3d ago',
      commentCount: 17,
      shareCount: 6,
    },
    { id: 2, title: 'Cold brew myths debunked', date: '5d ago', commentCount: 9, shareCount: 4 },
  ],
  MonthlyTop: [
    {
      id: 1,
      title: 'Global coffee prices explained',
      date: 'Jun 15',
      commentCount: 32,
      shareCount: 18,
    },
    {
      id: 2,
      title: 'The rise of boutique roasters',
      date: 'Jun 9',
      commentCount: 25,
      shareCount: 11,
    },
  ],
  MostCommented: [
    {
      id: 1,
      title: 'Why instant coffee deserves respect',
      date: 'Apr 1',
      commentCount: 42,
      shareCount: 7,
    },
    {
      id: 2,
      title: 'Espresso vs. Drip: The eternal battle',
      date: 'Apr 4',
      commentCount: 38,
      shareCount: 10,
    },
  ],
  MostShared: [
    { id: 1, title: 'Coffee gadgets under $50', date: 'Mar 5', commentCount: 13, shareCount: 29 },
    { id: 2, title: 'DIY latte art techniques', date: 'Mar 11', commentCount: 10, shareCount: 25 },
  ],
  Controversial: [
    { id: 1, title: 'Is decaf really coffee?', date: 'Jun 30', commentCount: 31, shareCount: 3 },
    {
      id: 2,
      title: 'The ethics of coffee pod machines',
      date: 'Jun 18',
      commentCount: 19,
      shareCount: 5,
    },
  ],
  Beginners: [
    {
      id: 1,
      title: 'Coffee basics: Beans, grind & brew',
      date: '1d ago',
      commentCount: 4,
      shareCount: 1,
    },
    {
      id: 2,
      title: 'How to start your home brewing journey',
      date: '2d ago',
      commentCount: 3,
      shareCount: 2,
    },
  ],
  Advanced: [
    {
      id: 1,
      title: 'Water chemistry and coffee flavor',
      date: 'May 30',
      commentCount: 12,
      shareCount: 6,
    },
    { id: 2, title: 'Grinder alignment guide', date: 'Jun 3', commentCount: 7, shareCount: 4 },
  ],
  Reviews: [
    {
      id: 1,
      title: 'Top 3 espresso machines of 2025',
      date: 'Jul 10',
      commentCount: 15,
      shareCount: 8,
    },
    {
      id: 2,
      title: 'We tested 10 milk frothers — here’s the best',
      date: 'Jul 8',
      commentCount: 9,
      shareCount: 3,
    },
  ],
  Opinion: [
    {
      id: 1,
      title: 'Should coffee be more expensive?',
      date: 'Jun 1',
      commentCount: 10,
      shareCount: 6,
    },
    {
      id: 2,
      title: 'The third wave is over — now what?',
      date: 'Jun 5',
      commentCount: 8,
      shareCount: 5,
    },
  ],
  FunFacts: [
    {
      id: 1,
      title: 'Coffee was once banned in Mecca',
      date: 'Fun',
      commentCount: 2,
      shareCount: 3,
    },
    {
      id: 2,
      title: 'Beethoven counted 60 beans per cup',
      date: 'Trivia',
      commentCount: 1,
      shareCount: 4,
    },
  ],
})

function changeValue() {
  console.error('its change')
}
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
  <TabGroup as="div" class="flex h-full w-full flex-col px-2 sm:px-0" @change="changeValue">
    <TabList
      class="dark:bg-surface-dark grid auto-cols-max grid-flow-col gap-x-2 overflow-x-auto rounded-lg bg-gray-100 p-1 text-center text-gray-500"
    >
      <Tab
        v-for="category in Object.keys(categories)"
        as="template"
        :key="category"
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
          {{ category }}
        </button>
      </Tab>
    </TabList>

    <TabPanels class="border-outline mt-2 flex-1 border-2">
      <TabPanel
        v-for="(posts, idx) in Object.values(categories)"
        :key="idx"
        :class="[
          'h-full p-4',
          'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:ring-2 focus:outline-none',
        ]"
      >
        <ul class="grid auto-rows-[40px] grid-cols-4 place-content-stretch">
          <li class="border-outline dark:border-outline-dark overflow-hidden border-2 px-2">
            <label
              class="inline-flex h-full w-full cursor-pointer items-center hover:bg-gray-100 dark:hover:bg-gray-950"
            >
              <input type="checkbox" class="peer sr-only" />
              <div
                class="h-5 w-5 rounded border-2 border-gray-400 peer-checked:border-blue-500 peer-checked:bg-blue-500"
              ></div>
              <span
                class="text-md font-notosans ml-2 flex-1 overflow-hidden text-ellipsis whitespace-nowrap"
              >
                選項選項選項選項選項選項選項選項選項選項選項選項選項選項選項選項選項選項選項選項
              </span>
            </label>
          </li>
        </ul>
        <!-- <ul>
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
        </ul> -->
      </TabPanel>
    </TabPanels>
  </TabGroup>
</template>
