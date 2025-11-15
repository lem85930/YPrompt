// 内置系统提示词配置
// 保持独立性，便于修改和维护
// 提示词规则已拆分到 prompts/ 目录下的独立文件中

import { 
  SYSTEM_PROMPT_RULES,
  SYSTEM_PROMPT_SLIM_RULES, 
  USER_GUIDED_PROMPT_RULES,
  REQUIREMENT_REPORT_RULES,
  FINAL_PROMPT_GENERATION_RULES,
  FINAL_PROMPT_SYSTEM_MESSAGES
} from './prompts/index'

// 导入独立的提示词
import { 
  THINKING_POINTS_EXTRACTION_PROMPT, 
  THINKING_POINTS_SYSTEM_MESSAGE 
} from './prompts/thinkingPointsExtraction'
import { 
  SYSTEM_PROMPT_GENERATION_PROMPT, 
  SYSTEM_PROMPT_SYSTEM_MESSAGE 
} from './prompts/systemPromptGeneration'
import { 
  OPTIMIZATION_ADVICE_PROMPT, 
  OPTIMIZATION_ADVICE_SYSTEM_MESSAGE 
} from './prompts/optimizationAdvice'
import { 
  OPTIMIZATION_APPLICATION_PROMPT, 
  OPTIMIZATION_APPLICATION_SYSTEM_MESSAGE 
} from './prompts/optimizationApplication'
import { 
  QUALITY_ANALYSIS_SYSTEM_PROMPT
} from './prompts/qualityAnalysis'
import {
  USER_PROMPT_OPTIMIZATION_CONFIG,
  USER_PROMPT_RULES
} from './prompts/userPromptOptimization'
import { USER_PROMPT_QUALITY_ANALYSIS } from './prompts/userPromptQualityAnalysis'

export interface PromptConfig {
  systemPromptRules: string
  userGuidedPromptRules: string
  requirementReportRules: string
  // 独立的最终提示词生成配置
  thinkingPointsExtractionPrompt: string
  thinkingPointsSystemMessage: string
  systemPromptGenerationPrompt: string
  systemPromptSystemMessage: string
  optimizationAdvicePrompt: string
  optimizationAdviceSystemMessage: string
  optimizationApplicationPrompt: string
  optimizationApplicationSystemMessage: string
  // 系统提示词质量分析配置
  qualityAnalysisSystemPrompt: string
  // 用户提示词优化配置
  userPromptQualityAnalysis: string
  userPromptQuickOptimization: string
  userPromptRules: string
}

// 提示词配置管理类
export class PromptConfigManager {
  private static instance: PromptConfigManager
  private config: PromptConfig
  private useSlimRules: boolean = false
  
  private constructor() {
    this.config = {
      systemPromptRules: SYSTEM_PROMPT_RULES,
      userGuidedPromptRules: USER_GUIDED_PROMPT_RULES,
      requirementReportRules: REQUIREMENT_REPORT_RULES,
      // 独立的最终提示词生成配置
      thinkingPointsExtractionPrompt: THINKING_POINTS_EXTRACTION_PROMPT,
      thinkingPointsSystemMessage: THINKING_POINTS_SYSTEM_MESSAGE,
      systemPromptGenerationPrompt: SYSTEM_PROMPT_GENERATION_PROMPT,
      systemPromptSystemMessage: SYSTEM_PROMPT_SYSTEM_MESSAGE,
      optimizationAdvicePrompt: OPTIMIZATION_ADVICE_PROMPT,
      optimizationAdviceSystemMessage: OPTIMIZATION_ADVICE_SYSTEM_MESSAGE,
      optimizationApplicationPrompt: OPTIMIZATION_APPLICATION_PROMPT,
      optimizationApplicationSystemMessage: OPTIMIZATION_APPLICATION_SYSTEM_MESSAGE,
      // 系统提示词质量分析配置
      qualityAnalysisSystemPrompt: QUALITY_ANALYSIS_SYSTEM_PROMPT,
      // 用户提示词优化配置
      userPromptQualityAnalysis: USER_PROMPT_QUALITY_ANALYSIS,
      userPromptQuickOptimization: USER_PROMPT_OPTIMIZATION_CONFIG.quick,
      userPromptRules: USER_PROMPT_RULES
    }
    this.loadFromStorage()
  }

  public static getInstance(): PromptConfigManager {
    if (!PromptConfigManager.instance) {
      PromptConfigManager.instance = new PromptConfigManager()
    }
    return PromptConfigManager.instance
  }

  public setUseSlimRules(useSlim: boolean): void {
    this.useSlimRules = useSlim
  }

  public getSystemPromptRules(): string {
    // 根据设置返回完整版或精简版
    if (this.useSlimRules) {
      return SYSTEM_PROMPT_SLIM_RULES
    }
    return this.config.systemPromptRules
  }

