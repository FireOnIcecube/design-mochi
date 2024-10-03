<script setup lang="tsx">
const props = defineProps<{ id: string }>()
</script>

<template>
  <div>{{ props.id }}</div>
</template>
