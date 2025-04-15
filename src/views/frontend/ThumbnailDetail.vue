<template>
  <div class="flex flex-col items-center justify-around md:flex-row">
    <div class="w-full md:w-1/2">
      <!-- 第一張圖片：套用 object-contain + max-w 容器包裹 -->
      <div class="aspect-video flex w-full justify-center bg-gray-300">
        <div class="max-h-[90%] max-w-[90%]">
          <img src="/testimage.jpg" class="h-full w-full object-contain" />
        </div>
      </div>
      <span class="text-sm">
        來源:
        <a
          href="https://www.youtube.com/watch?v=6lz5BeoyknE"
          target="_blank"
          class="hover:text-blue-400"
          >https://www.youtube.com/watch?v=6lz5BeoyknE</a
        >
      </span>
    </div>

    <div class="w-full md:w-1/3">
      <div class="border-b-2 border-gray-300 pb-6 dark:text-content-dark">
        <p class="font-notosans text-2xl">
          【ゼルダ飯】７種のキノコのうまみ。キノコのトマト煮込み Live-action ZELDA
          cooking【ティアキン再現】
        </p>
      </div>

      <div class="flex flex-col gap-y-4 border-b-2 border-gray-300 pb-6 pt-3">
        <div class="font-notosans text-lg">配色: 綠色</div>
        <div class="font-notosans text-lg">主題: 生活</div>
        <div class="font-notosans text-lg">語調: 文青 專業</div>
        <div class="font-notosans text-lg">風格: 藝術 財經</div>
        <div class="font-notosans text-lg">情緒: 療癒 理性</div>
      </div>

      <div class="mt-8 flex gap-x-4">
        <div class="h-24 w-24 bg-red-200">收藏</div>
        <div class="h-24 w-24 bg-blue-200">收藏</div>
        <div class="h-24 w-24 bg-green-200">收藏</div>
      </div>
    </div>
  </div>
</template>
