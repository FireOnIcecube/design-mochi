<script setup lang="tsx">
import Card from 'primevue/card'
import Tag from 'primevue/tag'
</script>

<template>
  <Card class="mb-2">
    <template #header> <img alt="user header" src="@/assets/test.gif" /> </template>
    <template #title><div>Cutie Star Free Font</div> </template>
    <template #subtitle><div>www.dafontfree.io</div> </template>
    <template #content>
      <div><Tag severity="info" value="Info" rounded></Tag></div
    ></template>
  </Card>
</template>
