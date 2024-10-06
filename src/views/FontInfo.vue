<script setup lang="tsx">
import { resourceData } from '@/stores/resourceStore'

const props = defineProps<{ id: string }>()

const data = await resourceData.getResource('fonts', props.id)
</script>

<template>
  <div v-if="data === null">查無資料</div>
  <div v-else>
    <div class="size-6/12">
      <img :src="data.cover_url" class="object-contain rounded-lg" />
    </div>
    <div>
      <div>{{ data.id }}</div>
      <div>{{ data.name }}</div>
    </div>
  </div>
</template>
