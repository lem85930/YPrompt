<template>
  <div class="mt-3 border border-slate-200 rounded-lg overflow-hidden bg-white">
    <button
      @click="isOpen = !isOpen"
      class="w-full flex items-center justify-between p-2.5 bg-slate-50 hover:bg-slate-100 transition-colors"
    >
      <span class="text-xs font-bold text-slate-600 flex items-center gap-2">
         <Sparkles class="w-3 h-3 text-blue-500" />
         {{ title }} <span class="text-[10px] font-normal text-slate-400">({{ items.length }})</span>
      </span>
      <ChevronDown v-if="isOpen" class="w-3 h-3 text-slate-400" />
      <ChevronRight v-else class="w-3 h-3 text-slate-400" />
    </button>

    <div v-if="isOpen" class="p-2 flex flex-wrap gap-1.5 bg-white border-t border-slate-100">
      <button
        v-for="(item, idx) in items"
        :key="item.value"
        @click="handleCopy(item, idx)"
        class="group flex items-center gap-1 text-[10px] bg-white text-slate-600 px-2 py-1 rounded border border-slate-200 hover:border-sky-400 hover:text-sky-700 hover:bg-sky-50 transition-all text-left"
        :title="props.activeLang === 'cn' ? '点击复制' : 'Click to copy'"
      >
        {{ item.label }}
        <Check v-if="copiedIndex === idx" class="w-2.5 h-2.5 text-green-500 shrink-0" />
        <Copy v-else class="w-2.5 h-2.5 opacity-0 group-hover:opacity-50 shrink-0 text-slate-400" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Sparkles, ChevronDown, ChevronRight, Copy, Check } from 'lucide-vue-next'

interface Option {
  value: string
  label: string
}

interface Props {
  title: string
  items: Option[]
  activeLang: 'cn' | 'en'
}

const props = defineProps<Props>()

const isOpen = ref(false)
const copiedIndex = ref<number | null>(null)

const handleCopy = (item: Option, index: number) => {
  let textToCopy = item.value
  if (props.activeLang === 'cn') {
    const match = item.label.match(/^(.*?)\s*[\(（]/)
    textToCopy = (match && match[1]) ? match[1].trim() : item.label
  }
  navigator.clipboard.writeText(textToCopy)
  copiedIndex.value = index
  setTimeout(() => copiedIndex.value = null, 1000)
}
</script>
