<script setup lang="tsx">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

const isOpen = ref(false)
const toggleDrawer = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <div @click="toggleDrawer" class="p-4">
        <Icon
          icon="ion:search"
          width="1.8rem"
          height="1.8rem"
          class="translate-transform text-content dark:text-content-dark duration-150 ease-out select-none group-hover:scale-105"
        />
      </div>
    </DialogTrigger>
    <DialogContent
      class="max-h-[90dvh] grid-rows-[auto_minmax(0,1fr)_auto] p-0 sm:max-w-[425px] md:max-w-1/2"
    >
      <DialogHeader class="p-6 pb-0">
        <DialogTitle class="text-2xl">尋找封面</DialogTitle>
        <!-- <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription> -->
      </DialogHeader>
      <div class="grid gap-4 overflow-y-auto px-6 py-4">
        <div class="flex flex-col justify-between">
          <p>
            This is some placeholder content to show the scrolling behavior for modals. We use
            repeated line breaks to demonstrate how content can exceed minimum inner height, thereby
            showing inner scrolling. When content becomes longer than the predefined max-height of
            modal, content will be cropped and scrollable within the modal.
          </p>

          <p>This content should appear at the bottom after you scroll.</p>
        </div>
      </div>
      <DialogFooter class="p-6 pt-0"> <Button type="submit"> Save changes </Button> </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
