<template>
  <div class="space-y-1 relative" ref="containerRef">
    <label class="text-[10px] text-slate-500 font-semibold uppercase flex justify-between items-center">
      {{ label }}
      <span v-if="allowAppend" class="text-[9px] text-blue-400 lowercase font-normal bg-blue-50 px-1 rounded">multi-select</span>
    </label>

    <div class="relative flex items-center">
      <input
        type="text"
        :value="value || ''"
        @input="(e) => emit('update', (e.target as HTMLInputElement).value)"
        :placeholder="placeholder"
        :class="[
          'w-full bg-slate-50 border border-slate-300 rounded p-2 pr-8 text-xs text-slate-800 focus:border-sky-500 focus:bg-white focus:ring-1 focus:ring-sky-200 outline-none transition-all placeholder:text-slate-400',
          options ? 'pr-16' : ''
        ]"
      />

      <div class="absolute right-1 flex items-center gap-1">
        <button
          v-if="value"
          @click="clearInput"
          class="p-1 text-slate-300 hover:text-red-400 transition-colors"
        >
          <X class="w-3 h-3" />
        </button>

        <button
          v-if="options"
          @click="isDropdownOpen = !isDropdownOpen"
          :class="[
            'p-1 rounded transition-colors',
            isDropdownOpen ? 'bg-sky-100 text-sky-600' : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'
          ]"
          title="Select options"
        >
          <Plus v-if="allowAppend" class="w-3.5 h-3.5" />
          <ChevronDown v-else class="w-3.5 h-3.5" />
        </button>
      </div>
    </div>

    <!-- Custom Dropdown -->
    <div v-if="isDropdownOpen && options" class="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl max-h-60 overflow-y-auto">
      <div v-if="allowAppend" class="p-2 bg-slate-50 border-b border-slate-100 text-[10px] text-slate-500 flex items-center justify-between sticky top-0">
        <span>Select multiple options</span>
        <span class="text-xs cursor-pointer hover:text-sky-500" @click="isDropdownOpen = false">Done</span>
      </div>
      <div class="p-1">
        <button
          v-for="opt in processedOptions"
          :key="opt.value"
          @click="handleSelectOption(opt.value)"
          :class="[
            'w-full text-left px-2 py-1.5 text-xs rounded-md flex items-center justify-between group transition-colors',
            isSelected(opt.value) ? 'bg-sky-50 text-sky-700 font-medium' : 'text-slate-600 hover:bg-slate-50'
          ]"
        >
          <span class="truncate mr-2">{{ opt.label }}</span>
          <Check v-if="isSelected(opt.value)" class="w-3 h-3 text-sky-500 shrink-0" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { X, Plus, ChevronDown, Check } from 'lucide-vue-next'

interface Option {
  value: string
  label: string
}

interface Props {
  label: string
  value: string
  placeholder?: string
  options?: Option[]
  activeLang: 'cn' | 'en'
  allowAppend?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  options: undefined,
  allowAppend: false
})

const emit = defineEmits<{
  update: [value: string]
}>()

const isDropdownOpen = ref(false)
const containerRef = ref<HTMLDivElement | null>(null)

// Close dropdown when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  if (containerRef.value && !containerRef.value.contains(event.target as Node)) {
    isDropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})

const processedOptions = computed(() => {
  if (!props.options) return []

  return props.options.map(opt => {
    if (props.activeLang === 'cn') {
      const match = opt.label.match(/^(.*?)\s*[\(（]/)
      const cnValue = match && match[1] ? match[1].trim() : opt.label
      return { value: cnValue, label: opt.label }
    }
    return { value: opt.value, label: opt.label }
  })
})

const isSelected = (optionValue: string) => {
  if (props.allowAppend) {
    return props.value?.split(/,\s*/).includes(optionValue)
  }
  return props.value === optionValue
}

const handleSelectOption = (optionValue: string) => {
  if (props.allowAppend) {
    // Multi-select logic (comma separated)
    const currentVal = props.value || ""
    const items = currentVal.split(/,\s*/).filter(i => i.trim() !== "")

    if (!items.includes(optionValue)) {
      items.push(optionValue)
      const newValue = items.join(", ")
      emit('update', newValue)
    }
  } else {
    // Single select logic
    emit('update', optionValue)
    isDropdownOpen.value = false
  }
}

const clearInput = () => {
  emit('update', "")
}
</script>
