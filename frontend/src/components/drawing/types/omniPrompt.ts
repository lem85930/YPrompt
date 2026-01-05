/**
 * Omni-Structure Protocol - 绘图提示词结构化协议
 * 基于 Google Imagen 3 Prompting Formula 的完整提示词结构
 */

// Omni-Structure 主结构
export interface OmniPromptStructure {
  // 1. Meta Configuration - 元配置
  meta: {
    aspectRatio: string
    imageCount: number
    negativePrompt: string
  }

  // 2. Art Style & Medium - 艺术风格与媒介
  artStyle: {
    medium: string          // 媒介（摄影、油画、3D渲染等）
    visualStyle: string     // 视觉风格（赛博朋克、极简主义等）
    renderer: string        // 渲染引擎（UE5、Octane等）
  }

  // 3. Subject Core - 主体核心
  subject: {
    main: string            // 主体
    action: string          // 动作
    clothing: string        // 服装
    accessories: string     // 配饰
  }

  // 4. Environment & World - 环境与世界
  environment: {
    scene: string           // 场景
    time: string            // 时间
    weather: string         // 天气
    lighting: string        // 光照
  }

  // 5. Cinematography (Camera) & Layout - 摄影与布局
  camera: {
    shotType: string        // 景别（特写、广角等）
    lens: string            // 镜头参数
    composition: string     // 构图法则
    spatial: string         // 空间布局
  }

  // 6. Typography - 文字渲染（Gemini特色）
  typography: {
    text: string            // 文字内容
    style: string           // 字体风格
    placement: string       // 位置
  }

  // 7. Logic & Physics - 逻辑与物理
  logic: {
    constraints: string     // 逻辑约束
    details: string         // 细节要求
  }
}

// 上传的图片
export interface UploadedImage {
  id: string
  data: string              // Base64 data (不含前缀)
  mimeType: string
  previewUrl: string        // 完整的 Data URL (用于显示)
}

// 诊断维度
export interface DiagnosisDimension {
  score: number
  status: 'good' | 'needs_improvement' | 'poor'
  feedback: string
}

// 质量诊断结果
export interface DiagnosisResult {
  overall_score: number
  overall_status: 'good' | 'needs_improvement' | 'poor'
  analysis: {
    subject: DiagnosisDimension       // 主体
    environment: DiagnosisDimension   // 环境
    composition: DiagnosisDimension   // 构图
    style: DiagnosisDimension         // 风格
    details: DiagnosisDimension       // 细节
    clarity: DiagnosisDimension       // 清晰度
  }
  issues: string[]                    // 发现的问题
  suggestions: string[]               // 优化建议
}

// 双语结构结果（用于逆推和优化）
export interface DualStructureResult {
  cn: OmniPromptStructure
  en: OmniPromptStructure
  naturalPromptEN: string             // 流畅的英文段落
  naturalPromptCN: string             // 流畅的中文段落
}

// 提示词评估结果
export interface PromptEvaluationResult {
  score: number
  critique: string
  suggestions: string
  refined_structure: Partial<OmniPromptStructure>
}

// 画面比例枚举
export enum AspectRatio {
  SQUARE = '1:1',
  PORTRAIT_3_4 = '3:4',
  LANDSCAPE_4_3 = '4:3',
  PORTRAIT_2_3 = '2:3',
  LANDSCAPE_3_2 = '3:2',
  PORTRAIT_4_5 = '4:5',
  LANDSCAPE_5_4 = '5:4',
  WIDE = '16:9',
  TALL = '9:16',
  ULTRA_WIDE = '21:9'
}

// 图片分辨率枚举
export enum ImageResolution {
  RES_1K = '1K',
  RES_2K = '2K',
  RES_4K = '4K'
}

// 生成模型类型
export type GenerationModel = 'gemini-3-pro-image-preview' | 'gemini-2.5-flash-image'

// 逻辑模型类型
export type LogicModel = 'gemini-3-pro-preview' | 'gemini-3-flash-preview'

// 初始化空的 Omni结构
export function createEmptyOmniStructure(): OmniPromptStructure {
  return {
    meta: {
      aspectRatio: '1:1',
      imageCount: 1,
      negativePrompt: ''
    },
    artStyle: {
      medium: '',
      visualStyle: '',
      renderer: ''
    },
    subject: {
      main: '',
      action: '',
      clothing: '',
      accessories: ''
    },
    environment: {
      scene: '',
      time: '',
      weather: '',
      lighting: ''
    },
    camera: {
      shotType: '',
      lens: '',
      composition: '',
      spatial: ''
    },
    typography: {
      text: '',
      style: '',
      placement: ''
    },
    logic: {
      constraints: '',
      details: ''
    }
  }
}