  public getUserGuidedPromptRules(): string {
    return this.config.userGuidedPromptRules
  }

  public updateSystemPromptRules(rules: string): void {
    this.config.systemPromptRules = rules
    this.saveToStorage()
  }

  public updateUserGuidedPromptRules(rules: string): void {
    this.config.userGuidedPromptRules = rules
    this.saveToStorage()
  }

  public getRequirementReportRules(): string {
    return this.config.requirementReportRules
  }

  public updateRequirementReportRules(rules: string): void {
    this.config.requirementReportRules = rules
    this.saveToStorage()
  }

  // 独立的最终提示词生成配置获取方法
  public getThinkingPointsExtractionPrompt(): string {
    return this.config.thinkingPointsExtractionPrompt
  }

  public getThinkingPointsSystemMessage(): string {
    return this.config.thinkingPointsSystemMessage
  }

  public getSystemPromptGenerationPrompt(): string {
    return this.config.systemPromptGenerationPrompt
  }

  public getSystemPromptSystemMessage(): string {
    return this.config.systemPromptSystemMessage
  }

  public getOptimizationAdvicePrompt(): string {
    return this.config.optimizationAdvicePrompt
  }

  public getOptimizationAdviceSystemMessage(): string {
    return this.config.optimizationAdviceSystemMessage
  }

  public getOptimizationApplicationPrompt(): string {
    return this.config.optimizationApplicationPrompt
  }

  public getOptimizationApplicationSystemMessage(): string {
    return this.config.optimizationApplicationSystemMessage
  }

  // 质量分析配置获取方法
  public getQualityAnalysisSystemPrompt(): string {
    return this.config.qualityAnalysisSystemPrompt
  }

  // 用户提示词优化配置获取方法
  public getUserPromptQualityAnalysis(): string {
    return this.config.userPromptQualityAnalysis
  }

  public getUserPromptQuickOptimization(): string {
    return this.config.userPromptQuickOptimization
  }

  public getUserPromptRules(): string {
    return this.config.userPromptRules
  }

  // 独立的最终提示词生成配置更新方法
  public updateThinkingPointsExtractionPrompt(prompt: string): void {
    this.config.thinkingPointsExtractionPrompt = prompt
    this.saveToStorage()
  }

  public updateThinkingPointsSystemMessage(message: string): void {
    this.config.thinkingPointsSystemMessage = message
    this.saveToStorage()
  }

  public updateSystemPromptGenerationPrompt(prompt: string): void {
    this.config.systemPromptGenerationPrompt = prompt
    this.saveToStorage()
  }

  public updateSystemPromptSystemMessage(message: string): void {
    this.config.systemPromptSystemMessage = message
    this.saveToStorage()
  }

  public updateOptimizationAdvicePrompt(prompt: string): void {
    this.config.optimizationAdvicePrompt = prompt
    this.saveToStorage()
  }

  public updateOptimizationAdviceSystemMessage(message: string): void {
    this.config.optimizationAdviceSystemMessage = message
    this.saveToStorage()
  }

  public updateOptimizationApplicationPrompt(prompt: string): void {
    this.config.optimizationApplicationPrompt = prompt
    this.saveToStorage()
  }

  public updateOptimizationApplicationSystemMessage(message: string): void {
    this.config.optimizationApplicationSystemMessage = message
    this.saveToStorage()
  }

  // 质量分析配置更新方法
  public updateQualityAnalysisSystemPrompt(prompt: string): void {
    this.config.qualityAnalysisSystemPrompt = prompt
    this.saveToStorage()
  }

  // 用户提示词优化配置更新方法
  public updateUserPromptQualityAnalysis(prompt: string): void {
    this.config.userPromptQualityAnalysis = prompt
    this.saveToStorage()
  }

  public updateUserPromptQuickOptimization(prompt: string): void {
    this.config.userPromptQuickOptimization = prompt
    this.saveToStorage()
  }

  public updateUserPromptRules(rules: string): void {
    this.config.userPromptRules = rules
    this.saveToStorage()
  }

  // 向后兼容方法：获取合并后的最终提示词生成规则
  public getFinalPromptGenerationRules(): typeof FINAL_PROMPT_GENERATION_RULES {
    return {
      THINKING_POINTS_EXTRACTION: this.config.thinkingPointsExtractionPrompt,
      SYSTEM_PROMPT_GENERATION: this.config.systemPromptGenerationPrompt,
      OPTIMIZATION_ADVICE_GENERATION: this.config.optimizationAdvicePrompt,
      OPTIMIZATION_APPLICATION: this.config.optimizationApplicationPrompt
    }
  }

