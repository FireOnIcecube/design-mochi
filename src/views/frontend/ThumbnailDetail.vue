<script setup lang="tsx">
import { Icon } from '@iconify/vue'
import { ref } from 'vue'

const liked = ref(false)
</script>

<template>
  <div class="px-4">
    <div class="flex flex-col items-start justify-around md:flex-row">
      <div class="w-full md:w-1/2">
        <div class="flex items-center justify-center bg-gray-50 lg:h-[50vh]">
          <img src="/testimage.jpg" class="max-h-[50vh] object-contain" />
        </div>

        <div class="flex flex-nowrap justify-between">
          <span class="text-sm">
            來源:
            <a
              href="https://www.youtube.com/watch?v=6lz5BeoyknE"
              target="_blank"
              class="hover:text-blue-400"
              >https://www.youtube.com/watch?v=6lz5BeoyknE</a
            >
          </span>

          <div class="mr-4 hidden md:block">
            <button
              @click="liked = !liked"
              aria-label="收藏"
              class="mt-4 transition-colors duration-300"
            >
              <div class="rounded-full border border-gray-100 p-3 shadow-md hover:shadow-lg">
                <Icon
                  :icon="liked ? 'mdi:heart' : 'mdi:heart-outline'"
                  width="2rem"
                  height="2rem"
                  class="text-red-500 transition-all duration-300 ease-in-out"
                  :class="liked ? 'scale-110' : 'scale-100'"
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      <div class="w-full md:w-1/3">
        <div class="mt-8 border-b-2 border-gray-300 pb-6 dark:text-content-dark lg:mt-0">
          <p class="font-notosans text-2xl">
            【ゼルダ飯】７種のキノコのうまみ。キノコのトマト煮込み Live-action ZELDA
            cooking【ティアキン再現】
          </p>

          <div class="flex justify-end md:hidden">
            <button
              @click="liked = !liked"
              aria-label="收藏"
              class="mr-4 transition-colors duration-300"
            >
              <div class="rounded-full border border-gray-100 p-3 shadow-md hover:shadow-lg">
                <Icon
                  :icon="liked ? 'mdi:heart' : 'mdi:heart-outline'"
                  width="2rem"
                  height="2rem"
                  class="text-red-500 transition-all duration-300 ease-in-out"
                  :class="liked ? 'scale-110' : 'scale-100'"
                />
              </div>
            </button>
          </div>
        </div>

        <div
          class="flex flex-col justify-items-center gap-y-4 border-b-2 border-gray-300 pb-6 pt-3"
        >
          <div class="flex items-center gap-x-8">
            <div class="font-notosans text-xl">配色:</div>
            <div class="text-md flex gap-x-4 font-notosans">
              <div class="rounded-lg border border-gray-300 px-3 py-2">#綠色</div>
            </div>
          </div>
          <div class="flex items-center gap-x-8">
            <div class="font-notosans text-xl">主題:</div>
            <div class="text-md flex gap-x-4 font-notosans">
              <div class="rounded-lg border border-gray-300 px-3 py-2 font-black">#生活</div>
            </div>
          </div>
          <div class="flex items-center gap-x-8">
            <div class="font-notosans text-xl">語調:</div>
            <div class="text-md flex gap-x-4 font-notosans">
              <div class="rounded-lg border border-gray-300 px-3 py-2">#文青</div>
              <div class="rounded-lg border border-gray-300 px-3 py-2">#專業</div>
            </div>
          </div>

          <div class="flex items-center gap-x-8">
            <div class="font-notosans text-xl">風格:</div>
            <div class="text-md flex gap-x-4 font-notosans">
              <div class="rounded-lg border border-gray-300 px-3 py-2">#藝術</div>
              <div class="rounded-lg border border-gray-300 px-3 py-2">#財經</div>
            </div>
          </div>
          <div class="flex items-center gap-x-8">
            <div class="font-notosans text-xl">情緒:</div>
            <div class="text-md flex gap-x-4 font-notosans">
              <div class="rounded-lg border border-gray-300 px-3 py-2">#療癒</div>
              <div class="rounded-lg border border-gray-300 px-3 py-2">#理性</div>
            </div>
          </div>
        </div>

        <!-- 分享功能，暫時不實裝 -->
        <!-- <div class="mt-8 flex gap-x-4">
          <div class="">
            <Icon icon="fa-brands:facebook-square" class="text-[#0866FF]" width="48" height="48" />
          </div>
          <div class="">
            <Icon icon="fa6-brands:line" class="text-[#00C300]" width="48" height="48" />
          </div>
        </div> -->
      </div>
    </div>

    <!-- <div
      class="mt-24 flex flex-col items-center justify-between gap-4 lg:flex-row lg:items-start lg:justify-between"
    >
      <div class="flex-1 bg-orange-300">123</div>
      <div class="flex-1 bg-blue-300">456</div>
    </div> -->

    <section class="mt-24 px-4">
      <div class="mx-auto flex flex-col items-stretch gap-4 md:flex-row md:justify-between">
        <div class="w-full rounded-xl bg-orange-300 p-6 shadow-md md:max-w-md">
          上一個（最多寬度 sm）
        </div>
        <div class="w-full rounded-xl bg-blue-300 p-6 shadow-md md:max-w-md">
          下一個（最多寬度 sm）
        </div>
      </div>
    </section>

    <!-- <div class="mt-24 flex flex-col gap-4 lg:flex-row">
      <div class="flex-1 rounded bg-orange-300 p-4">123</div>
      <div class="flex-1 rounded bg-blue-300 p-4">456</div>
    </div> -->
  </div>
</template>
