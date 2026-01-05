<template>
  <h3 :class="['text-sm font-bold flex items-center gap-2 mb-3 pb-2 border-b border-slate-100', colorClass]">
    <component :is="icon" class="w-4 h-4" />
    {{ title }}
  </h3>
</template>

<script setup lang="ts">
import type { Component } from 'vue'

interface Props {
  icon: Component
  title: string
  colorClass: string
}

defineProps<Props>()
</script>
