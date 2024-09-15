<script setup lang="tsx"></script>

<template>
  <div class="flex flex-col flex-1">
    <header class="mt-4 mx-20 flex justify-end gap-6">
      <router-link to="/dashboard"> <div class="font-bold">進入網站</div> </router-link>
      <div class="font-bold">關於我們</div>
    </header>

    <div class="flex flex-row flex-1">
      <div class="flex flex-col justify-center gap-4">
        <div
          class="flex items-center justify-end bg-[#755540] w-16 h-16 rounded-r-full cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2.5rem"
            height="2.5rem"
            viewBox="0 0 24 24"
            class="mr-4"
          >
            <path
              fill="white"
              d="M9.93 13.5h4.14L12 7.98zM20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m-4.29 15.88l-.9-2.38H9.17l-.89 2.37a.968.968 0 1 1-1.81-.69l4.25-10.81c.22-.53.72-.87 1.28-.87s1.06.34 1.27.87l4.25 10.81a.968.968 0 0 1-.9 1.32c-.4 0-.76-.25-.91-.62"
            />
          </svg>
        </div>
        <div
          class="flex items-center justify-end bg-[#F8C1E1] w-16 h-16 rounded-r-full cursor-pointer"
        ></div>

        <div
          class="flex items-center justify-end bg-[#F0E4CB] w-16 h-16 rounded-r-full cursor-pointer"
        ></div>

        <div
          class="flex items-center justify-end bg-[#ED1C24] w-16 h-16 rounded-r-full cursor-pointer"
        ></div>
        <div
          class="flex items-center justify-end bg-[#82B8D9] w-16 h-16 rounded-r-full cursor-pointer"
        ></div>
      </div>

      <div class="container mx-auto flex items-center justify-center">
        <div v-motion-fade class="">
          <h1 class="text-9xl font-[900] md:text-[12rem]">你好世界</h1>
        </div>
      </div>
    </div>
  </div>
</template>
