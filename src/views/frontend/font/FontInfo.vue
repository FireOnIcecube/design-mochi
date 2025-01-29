<script setup lang="tsx">
import { resourceData } from '@/stores/resourceStore'
import Button from 'primevue/button'
import { Icon } from '@iconify/vue'
import Chip from 'primevue/chip'
import Tag from 'primevue/tag'

import IconDisplay from '@/components/IconDisplay.vue'

const props = defineProps<{ id: string }>()

const data = await resourceData.getResource('fonts', props.id)
</script>

<template>
  <div v-if="data === null">查無資料</div>
  <div v-else>
    <div class="flex flex-wrap py-4 rounded-lg bg-white">
      <div class="lg:h-96 sm:h-80 grow-[1.3]">
        <img :src="data.cover_url" class="h-full object-cover mx-auto" />
      </div>

      <div class="flex flex-col basis-2/5 mt-4 ml-8 gap-4 grow">
        <div class="text-4xl font-semibold text-[#755540]">{{ data.name }}</div>

        <div class="mt-2 flex gap-6">
          <Chip label="手寫體">
            <template #icon>
              <Icon icon="ic:baseline-class" width="1.5rem" height="1.5rem"></Icon>
            </template>
          </Chip>
          <Chip label="付費字體">
            <template #icon>
              <Icon icon="tabler:coin-filled" width="1.8rem" height="1.8rem"></Icon>
            </template>
          </Chip>
        </div>

        <div class="flex flex-wrap gap-4">
          <IconDisplay label="憤怒" />
          <IconDisplay label="開心" />
          <IconDisplay label="可愛" />
          <IconDisplay label="害怕" />
          <IconDisplay label="現代" />
          <IconDisplay label="懷舊" />
          <IconDisplay label="穩重" />
          <IconDisplay label="唯美" />
        </div>

        <div class="my-auto">
          <a
            target="_blank"
            href="https://vuejs.org/"
            rel="noopener"
            class="inline-flex px-4 py-2 text-white bg-[#006E5E] rounded-lg hover:bg-[#006350] group"
          >
            <div>造訪網站</div>
            <div>
              <Icon
                icon="uil:arrow-right"
                width="1.5rem"
                height="1.5rem"
                style="color: white"
                class="transition-transform duration-300 transform group-hover:translate-x-1"
              />
            </div>
          </a>
        </div>
      </div>
    </div>

    <div class="ml-8 mt-16">
      <div class="text-2xl font-black mb-4 text-gray-900">● 介紹影片</div>
      <div class="aspect-[16/9] lg:w-10/12 xl:w-8/12 mx-auto">
        <iframe
          src="https://www.youtube.com/embed/gmwp-2nWNyI"
          title="Pariah Nexus - Finale/Salamander Arrives | Full HD | Warhammer+ TV (2023)"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          frameborder="0"
          allowfullscreen
          class="w-full h-full"
        ></iframe>
      </div>

      <div class="text-2xl font-black mt-16 mb-4 text-gray-900">● 下載說明</div>
      <div class="text-[#1e293b]">進入網站後跟著 ReadMe 的步驟即可完成安裝</div>

      <div class="mt-16 mb-4 flex gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.5rem"
          height="1.5rem"
          viewBox="0 0 24 24"
          class="mt-1"
        >
          <g fill="none">
            <path
              stroke="#ef4444"
              stroke-width="2.5"
              d="M5.312 10.762C8.23 5.587 9.689 3 12 3s3.77 2.587 6.688 7.762l.364.644c2.425 4.3 3.638 6.45 2.542 8.022S17.786 21 12.364 21h-.728c-5.422 0-8.134 0-9.23-1.572s.117-3.722 2.542-8.022z"
            />
            <path stroke="#ef4444" stroke-linecap="round" stroke-width="2.3" d="M12 8v5" />
            <circle cx="12" cy="16" r="1" fill="#ef4444" />
          </g>
        </svg>
        <div class="text-red-500 text-2xl font-black">注意事項</div>
      </div>

      <div class="text-[#1e293b]">偶爾缺字</div>
    </div>
  </div>
</template>
