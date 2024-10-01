<script setup lang="tsx">
import Card from 'primevue/card'
import Tag from 'primevue/tag'
import { ref } from 'vue'

const props = defineProps<{
  title: string
  imgUrl: string | undefined
}>()
// @/assets/test.gif
const isOpen = ref(false)
</script>

<template>
  <Card
    class="mb-2 !grow-0 cursor-pointer duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
    @click="isOpen = true"
  >
    <template #header>
      <div class="aspect-w-16 aspect-h-9">
        <img :src="props.imgUrl" class="object-contain" />
      </div>
    </template>
    <template #title
      ><div>{{ props.title }}</div>
    </template>
    <!-- <template #subtitle
      ><a href="https://www.zitijia.com/i/250417369808129081.html">www.dafontfree.io</a>
    </template> -->
    <template #content>
      <div><Tag severity="info" value="Info" rounded></Tag></div
    ></template>
  </Card>

  <div
    :class="`modal ${
      !isOpen && 'opacity-0 pointer-events-none'
    } z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center`"
  >
    <div
      class="absolute w-full h-full bg-gray-900 opacity-50 modal-overlay"
      @click="isOpen = false"
    />

    <div
      class="z-50 w-11/12 mx-auto overflow-y-auto bg-white rounded shadow-lg modal-container md:max-w-md"
    >
      <!-- Add margin if you want to see some of the overlay behind the modal -->
      <div class="px-6 py-4 text-left modal-content">
        <!-- Title -->
        <div class="flex items-center justify-end pb-3">
          <!-- <div class="text-2xl font-bold">Cutie Star Free Font</div> -->
          <div class="z-50 cursor-pointer modal-close" @click="isOpen = false">
            <svg
              class="text-black fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
            >
              <path
                d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
              />
            </svg>
          </div>
        </div>

        <!-- Body -->
        <div class="flex flex-col gap-y-4">
          <div><img alt="user header" :src="props.imgUrl" /></div>
          <div class="text-2xl font-bold">{{ props.title }}</div>
          <div><Tag severity="info" value="Info" rounded></Tag></div>
        </div>

        <!-- Footer -->
        <div class="flex justify-end pt-2">
          <button
            class="p-3 px-6 py-3 mr-2 text-indigo-500 bg-transparent rounded-lg hover:bg-gray-100 hover:text-indigo-400 focus:outline-none"
            @click="isOpen = false"
          >
            取消
          </button>
          <button
            class="px-6 py-3 font-medium tracking-wide text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none"
            @click="isOpen = false"
          >
            造訪網站
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  transition: opacity 0.25s ease;
}
</style>
