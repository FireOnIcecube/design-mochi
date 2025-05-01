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
      <div class="aspect-video">
        <img src="/testimage.jpg" class="h-full w-full object-cover" />
      </div>

      <!--  TAG，暫時不使用 -->

      <!-- <div class="mt-2 flex shrink-0 flex-wrap gap-3">
        <div class="flex flex-nowrap items-center gap-1.5 rounded-lg bg-blue-100 px-2 py-1">
          <Icon icon="ic:round-science" class="text-blue-600" width="24" height="24" />
          <span class="font-notosans">科技</span>
        </div>

      
      </div> -->

      <p class="mt-2 line-clamp-2 font-notosans group-hover:text-blue-800 dark:text-content-dark">
        【ゼルダ飯】７種のキノコのうまみ。キノコのトマト煮込み Live-action ZELDA
        cooking【ティアキン再現】
      </p>
    </router-link>
  </div>
</template>
