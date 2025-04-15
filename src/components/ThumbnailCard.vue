<script setup lang="tsx">
import { Icon } from '@iconify/vue'
import { ref, computed } from 'vue'
</script>

<template>
  <div>
    <router-link
      :to="{ name: 'ThumbnailDetail', params: { id: 1 } }"
      class="group block select-none overflow-hidden rounded-lg px-2 pb-2 transition hover:shadow-lg"
    >
      <div class="aspect-video w-full">
        <img src="/testimage.jpg" class="h-full w-full object-cover" />
      </div>

      <!--  TAG，暫時不使用 -->

      <!-- <div class="mt-2 flex shrink-0 flex-wrap gap-3">
        <div class="flex flex-nowrap items-center gap-1.5 rounded-lg bg-blue-100 px-2 py-1">
          <Icon icon="ic:round-science" class="text-blue-600" width="24" height="24" />
          <span class="font-notosans">科技</span>
        </div>

        <div class="flex flex-nowrap items-center gap-1.5 rounded-lg bg-orange-100 px-2 py-1">
          <Icon icon="fluent:food-16-regular" class="text-orange-600" width="24" height="24" />
          <span class="font-notosans">美食</span>
        </div>

        <div class="flex flex-nowrap items-center gap-1.5 rounded-lg bg-green-100 px-2 py-1">
          <Icon icon="zondicons:travel" class="text-green-600" width="24" height="24" />
          <span class="font-notosans">旅遊</span>
        </div>
        <div class="flex flex-nowrap items-center gap-1.5 rounded-lg bg-purple-100 px-2 py-1">
          <Icon icon="mdi:palette" class="text-purple-600" width="24" height="24" />
          <span class="font-notosans">藝術</span>
        </div>
        <div class="flex flex-nowrap items-center gap-1.5 rounded-lg bg-yellow-100 px-2 py-1">
          <Icon icon="mdi:finance" class="text-yellow-600" width="24" height="24" />
          <span class="font-notosans">財經</span>
        </div>

        <div class="flex flex-nowrap items-center gap-1.5 rounded-lg bg-teal-100 px-2 py-1">
          <Icon icon="mdi:leaf" class="text-teal-600" width="24" height="24" />
          <span class="font-notosans">生活</span>
        </div>

        <div class="flex flex-nowrap items-center gap-1.5 rounded-lg bg-pink-100 px-2 py-1">
          <Icon icon="mdi:heart" class="text-pink-600" width="24" height="24" />
          <span class="font-notosans">健康</span>
        </div>

        <div class="flex flex-nowrap items-center gap-1.5 rounded-lg bg-indigo-100 px-2 py-1">
          <Icon icon="mdi:book-open-page-variant" class="text-indigo-600" width="24" height="24" />
          <span class="font-notosans">閱讀</span>
        </div>
        <div class="flex flex-nowrap items-center gap-1.5 rounded-lg bg-cyan-100 px-2 py-1">
          <Icon icon="mdi:code-tags" class="text-cyan-600" width="24" height="24" />
          <span class="font-notosans">程式</span>
        </div>
      </div> -->

      <p class="mt-2 line-clamp-2 font-notosans group-hover:text-blue-800 dark:text-content-dark">
        【ゼルダ飯】７種のキノコのうまみ。キノコのトマト煮込み Live-action ZELDA
        cooking【ティアキン再現】
      </p>
    </router-link>
  </div>
</template>
