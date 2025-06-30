<template>
  <div class="grid flex-1 place-items-center">
    <div class="flex flex-col items-center gap-4">
      <h1 class="font-notosans text-content dark:text-content-dark text-2xl">404 - 找不到頁面</h1>
      <p class="text-gray-500">抱歉，您訪問的頁面不存在。</p>
      <router-link
        to="/"
        class="cursor-pointer rounded-md bg-blue-400 px-4 py-2 text-lg font-black text-white shadow-md transition-colors hover:bg-blue-500 active:translate-y-0.5 active:bg-blue-700 active:shadow-inner"
      >
        返回首頁
      </router-link>
    </div>
  </div>
</template>
