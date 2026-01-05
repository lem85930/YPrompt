<template>
  <button
    @click="emit('toggle')"
    class="w-full flex items-center justify-between p-4 bg-white border-b border-slate-100 hover:bg-slate-50 transition-colors"
  >
    <div class="flex items-center gap-2 text-sm font-bold text-slate-700 uppercase tracking-wide">
      <component :is="icon" class="w-4 h-4 text-sky-500" />
      {{ title }}
    </div>
    <ChevronUp v-if="isOpen" class="w-4 h-4 text-slate-400" />
    <ChevronDown v-else class="w-4 h-4 text-slate-400" />
  </button>
</template>

<script setup lang="ts">
import { ChevronDown, ChevronUp } from 'lucide-vue-next'
import type { Component } from 'vue'

interface Props {
  icon: Component
  title: string
  isOpen: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  toggle: []
}>()
</script>
