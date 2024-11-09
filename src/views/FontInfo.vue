<script setup lang="tsx">
import { resourceData } from '@/stores/resourceStore'
import Button from 'primevue/button'
import { Icon } from '@iconify/vue'

const props = defineProps<{ id: string }>()

const data = await resourceData.getResource('fonts', props.id)
</script>

<template>
  <div v-if="data === null">查無資料</div>
  <div v-else>
    <div class="mx-auto flex flex-wrap py-4 rounded-lg bg-white justify-evenly">
      <div class="lg:h-96 sm:h-80 grow-[1.5]">
        <img :src="data.cover_url" class="h-full object-cover mx-auto" />
      </div>

      <div class="grow">
        <div class="text-3xl font-semibold text-[#755540]">{{ data.name }}</div>
        <div>手寫體</div>
        <div>生氣 穩重 現代</div>
        <div>付費字體</div>

        <div class="flex justify-end">
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

    <div class="ml-8">
      <div>● 介紹影片</div>
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

      <div>● 下載說明</div>
      <div>進入網站後跟著 ReadMe 的步驟即可完成安裝</div>

      <div class="text-red-500">注意事項</div>
      <div>對中文的支持度相較英文低，可能會出現缺字的狀況</div>
    </div>
  </div>
</template>
