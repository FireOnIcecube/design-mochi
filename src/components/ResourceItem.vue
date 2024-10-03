<script setup lang="tsx">
import Card from 'primevue/card'
import Tag from 'primevue/tag'
import { ref } from 'vue'

const props = defineProps<{
  title: string
  imgUrl: string | undefined
}>()
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
</template>

<style scoped></style>
