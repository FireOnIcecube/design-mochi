<script setup lang="ts">
import { DropdownMenuTrigger, type DropdownMenuTriggerProps, useForwardProps } from 'reka-ui'

const props = defineProps<DropdownMenuTriggerProps>()

const forwardedProps = useForwardProps(props)
</script>

<template>
  <DropdownMenuTrigger
    data-slot="dropdown-menu-trigger"
    v-bind="forwardedProps"
    class="text-content dark:text-content-dark shrink-0 cursor-pointer px-4 py-2 text-lg font-bold transition-transform ease-out hover:scale-95 hover:text-blue-600 active:scale-90 dark:hover:text-blue-600"
  >
    <slot />
  </DropdownMenuTrigger>
</template>
