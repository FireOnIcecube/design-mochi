<script lang="ts" setup>
import { Icon } from '@iconify/vue'

const isOpen = defineModel<boolean>({ default: false })
</script>

<template>
  <transition name="fade-scale" mode="out-in">
    <Icon
      :key="isOpen ? 'open' : 'close'"
      :icon="isOpen ? 'ri:arrow-down-double-fill' : 'mdi:hamburger-menu'"
      class="inline-block size-8"
    />
  </transition>
</template>

<style scoped>
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.1s ease;
}
.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>