  // 向后兼容方法：获取合并后的最终提示词系统消息
  public getFinalPromptSystemMessages(): typeof FINAL_PROMPT_SYSTEM_MESSAGES {
    return {
      THINKING_POINTS_SYSTEM: this.config.thinkingPointsSystemMessage,
      SYSTEM_PROMPT_SYSTEM: this.config.systemPromptSystemMessage,
      OPTIMIZATION_ADVICE_SYSTEM: this.config.optimizationAdviceSystemMessage,
      OPTIMIZATION_APPLICATION_SYSTEM: this.config.optimizationApplicationSystemMessage
    }
  }

  public resetToDefaults(): void {
    this.config.systemPromptRules = SYSTEM_PROMPT_RULES
    this.config.userGuidedPromptRules = USER_GUIDED_PROMPT_RULES
    this.config.requirementReportRules = REQUIREMENT_REPORT_RULES
    // 重置独立的最终提示词生成配置
    this.config.thinkingPointsExtractionPrompt = THINKING_POINTS_EXTRACTION_PROMPT
    this.config.thinkingPointsSystemMessage = THINKING_POINTS_SYSTEM_MESSAGE
    this.config.systemPromptGenerationPrompt = SYSTEM_PROMPT_GENERATION_PROMPT
    this.config.systemPromptSystemMessage = SYSTEM_PROMPT_SYSTEM_MESSAGE
    this.config.optimizationAdvicePrompt = OPTIMIZATION_ADVICE_PROMPT
    this.config.optimizationAdviceSystemMessage = OPTIMIZATION_ADVICE_SYSTEM_MESSAGE
    this.config.optimizationApplicationPrompt = OPTIMIZATION_APPLICATION_PROMPT
    this.config.optimizationApplicationSystemMessage = OPTIMIZATION_APPLICATION_SYSTEM_MESSAGE
    // 重置质量分析配置
    this.config.qualityAnalysisSystemPrompt = QUALITY_ANALYSIS_SYSTEM_PROMPT
    // 重置用户提示词优化配置
    this.config.userPromptQuickOptimization = USER_PROMPT_OPTIMIZATION_CONFIG.quick
    this.config.userPromptRules = USER_PROMPT_RULES
    this.saveToStorage()
  }

  // 重置系统提示词规则为默认值
  public resetSystemPromptRules(): void {
    this.config.systemPromptRules = SYSTEM_PROMPT_RULES
    this.saveToStorage()
  }

  // 重置用户引导规则为默认值
  public resetUserGuidedPromptRules(): void {
    this.config.userGuidedPromptRules = USER_GUIDED_PROMPT_RULES
    this.saveToStorage()
  }

  // 重置需求报告规则为默认值
  public resetRequirementReportRules(): void {
    this.config.requirementReportRules = REQUIREMENT_REPORT_RULES
    this.saveToStorage()
  }

  // 重置独立的最终提示词生成配置为默认值
  public resetThinkingPointsExtractionPrompt(): void {
    this.config.thinkingPointsExtractionPrompt = THINKING_POINTS_EXTRACTION_PROMPT
    this.saveToStorage()
  }

  public resetThinkingPointsSystemMessage(): void {
    this.config.thinkingPointsSystemMessage = THINKING_POINTS_SYSTEM_MESSAGE
    this.saveToStorage()
  }

  public resetSystemPromptGenerationPrompt(): void {
    this.config.systemPromptGenerationPrompt = SYSTEM_PROMPT_GENERATION_PROMPT
    this.saveToStorage()
  }

  public resetSystemPromptSystemMessage(): void {
    this.config.systemPromptSystemMessage = SYSTEM_PROMPT_SYSTEM_MESSAGE
    this.saveToStorage()
  }

  public resetOptimizationAdvicePrompt(): void {
    this.config.optimizationAdvicePrompt = OPTIMIZATION_ADVICE_PROMPT
    this.saveToStorage()
  }

  public resetOptimizationAdviceSystemMessage(): void {
    this.config.optimizationAdviceSystemMessage = OPTIMIZATION_ADVICE_SYSTEM_MESSAGE
    this.saveToStorage()
  }

  public resetOptimizationApplicationPrompt(): void {
    this.config.optimizationApplicationPrompt = OPTIMIZATION_APPLICATION_PROMPT
    this.saveToStorage()
  }

  public resetOptimizationApplicationSystemMessage(): void {
    this.config.optimizationApplicationSystemMessage = OPTIMIZATION_APPLICATION_SYSTEM_MESSAGE
    this.saveToStorage()
  }

  // 重置质量分析配置为默认值
  public resetQualityAnalysisSystemPrompt(): void {
    this.config.qualityAnalysisSystemPrompt = QUALITY_ANALYSIS_SYSTEM_PROMPT
    this.saveToStorage()
  }

  // 重置用户提示词优化配置为默认值
  public resetUserPromptQualityAnalysis(): void {
    this.config.userPromptQualityAnalysis = USER_PROMPT_QUALITY_ANALYSIS
    this.saveToStorage()
  }

