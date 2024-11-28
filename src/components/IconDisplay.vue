<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/iconify.js'
import { computed } from 'vue'

const props = defineProps<{ label: IconKey }>()

type IconKey = keyof typeof labelMap

const labelMap = {
  憤怒: 'angry',
  開心: 'happy',
  可愛: 'cute',
  害怕: 'scared',
  現代: 'modern',
  懷舊: 'nostalgic',
  穩重: 'steady',
  唯美: 'beautiful'
} as const

const iconMap = {
  angry: { label: '憤怒', icon: 'tdesign:angry-filled', color: '#ef4444' },
  happy: { label: '開心', icon: 'tdesign:happy-filled', color: '#eab308' },
  cute: { label: '可愛', icon: 'tdesign:excited-1-filled', color: '#ec4899' },
  scared: { label: '害怕', icon: 'tdesign:uncomfortable-2-filled', color: '#a855f7' },
  modern: { label: '現代', icon: 'tdesign:system-sum', color: '#0ea5e9' },
  nostalgic: { label: '懷舊', icon: 'tdesign:city-ancient-1-filled', color: '#78350f' },
  steady: { label: '穩重', icon: 'mdi:pillar', color: '#57534e' },
  beautiful: { label: '唯美', icon: 'ion:flower', color: '#be123c' }
} as const

const englishKey = computed(() => labelMap[props.label])
</script>

<template>
  <div v-tooltip.top="props.label">
    <Icon
      :icon="iconMap[englishKey].icon"
      height="2.5rem"
      v-tool
      :style="{ color: iconMap[englishKey].color }"
    ></Icon>
  </div>
</template>
