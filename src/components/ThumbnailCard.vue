<script setup lang="tsx">
import { Icon } from '@iconify/vue'
import { ref, computed } from 'vue'

const imageSrc = ref('/testThumbnail.jpg') // Replace with your image URL
const tags = ref([
  'Nature',
  'Mountain',
  'Travel',
  'Adventure',
  'Hiking',
  'Wildlife',
  'Sunset',
  'Photography',
  'Scenery',
  'Camping'
])
const maxTags = 5
const showMore = ref(false)

const displayedTags = computed(() => {
  return showMore.value ? tags.value : tags.value.slice(0, maxTags)
})

const toggleShowMore = () => {
  showMore.value = !showMore.value
}
</script>

<template>
  <div>
    <a href="#" class="group block overflow-hidden rounded-lg px-2 pb-2 transition hover:shadow-lg">
      <div class="aspect-video w-full">
        <img src="/testimage.jpg" class="h-full w-full object-cover" />
      </div>

      <div class="mt-2 flex shrink-0 flex-wrap gap-3">
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
      </div>

      <p class="mt-2 line-clamp-2 group-hover:text-blue-800">
        【ゼルダ飯】７種のキノコのうまみ。キノコのトマト煮込み Live-action ZELDA
        cooking【ティアキン再現】
      </p>
    </a>
  </div>
</template>
