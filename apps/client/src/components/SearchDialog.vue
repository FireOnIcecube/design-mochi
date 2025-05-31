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
} from '@client/components/ui/dialog'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@client/components/ui/collapsible'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@client/components/ui/tabs'

import { Button } from '@client/components/ui/button'
import { Search } from 'lucide-vue-next'
import { Input } from '@client/components/ui/input'
import { Checkbox } from '@client/components/ui/checkbox'

const isOpen = ref(false)
const toggleDialog = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <div @click="toggleDialog" class="p-4">
        <Icon
          icon="ion:search"
          width="1.8rem"
          height="1.8rem"
          class="translate-transform text-content dark:text-content-dark select-none duration-150 ease-out group-hover:scale-105"
        />
      </div>
    </DialogTrigger>
    <DialogContent
      class="md:max-w-2/3 min-h-2/3 max-h-[90dvh] grid-rows-[auto_minmax(0,1fr)_auto] p-0 sm:max-w-[425px]"
    >
      <DialogHeader class="p-6 pb-0">
        <DialogTitle class="text-3xl">尋找封面</DialogTitle>
        <!-- <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription> -->
      </DialogHeader>
      <div class="flex flex-col gap-4 overflow-y-auto px-6 py-4">
        <!-- Search Input -->
        <div class="mx-auto flex w-full max-w-sm items-center justify-center gap-1.5">
          <div class="relative w-full max-w-sm items-center">
            <Input id="search" type="text" placeholder="Search..." class="pl-10" />
            <span class="absolute inset-y-0 start-0 flex items-center justify-center px-2">
              <Search class="text-muted-foreground size-6" />
            </span>
          </div>

          <Button type="submit" class="font-notosans text-md tracking-widest">搜尋</Button>
        </div>

        <!-- Checkbox Group -->
        <Tabs default-value="類別一" class="mt-12 grow gap-0 overflow-x-hidden">
          <TabsList
            class="max-h-1/2 mx-auto flex h-auto max-w-full flex-wrap justify-start gap-2 overflow-x-auto p-0 xl:flex-nowrap"
          >
            <TabsTrigger
              value="類別一"
              class="font-notosans dark:data-[state=active]:bg-background rounded-b-none border-b-0 p-5"
            >
              <div class="flex space-x-2">
                <label class="leading-none">CATEGORY</label>
                <Checkbox disabled class="disabled:cursor-default disabled:opacity-100" />
              </div>
            </TabsTrigger>

            <TabsTrigger
              value="類別二"
              class="dark:data-[state=active]:bg-background font-notosans rounded-b-none border-b-0 p-5"
            >
              <div class="flex space-x-2">
                <label class="leading-none">TASTE</label>
                <Checkbox disabled class="disabled:cursor-default disabled:opacity-100" />
              </div>
            </TabsTrigger>

            <TabsTrigger
              value="類別三"
              class="dark:data-[state=active]:bg-background font-notosans rounded-b-none border-b-0 p-5"
            >
              <div class="flex space-x-2">
                <label class="leading-none">TOPIC</label>
                <Checkbox disabled class="disabled:cursor-default disabled:opacity-100" />
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="類別四"
              class="dark:data-[state=active]:bg-background font-notosans rounded-b-none border-b-0 p-5"
            >
              <div class="flex space-x-2">
                <label class="leading-none">SHAPE</label>
                <Checkbox disabled class="disabled:cursor-default disabled:opacity-100" />
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="類別五"
              class="dark:data-[state=active]:bg-background font-notosans rounded-b-none border-b-0 p-5"
            >
              <div class="flex space-x-2">
                <label class="leading-none">COLOR</label>
                <Checkbox disabled class="disabled:cursor-default disabled:opacity-100" />
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="類別六"
              class="dark:data-[state=active]:bg-background font-notosans rounded-b-none border-b-0 p-5"
            >
              <div class="flex space-x-2">
                <label class="leading-none">MEDIA</label>
                <Checkbox disabled class="disabled:cursor-default disabled:opacity-100" />
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="類別七"
              class="dark:data-[state=active]:bg-background font-notosans rounded-b-none border-b-0 p-5"
            >
              <div class="flex space-x-2">
                <label class="leading-none">RANKING</label>
                <Checkbox disabled class="disabled:cursor-default disabled:opacity-100" />
              </div>
            </TabsTrigger>
          </TabsList>

          <div class="border-outline dark:border-outline-dark w-full grow overflow-y-auto border-2">
            <TabsContent value="類別一" class="h-full">
              <div class="mx-auto h-full overflow-y-auto px-8 py-12 xl:w-3/4">
                <div class="grid grid-cols-2 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
                  <div class="col-span-full flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                      for="terms"
                      class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      全選
                    </label>
                  </div>
                  <div class="flex items-center space-x-2">
                    <Checkbox id="A" />
                    <label
                      for="A"
                      class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      測試項目 A
                    </label>
                  </div>
                  <div class="flex items-center space-x-2">
                    <Checkbox id="B" />
                    <label
                      for="B"
                      class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      測試項目 B
                    </label>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="類別二"> Change your password here. 2</TabsContent>
            <TabsContent value="類別三"> Make changes to your account here. 3</TabsContent>
            <TabsContent value="類別四"> Change your password here. 4</TabsContent>
            <TabsContent value="類別五"> Make changes to your account here. 5</TabsContent>
            <TabsContent value="類別六"> Change your password here. 6</TabsContent>
            <TabsContent value="類別七"> Make changes to your account here. 7</TabsContent>
            <TabsContent value="類別八"> Change your password here. 8</TabsContent>
          </div>
        </Tabs>
      </div>

      <DialogFooter class="p-6 pt-0">
        <DialogTrigger asChild>
          <Button type="submit" @click="toggleDialog"> Save changes </Button></DialogTrigger
        >
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
