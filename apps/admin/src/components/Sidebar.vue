<script lang="ts" setup>
import { ref } from 'process'

const links = [
  { name: '管理封面', path: 'thumbnails' },
  { name: '管理類別', path: 'categories' },
]
</script>

<template>
  <ul class="h-full w-64 bg-gray-100 p-4 dark:bg-gray-800">
    <li v-for="link in links" :key="link.path" class="mb-2">
      <router-link
        :to="{ path: link.path }"
        class="block rounded px-4 py-2 text-gray-700 transition-colors hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
      >
        {{ link.name }}
      </router-link>
    </li>
  </ul>
</template>
