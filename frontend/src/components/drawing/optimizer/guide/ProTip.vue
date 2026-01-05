<template>
  <div class="bg-blue-50 border-l-2 border-blue-400 p-2.5 my-3 rounded-r text-xs text-slate-600 flex gap-2 items-start">
    <Lightbulb class="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
    <div class="leading-relaxed">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Lightbulb } from 'lucide-vue-next'
</script>
