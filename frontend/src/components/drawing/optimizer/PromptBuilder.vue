<template>
  <div class="flex flex-col h-auto min-h-0">
    <div class="bg-white overflow-visible">
      <!-- Art Style Section -->
      <SectionHeader :icon="Palette" title="艺术风格" :isOpen="openSections.style" @toggle="toggle('style')" />
      <div v-if="openSections.style" class="p-4 grid grid-cols-1 gap-3 bg-slate-50/50 border-b border-slate-100">
        <InputField v-bind="commonProps" label="媒介" :value="props.data.artStyle.medium" @update="(v: string) => updateField('artStyle', 'medium', v)" placeholder="Oil painting..." :options="ART_MEDIUMS" />
        <InputField v-bind="commonProps" label="风格" :value="props.data.artStyle.visualStyle" @update="(v: string) => updateField('artStyle', 'visualStyle', v)" placeholder="Cyberpunk, Ethereal..." :options="VISUAL_STYLES" :allowAppend="true" />
        <InputField v-bind="commonProps" label="渲染" :value="props.data.artStyle.renderer" @update="(v: string) => updateField('artStyle', 'renderer', v)" placeholder="Unreal Engine 5..." :options="RENDERERS" />
      </div>

      <!-- Subject Section -->
      <SectionHeader :icon="User" title="核心主体" :isOpen="openSections.subject" @toggle="toggle('subject')" />
      <div v-if="openSections.subject" class="p-4 grid grid-cols-1 gap-3 bg-slate-50/50 border-b border-slate-100">
        <InputField v-bind="commonProps" label="主体" :value="props.data.subject.main" @update="(v: string) => updateField('subject', 'main', v)" placeholder="A cat..." />
        <InputField v-bind="commonProps" label="动作" :value="props.data.subject.action" @update="(v: string) => updateField('subject', 'action', v)" placeholder="Running..." />
        <InputField v-bind="commonProps" label="服装" :value="props.data.subject.clothing" @update="(v: string) => updateField('subject', 'clothing', v)" placeholder="Jacket..." />
        <InputField v-bind="commonProps" label="配饰" :value="props.data.subject.accessories" @update="(v: string) => updateField('subject', 'accessories', v)" placeholder="Glasses..." />
      </div>

      <!-- Environment Section -->
      <SectionHeader :icon="Mountain" title="环境" :isOpen="openSections.env" @toggle="toggle('env')" />
      <div v-if="openSections.env" class="p-4 grid grid-cols-1 gap-3 bg-slate-50/50 border-b border-slate-100">
        <InputField v-bind="commonProps" label="场景" :value="props.data.environment.scene" @update="(v: string) => updateField('environment', 'scene', v)" placeholder="Street..." />
        <InputField v-bind="commonProps" label="时间" :value="props.data.environment.time" @update="(v: string) => updateField('environment', 'time', v)" placeholder="Noon..." />
        <InputField v-bind="commonProps" label="天气" :value="props.data.environment.weather" @update="(v: string) => updateField('environment', 'weather', v)" placeholder="Rain..." />
        <InputField v-bind="commonProps" label="光影" :value="props.data.environment.lighting" @update="(v: string) => updateField('environment', 'lighting', v)" placeholder="Neon, Volumetric..." :options="LIGHTING" :allowAppend="true" />
      </div>

      <!-- Camera Section -->
      <SectionHeader :icon="Camera" title="摄影" :isOpen="openSections.camera" @toggle="toggle('camera')" />
      <div v-if="openSections.camera" class="p-4 grid grid-cols-1 gap-3 bg-slate-50/50 border-b border-slate-100">
        <InputField v-bind="commonProps" label="景别" :value="props.data.camera.shotType" @update="(v: string) => updateField('camera', 'shotType', v)" placeholder="Wide angle..." :options="SHOT_TYPES" />
        <InputField v-bind="commonProps" label="镜头" :value="props.data.camera.lens" @update="(v: string) => updateField('camera', 'lens', v)" placeholder="35mm..." />
        <InputField v-bind="commonProps" label="构图" :value="props.data.camera.composition" @update="(v: string) => updateField('camera', 'composition', v)" placeholder="Rule of thirds..." :options="COMPOSITION" />
        <InputField v-bind="commonProps" label="布局" :value="props.data.camera.spatial" @update="(v: string) => updateField('camera', 'spatial', v)" placeholder="Blurred background..." />
      </div>

      <!-- Typography Section -->
      <SectionHeader :icon="Type" title="文字" :isOpen="openSections.type" @toggle="toggle('type')" />
      <div v-if="openSections.type" class="p-4 grid grid-cols-1 gap-3 bg-slate-50/50 border-b border-slate-100">
         <InputField v-bind="commonProps" label="内容" :value="props.data.typography.text" @update="(v: string) => updateField('typography', 'text', v)" placeholder="HELLO WORLD" />
         <div class="grid grid-cols-2 gap-2">
            <InputField v-bind="commonProps" label="风格" :value="props.data.typography.style" @update="(v: string) => updateField('typography', 'style', v)" placeholder="Bold..." />
            <InputField v-bind="commonProps" label="位置" :value="props.data.typography.placement" @update="(v: string) => updateField('typography', 'placement', v)" placeholder="On wall..." />
         </div>
      </div>

      <!-- Logic Section -->
      <SectionHeader :icon="Brain" title="逻辑" :isOpen="openSections.logic" @toggle="toggle('logic')" />
      <div v-if="openSections.logic" class="p-4 grid grid-cols-1 gap-3 bg-slate-50/50 border-b border-slate-100">
        <InputField v-bind="commonProps" label="约束" :value="props.data.logic.constraints" @update="(v: string) => updateField('logic', 'constraints', v)" placeholder="Gravity..." />
        <InputField v-bind="commonProps" label="细节" :value="props.data.logic.details" @update="(v: string) => updateField('logic', 'details', v)" placeholder="5 fingers..." />
      </div>

      <!-- Meta Section -->
      <SectionHeader :icon="Settings" title="元数据" :isOpen="openSections.meta" @toggle="toggle('meta')" />
      <div v-if="openSections.meta" class="p-4 grid grid-cols-1 gap-3 bg-slate-50/50 border-b border-slate-100">
        <InputField v-bind="commonProps" label="负面" :value="props.data.meta.negativePrompt" @update="(v: string) => updateField('meta', 'negativePrompt', v)" placeholder="Blurry..." />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import { Palette, User, Mountain, Camera, Type, Brain, Settings } from 'lucide-vue-next'
import { OmniPromptStructure } from './types'
import { ART_MEDIUMS, VISUAL_STYLES, RENDERERS, SHOT_TYPES, LIGHTING, COMPOSITION } from './constants'
import SectionHeader from './SectionHeader.vue'
import InputField from './InputField.vue'

interface Props {
  data: OmniPromptStructure
  activeLang: 'cn' | 'en'
}

const props = defineProps<Props>()
const emit = defineEmits<{
  update: [data: OmniPromptStructure]
}>()

const openSections = reactive({
  style: true,
  subject: true,
  env: true,
  camera: false,
  type: true,
  logic: false,
  meta: false
})

const toggle = (key: string) => {
  openSections[key as keyof typeof openSections] = !openSections[key as keyof typeof openSections]
}

const updateField = (section: keyof OmniPromptStructure, field: string, value: any) => {
  emit('update', {
    ...props.data,
    [section]: { ...props.data[section], [field]: value }
  })
}

const commonProps = computed(() => ({ activeLang: props.activeLang }))
</script>
