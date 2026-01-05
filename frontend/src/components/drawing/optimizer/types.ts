
// The Omni-Structure Protocol
export interface OmniPromptStructure {
  // 1. Meta Configuration
  meta: {
    aspectRatio: string;
    imageCount: number;
    negativePrompt: string;
  };

  // 2. Art Style & Medium
  artStyle: {
    medium: string;
    visualStyle: string;
    renderer: string;
  };

  // 3. Subject Core
  subject: {
    main: string;
    action: string;
    clothing: string;
    accessories: string;
  };

  // 4. Environment & World
  environment: {
    scene: string;
    time: string;
    weather: string;
    lighting: string;
  };

  // 5. Cinematography (Camera) & Layout
  camera: {
    shotType: string;
    lens: string;
    composition: string;
    spatial: string;
  };

  // 6. Typography (Gemini Strength)
  typography: {
    text: string;
    style: string;
    placement: string;
  };

  // 7. Logic & Physics
  logic: {
    constraints: string;
    details: string;
  };
}

export interface UploadedImage {
  id: string;
  data: string; // Base64 data part only
  mimeType: string;
  previewUrl: string; // Full Data URL for display
}

export interface DiagnosisDimension {
  score: number;
  status: 'good' | 'needs_improvement' | 'poor';
  feedback: string;
}

// Result for "Quality Diagnosis"
export interface DiagnosisResult {
  overall_score: number;
  overall_status: 'good' | 'needs_improvement' | 'poor';
  analysis: {
    subject: DiagnosisDimension;     // Replaces Role
    environment: DiagnosisDimension; // Replaces Task
    composition: DiagnosisDimension; // Replaces Format
    style: DiagnosisDimension;       // Replaces Constraints
    details: DiagnosisDimension;     // Replaces Example
    clarity: DiagnosisDimension;     // Replaces Language
  };
  issues: string[];
  suggestions: string[]; // Actionable advice to fix the issues
}

// Result for "Reverse Engineering" and "Refinement"
export interface DualStructureResult {
  cn: OmniPromptStructure;
  en: OmniPromptStructure;
  naturalPromptEN: string; // Fluent English Paragraph
  naturalPromptCN: string; // Fluent Chinese Paragraph
}

export interface PromptEvaluationResult {
  score: number;
  critique: string;
  suggestions: string;
  refined_structure: Partial<OmniPromptStructure>;
}

export enum AspectRatio {
  SQUARE = "1:1",
  PORTRAIT = "3:4",
  LANDSCAPE = "4:3",
  WIDE = "16:9",
  TALL = "9:16"
}

export enum ImageResolution {
  RES_1K = "1K",
  RES_2K = "2K",
  RES_4K = "4K"
}

export type GenerationModel = 'gemini-3-pro-image-preview' | 'gemini-2.5-flash-image';
export type LogicModel = 'gemini-3-pro-preview' | 'gemini-3-flash-preview';
