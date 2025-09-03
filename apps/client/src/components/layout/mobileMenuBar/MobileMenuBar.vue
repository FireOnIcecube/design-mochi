<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import MenuIcon from './MenuIcon.vue'
import { ref } from 'vue'

const isOpen = ref(false)
</script>
<template>
  <div class="flex justify-center rounded bg-gray-800 p-2" @click="isOpen = !isOpen">
    <div class="flex items-center gap-x-4">
      <menu-icon v-model="isOpen" />
      <span class="font-notosans text-lg">Category</span>
      <menu-icon v-model="isOpen" />
    </div>
  </div>
</template>
