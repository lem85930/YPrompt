<template>
  <div class="h-full flex flex-col overflow-hidden p-2">
    <!-- 模块特定顶栏 -->
    <div class="bg-white rounded-lg shadow-sm p-4 mb-4 flex-shrink-0">
      <div class="flex items-center justify-between">
        <div class="min-w-0">
          <h1 class="text-xl lg:text-2xl font-bold text-gray-800 mb-1">提示词操练场</h1>
          <p class="text-sm lg:text-base text-gray-600">提示词测试与调试平台</p>
        </div>
        <div class="flex items-center gap-2">
          <button 
            @click="settingsStore.showSettings = true"
            class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <span class="text-lg">⚙️</span>
          </button>
        </div>
      </div>
    </div>
    
    <!-- 空白内容区域 -->
    <div class="flex-1 flex items-center justify-center bg-white rounded-lg shadow-sm">
      <div class="text-center">
        <svg class="w-16 h-16 mb-4 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">操练场</h2>
        <p class="text-gray-600 max-w-md">
          提示词实时测试与调试功能正在开发中<br>
          即将为您提供专业的测试环境
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSettingsStore } from '@/stores/settingsStore'

const settingsStore = useSettingsStore()
</script>