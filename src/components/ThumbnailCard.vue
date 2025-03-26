<template>
  <div class="relative max-w-sm overflow-hidden rounded-lg shadow-lg">
    <!-- Image -->
    <img :src="imageSrc" alt="Card Image" class="h-80 w-full object-cover" />

    <!-- Tags (Overlay on Image) -->
    <div class="absolute right-2 bottom-2 left-2 rounded-lg bg-black/50 p-2">
      <div class="flex flex-wrap gap-1">
        <span
          v-for="(tag, index) in displayedTags"
          :key="index"
          class="rounded-full bg-blue-200 px-2 py-1 text-xs text-blue-800"
        >
          {{ tag }}
        </span>
        <!-- More Tags Button -->
        <span
          v-if="tags.length > maxTags"
          class="cursor-pointer text-xs text-blue-300"
          @click="toggleShowMore"
        >
          {{ showMore ? 'Show Less' : 'Show More' }}
        </span>
      </div>
      <!-- Expanded Tags -->
      <div v-if="showMore" class="mt-1 flex flex-wrap gap-1">
        <span
          v-for="(tag, index) in tags.slice(maxTags)"
          :key="index"
          class="rounded-full bg-blue-200 px-2 py-1 text-xs text-blue-800"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="tsx">
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
