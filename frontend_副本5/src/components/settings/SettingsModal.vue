<template>
  <SettingsButton @open="settingsStore.showSettings = true" />

  <div
    v-if="settingsStore.showSettings"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
  >
    <div class="bg-white rounded-lg max-w-4xl w-full max-h-[85vh] overflow-hidden flex flex-col">
      <SettingsHeader
        v-model:active-tab="activeTab"
        @close="settingsStore.showSettings = false"
      />

      <div class="p-6 overflow-y-auto flex-1">
        <ProvidersTab
          v-if="activeTab === 'providers'"
          :providers="settingsStore.providers"
          :batch-testing-states="modelTesting.batchTestingStates.value"
          :testing-provider="modelTesting.testingProvider.value"
          @show-add-provider-type="providerMgmt.showAddProviderTypeDialog.value = true"
          @edit-provider="providerMgmt.editProvider"
          @delete-provider="providerMgmt.deleteProvider"
          @batch-test="modelTesting.batchTestModels"
          @show-add-model="modelMgmt.showAddModel"
          @edit-model="modelMgmt.editModel"
          @delete-model="modelMgmt.deleteModel"
          @test-model="modelTesting.handleModelTestClick"
          @save="settingsStore.saveSettings"
          :get-default-base-url="providerMgmt.getDefaultBaseUrl"
          :get-test-button-title="modelTesting.getTestButtonTitle"
          :get-batch-test-button-title="modelTesting.getBatchTestButtonTitle"
          :get-api-type-color="modelMgmt.getApiTypeColor"
          :get-api-type-label="modelMgmt.getApiTypeLabel"
        />

        <PromptsTab
          v-if="activeTab === 'prompts'"
          @reset-system="promptRules.resetSystemPromptRules"
          @reset-user="promptRules.resetUserPromptRules"
          @reset-requirement="promptRules.resetRequirementReportRules"
          @reset-thinking="promptRules.resetThinkingPointsExtractionPrompt"
          @reset-generation="promptRules.resetSystemPromptGenerationPrompt"
          @reset-advice="promptRules.resetOptimizationAdvicePrompt"
          @reset-application="promptRules.resetOptimizationApplicationPrompt"
          @toggle-slim-rules="promptRules.handleSlimRulesToggle"
        />
      </div>

      <div class="flex justify-end space-x-3 p-6 border-t bg-gray-50 flex-shrink-0">
        <button
          @click="settingsStore.showSettings = false"
          class="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          取消
        </button>
        <button
          @click="promptRules.saveAndClose"
          class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          保存设置
        </button>
      </div>
    </div>
  </div>

  <ProviderTypeDialog
    v-if="providerMgmt.showAddProviderTypeDialog.value"
    @select="providerMgmt.selectProviderType"
    @close="providerMgmt.showAddProviderTypeDialog.value = false"
  />

  <ProviderDialog
    v-if="providerMgmt.showAddProvider.value"
    :editing="!!providerMgmt.editingProvider.value"
    :provider-type="providerMgmt.selectedProviderType.value"
    v-model:name="providerMgmt.newProvider.value.name"
    v-model:base-url="providerMgmt.newProvider.value.baseUrl"
    v-model:api-key="providerMgmt.newProvider.value.apiKey"
    :get-default-base-url="providerMgmt.getDefaultBaseUrl"
    :get-provider-template="providerMgmt.getProviderTemplate"
    @save="providerMgmt.saveProvider"
    @close="providerMgmt.closeProviderDialog"
  />

  <ModelDialog
    v-if="modelMgmt.showAddModelDialog.value"
    :editing="!!modelMgmt.editingModel.value"
    :provider="modelMgmt.getProviderForModel(modelMgmt.addingModelToProvider.value)"
    v-model:name="modelMgmt.newModel.value.name"
    v-model:id="modelMgmt.newModel.value.id"
    v-model:api-type="modelMgmt.newModel.value.apiType"
    v-model:search-keyword="modelMgmt.modelSearchKeyword.value"
    :available-models="modelMgmt.getCurrentProviderModels.value"
    :loading="modelMgmt.loadingModels.value"
    :error="modelMgmt.modelFetchError.value"
    @fetch-models="modelMgmt.fetchAvailableModels"
    @select-model="modelMgmt.selectModel"
    @save="modelMgmt.addCustomModel"
    @close="modelMgmt.closeAddModelDialog"
  />
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useSettingsStore } from '@/stores/settingsStore'

import SettingsButton from './components/SettingsButton.vue'
import SettingsHeader from './components/SettingsHeader.vue'
import ProvidersTab from './components/tabs/ProvidersTab.vue'
import PromptsTab from './components/tabs/PromptsTab.vue'
import ProviderTypeDialog from './components/dialogs/ProviderTypeDialog.vue'
import ProviderDialog from './components/dialogs/ProviderDialog.vue'
import ModelDialog from './components/dialogs/ModelDialog.vue'

import { useProviderManagement } from './composables/useProviderManagement'
import { useModelManagement } from './composables/useModelManagement'
import { useModelTesting } from './composables/useModelTesting'
import { usePromptRules } from './composables/usePromptRules'

const settingsStore = useSettingsStore()
const activeTab = ref<'providers' | 'prompts'>('providers')

const providerMgmt = useProviderManagement()
const modelMgmt = useModelManagement()
const modelTesting = useModelTesting()
const promptRules = usePromptRules()

watch(activeTab, (newTab) => {
  if (newTab === 'prompts') {
    settingsStore.openPromptEditor('system')
  }
})

onMounted(() => {
  settingsStore.loadSettings()
})
</script>