  public resetUserPromptQuickOptimization(): void {
    this.config.userPromptQuickOptimization = USER_PROMPT_OPTIMIZATION_CONFIG.quick
    this.saveToStorage()
  }

  public resetUserPromptRules(): void {
    this.config.userPromptRules = USER_PROMPT_RULES
    this.saveToStorage()
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem('yprompt_config', JSON.stringify(this.config))
    } catch (error) {
    }
  }

  private loadFromStorage(): void {
    try {
      const saved = localStorage.getItem('yprompt_config')
      if (saved) {
        const parsed = JSON.parse(saved)
        // 只加载用户自定义的内容，如果不存在则使用默认值
        this.config.systemPromptRules = parsed.systemPromptRules || SYSTEM_PROMPT_RULES
        this.config.userGuidedPromptRules = parsed.userGuidedPromptRules || USER_GUIDED_PROMPT_RULES
        this.config.requirementReportRules = parsed.requirementReportRules || REQUIREMENT_REPORT_RULES
        // 加载独立的最终提示词生成配置，向后兼容旧版本
        this.config.thinkingPointsExtractionPrompt = parsed.thinkingPointsExtractionPrompt || THINKING_POINTS_EXTRACTION_PROMPT
        this.config.thinkingPointsSystemMessage = parsed.thinkingPointsSystemMessage || THINKING_POINTS_SYSTEM_MESSAGE
        this.config.systemPromptGenerationPrompt = parsed.systemPromptGenerationPrompt || SYSTEM_PROMPT_GENERATION_PROMPT
        this.config.systemPromptSystemMessage = parsed.systemPromptSystemMessage || SYSTEM_PROMPT_SYSTEM_MESSAGE
        this.config.optimizationAdvicePrompt = parsed.optimizationAdvicePrompt || OPTIMIZATION_ADVICE_PROMPT
        this.config.optimizationAdviceSystemMessage = parsed.optimizationAdviceSystemMessage || OPTIMIZATION_ADVICE_SYSTEM_MESSAGE
        this.config.optimizationApplicationPrompt = parsed.optimizationApplicationPrompt || OPTIMIZATION_APPLICATION_PROMPT
        this.config.optimizationApplicationSystemMessage = parsed.optimizationApplicationSystemMessage || OPTIMIZATION_APPLICATION_SYSTEM_MESSAGE
        // 加载质量分析配置
        this.config.qualityAnalysisSystemPrompt = parsed.qualityAnalysisSystemPrompt || QUALITY_ANALYSIS_SYSTEM_PROMPT
        // 加载用户提示词优化配置
        this.config.userPromptQualityAnalysis = parsed.userPromptQualityAnalysis || USER_PROMPT_QUALITY_ANALYSIS
        this.config.userPromptQuickOptimization = parsed.userPromptQuickOptimization || USER_PROMPT_OPTIMIZATION_CONFIG.quick
        this.config.userPromptRules = parsed.userPromptRules || USER_PROMPT_RULES
      }
    } catch (error) {
      // 加载失败时使用默认配置
      this.config = {
        systemPromptRules: SYSTEM_PROMPT_RULES,
        userGuidedPromptRules: USER_GUIDED_PROMPT_RULES,
        requirementReportRules: REQUIREMENT_REPORT_RULES,
        // 独立的最终提示词生成配置
        thinkingPointsExtractionPrompt: THINKING_POINTS_EXTRACTION_PROMPT,
        thinkingPointsSystemMessage: THINKING_POINTS_SYSTEM_MESSAGE,
        systemPromptGenerationPrompt: SYSTEM_PROMPT_GENERATION_PROMPT,
        systemPromptSystemMessage: SYSTEM_PROMPT_SYSTEM_MESSAGE,
        optimizationAdvicePrompt: OPTIMIZATION_ADVICE_PROMPT,
        optimizationAdviceSystemMessage: OPTIMIZATION_ADVICE_SYSTEM_MESSAGE,
        optimizationApplicationPrompt: OPTIMIZATION_APPLICATION_PROMPT,
        optimizationApplicationSystemMessage: OPTIMIZATION_APPLICATION_SYSTEM_MESSAGE,
        // 系统提示词质量分析配置
        qualityAnalysisSystemPrompt: QUALITY_ANALYSIS_SYSTEM_PROMPT,
        // 用户提示词优化配置
        userPromptQualityAnalysis: USER_PROMPT_QUALITY_ANALYSIS,
        userPromptQuickOptimization: USER_PROMPT_OPTIMIZATION_CONFIG.quick,
        userPromptRules: USER_PROMPT_RULES
      }
    }
  }
}

// 单例实例导出
export const promptConfigManager = PromptConfigManager.getInstance()