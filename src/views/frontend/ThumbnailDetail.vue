<script setup lang="tsx">
import { Icon } from '@iconify/vue'
import { ref } from 'vue'

const liked = ref(false)
</script>

<template>
  <div class="px-4">
    <div class="flex flex-col justify-around md:flex-row">
      <div class="w-full md:w-1/2">
        <div class="flex items-center justify-center bg-gray-100 lg:h-[50vh]">
          <img src="/testimage.jpg" class="max-h-[50vh] object-contain" />
        </div>

        <div class="text-content dark:text-content-dark flex flex-nowrap justify-between">
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
              <div
                class="dark:border-outline-dark rounded-full border p-3 shadow-md hover:shadow-lg"
              >
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
        <div class="border-outline dark:text-content-dark mt-8 border-b-2 pb-6 lg:mt-0">
          <p class="font-notosans text-xl lg:text-2xl">
            【ゼルダ飯】７種のキノコのうまみ。キノコのトマト煮込み Live-action ZELDA
            cooking【ティアキン再現】
          </p>

          <div class="flex justify-end md:hidden">
            <button
              @click="liked = !liked"
              aria-label="收藏"
              class="mt-4 transition-colors duration-300"
            >
              <div
                class="dark:border-outline-dark rounded-full border p-3 shadow-md hover:shadow-lg"
              >
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
          class="border-outline text-content dark:text-content-dark flex flex-col justify-items-center gap-y-4 border-b-2 pt-3 pb-6"
        >
          <div class="flex items-center gap-x-8">
            <div class="font-notosans text-xl">配色:</div>
            <div class="text-md font-notosans flex gap-x-4">
              <div
                class="border-outline hover:bg-surface-active dark:hover:bg-surface-active-dark cursor-pointer rounded-lg border px-3 py-2 hover:shadow-xs"
              >
                #綠色
              </div>
            </div>
          </div>
          <div class="flex items-center gap-x-8">
            <div class="font-notosans text-xl">主題:</div>
            <div class="text-md font-notosans flex gap-x-4">
              <div
                class="border-outline hover:bg-surface-active dark:hover:bg-surface-active-dark cursor-pointer rounded-lg border px-3 py-2 hover:shadow-xs"
              >
                #生活
              </div>
            </div>
          </div>
          <div class="flex items-center gap-x-8">
            <div class="font-notosans text-xl">語調:</div>
            <div class="text-md font-notosans flex gap-x-4">
              <div
                class="border-outline hover:bg-surface-active dark:hover:bg-surface-active-dark cursor-pointer rounded-lg border px-3 py-2 hover:shadow-xs"
              >
                #文青
              </div>
              <div
                class="border-outline hover:bg-surface-active dark:hover:bg-surface-active-dark cursor-pointer rounded-lg border px-3 py-2 hover:shadow-xs"
              >
                #專業
              </div>
            </div>
          </div>

          <div class="flex items-center gap-x-8">
            <div class="font-notosans text-xl">風格:</div>
            <div class="text-md font-notosans flex gap-x-4">
              <div
                class="border-outline hover:bg-surface-active dark:hover:bg-surface-active-dark cursor-pointer rounded-lg border px-3 py-2 hover:shadow-xs"
              >
                #藝術
              </div>
              <div
                class="border-outline hover:bg-surface-active dark:hover:bg-surface-active-dark cursor-pointer rounded-lg border px-3 py-2 hover:shadow-xs"
              >
                #財經
              </div>
            </div>
          </div>
          <div class="flex items-center gap-x-8">
            <div class="font-notosans text-xl">情緒:</div>
            <div class="text-md font-notosans flex gap-x-4">
              <div
                class="border-outline hover:bg-surface-active dark:hover:bg-surface-active-dark cursor-pointer rounded-lg border px-3 py-2 hover:shadow-xs"
              >
                #療癒
              </div>
              <div
                class="border-outline hover:bg-surface-active dark:hover:bg-surface-active-dark cursor-pointer rounded-lg border px-3 py-2 hover:shadow-xs"
              >
                #理性
              </div>
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

    <section class="mt-16 px-4">
      <div class="flex flex-col gap-4 md:flex-row md:justify-between">
        <!-- Prev -->
        <div
          class="border-outline w-full cursor-pointer rounded-xl border p-4 shadow-md hover:bg-gray-100 hover:shadow-lg lg:max-w-2xl dark:hover:bg-gray-800"
        >
          <div class="flex items-center gap-4">
            <div class="group relative inline-block h-12 w-12">
              <Icon
                icon="bxs:left-arrow"
                class="text-content dark:text-content-dark"
                width="48"
                height="48"
              />
            </div>

            <div
              class="text-content dark:text-content-dark line-clamp-2 flex-1 text-lg font-semibold"
            >
              【ゼルダ飯】７種のキノコのうまみ。キノコのトマト煮込み Live-action ZELDA
              cooking【ティアキン再現】
            </div>

            <div class="flex h-28 w-36 shrink-0 items-center justify-center">
              <img src="/testimage.jpg" class="h-full w-full object-contain" />
            </div>
          </div>
        </div>
        <!-- Next -->
        <div
          class="border-outline hover:bg-surface-active dark:hover:bg-surface-active-dark w-full cursor-pointer rounded-xl border p-4 shadow-md hover:shadow-lg lg:max-w-2xl"
        >
          <div class="flex items-center gap-4">
            <div class="flex h-28 w-36 shrink-0 items-center justify-center">
              <img src="/testimage2.jpg" class="h-full w-full object-contain" />
            </div>
            <div
              class="text-content dark:text-content-dark line-clamp-2 flex-1 text-lg font-semibold"
            >
              歓送迎会シーズンにおすすめ ルミネ立川厳選【プチギフト】
            </div>
            <div class="group relative inline-block h-12 w-12">
              <Icon
                icon="bxs:right-arrow"
                class="text-content dark:text-content-dark"
                width="48"
                height="48"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- <div class="mt-24 flex flex-col gap-4 lg:flex-row">
      <div class="flex-1 rounded-sm bg-orange-300 p-4">123</div>
      <div class="flex-1 rounded-sm bg-blue-300 p-4">456</div>
    </div> -->
  </div>
</template>
