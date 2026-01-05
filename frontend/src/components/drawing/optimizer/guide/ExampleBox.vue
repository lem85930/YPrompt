<template>
  <div class="bg-slate-50 border border-slate-200 rounded p-2.5 my-3">
    <div class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Example (示例)</div>
    <div class="text-xs text-slate-700 font-medium mb-1">"{{ prompt }}"</div>
    <div class="text-[10px] text-slate-500 italic">{{ desc }}</div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  prompt: string
  desc: string
}

defineProps<Props>()
</script>
