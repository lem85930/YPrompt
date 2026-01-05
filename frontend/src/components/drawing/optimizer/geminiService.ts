
import { OmniPromptStructure, DiagnosisResult, DualStructureResult, GenerationModel, AspectRatio, ImageResolution, PromptEvaluationResult, UploadedImage, LogicModel } from "./types";

// --- CONFIGURATION STATE ---
let appConfig = {
  apiKey: "",
  baseUrl: "https://generativelanguage.googleapis.com"
};

export const setGeminiConfig = (apiKey: string, baseUrl?: string) => {
  if (apiKey) {
      appConfig.apiKey = apiKey.trim();
      try { localStorage.setItem("gemini_api_key_backup", apiKey.trim()); } catch(e){}
  }
  if (baseUrl && baseUrl.trim()) {
      appConfig.baseUrl = baseUrl.trim();
  } else {
      appConfig.baseUrl = "https://generativelanguage.googleapis.com";
  }
  console.log("[Gemini Config Set]", { baseUrl: appConfig.baseUrl, hasKey: !!appConfig.apiKey });
};

// --- HELPER: GET EFFECTIVE KEY ---
const getEffectiveKey = () => {
    return appConfig.apiKey || import.meta.env.VITE_API_KEY || localStorage.getItem("gemini_api_key_backup") || "";
};

// --- HELPER: CLEAN JSON ---
const cleanJSON = (text: string): string => {
  if (!text) return "{}";
  let cleaned = text.trim();
  cleaned = cleaned.replace(/^```json\s*/, "").replace(/^```\s*/, "").replace(/\s*```$/, "");
  return cleaned;
};

// --- HELPER: SANITIZE STRUCTURE ---
const sanitizeStructure = (data: any): OmniPromptStructure => {
  const initialStructure: OmniPromptStructure = {
    meta: { aspectRatio: "1:1", imageCount: 1, negativePrompt: "" },
    artStyle: { medium: "", visualStyle: "", renderer: "" },
    subject: { main: "", action: "", clothing: "", accessories: "" },
    environment: { scene: "", time: "", weather: "", lighting: "" },
    camera: { shotType: "", lens: "", composition: "", spatial: "" },
    typography: { text: "", style: "", placement: "" },
    logic: { constraints: "", details: "" }
  };

  if (!data || typeof data !== 'object') return initialStructure;
  return {
    meta: { ...initialStructure.meta, ...(data.meta || {}) },
    artStyle: { ...initialStructure.artStyle, ...(data.artStyle || {}) },
    subject: { ...initialStructure.subject, ...(data.subject || {}) },
    environment: { ...initialStructure.environment, ...(data.environment || {}) },
    camera: { ...initialStructure.camera, ...(data.camera || {}) },
    typography: { ...initialStructure.typography, ...(data.typography || {}) },
    logic: { ...initialStructure.logic, ...(data.logic || {}) },
  };
};

const OMNI_SCHEMA_STRING = `
{
  "meta": { "aspectRatio": "string", "imageCount": 1, "negativePrompt": "string" },
  "artStyle": { "medium": "string", "visualStyle": "string", "renderer": "string" },
  "subject": { "main": "string", "action": "string", "clothing": "string", "accessories": "string" },
  "environment": { "scene": "string", "time": "string", "weather": "string", "lighting": "string" },
  "camera": { "shotType": "string", "lens": "string", "composition": "string", "spatial": "string" },
  "typography": { "text": "string", "style": "string", "placement": "string" },
  "logic": { "constraints": "string", "details": "string" }
}
`;

// --- CORE REST API CALLER (PURE FETCH) ---
const callGemini = async (model: string, payload: any) => {
    const apiKey = getEffectiveKey();
    if (!apiKey) {
        throw new Error("API Key 未配置。请在右上角设置中填写您的 Key。(API Key missing)");
    }

    let baseUrl = appConfig.baseUrl.replace(/\/$/, "");
    if (!baseUrl.startsWith("http")) baseUrl = `https://${baseUrl}`;

    // Construct Standard REST URL
    const url = `${baseUrl}/v1beta/models/${model}:generateContent?key=${apiKey}`;

    console.log(`[Gemini Request] POST ${url}`);

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok) {
            const errorMsg = data.error?.message || response.statusText || "Unknown API Error";
            const errorCode = data.error?.code || response.status;
            console.error("[Gemini API Error]", data);

            if (errorCode === 403) {
                throw new Error(`权限拒绝 (403): 请检查 API Key 是否有权访问模型 ${model}，或项目是否开启了计费/白名单。(Permission Denied)`);
            }
            if (errorCode === 404) {
                throw new Error(`模型未找到 (404): 模型 ${model} 可能不存在或您的 Base URL 配置错误。`);
            }
            throw new Error(`API 请求失败 (${errorCode}): ${errorMsg}`);
        }

        return data;
    } catch (error: any) {
        console.error("Network/API Error:", error);
        throw error;
    }
};

const extractText = (response: any): string => {
    return response.candidates?.[0]?.content?.parts?.map((p: any) => p.text).join("") || "";
};

// --- 1. COMPILER (No API calls) ---
export const compileOmniPrompt = (data: OmniPromptStructure, lang: 'cn' | 'en'): string => {
  const sentences: string[] = [];
  const isCN = lang === 'cn';

  // Compiler Logic (Same as before)
  if (!isCN) {
    const styleParts = [data.artStyle.visualStyle, data.artStyle.medium, data.artStyle.renderer].filter(Boolean);
    if (styleParts.length > 0) sentences.push(`Create a ${styleParts.join(" ")} image.`);
    const envParts = [data.environment.scene, data.environment.time, data.environment.weather].filter(Boolean);
    if (envParts.length > 0) {
      let env = `First, set the scene in ${data.environment.scene || 'a location'}`;
      if (data.environment.time) env += ` during ${data.environment.time}`;
      if (data.environment.weather) env += ` with ${data.environment.weather} weather`;
      if (data.environment.lighting) env += `. The lighting is ${data.environment.lighting}`;
      sentences.push(env + ".");
    } else if (data.environment.lighting) {
      sentences.push(`The lighting is ${data.environment.lighting}.`);
    }
    if (data.subject.main) {
      let sub = `Then, place ${data.subject.main} in the center`;
      if (data.subject.action) sub += ` ${data.subject.action}`;
      const apps = [data.subject.clothing ? `wearing ${data.subject.clothing}` : null, data.subject.accessories ? `with ${data.subject.accessories}` : null].filter(Boolean);
      if (apps.length > 0) sub += `. The subject is ${apps.join(" and ")}`;
      sentences.push(sub + ".");
    }
    const cams = [data.camera.shotType, data.camera.composition, data.camera.lens].filter(Boolean);
    if (cams.length > 0) sentences.push(`Capture this using a ${cams.join(", ")}.`);
    if (data.camera.spatial) sentences.push(`Ensure ${data.camera.spatial}.`);
    if (data.typography.text) {
      let txt = `Finally, include the text "${data.typography.text}"`;
      if (data.typography.placement) txt += ` placed ${data.typography.placement}`;
      if (data.typography.style) txt += ` written in a ${data.typography.style}`;
      sentences.push(txt + ".");
    }
    if (data.logic.details) sentences.push(`Pay attention to details: ${data.logic.details}.`);
    if (data.logic.constraints) sentences.push(`Logic constraint: ${data.logic.constraints}.`);
    if (data.meta.negativePrompt) sentences.push(`--no ${data.meta.negativePrompt}`);
  } else {
    const styleParts = [data.artStyle.visualStyle, data.artStyle.medium, data.artStyle.renderer].filter(Boolean);
    if (styleParts.length > 0) sentences.push(`生成一张${styleParts.join(" ")}。`);
    const envParts = [data.environment.scene, data.environment.time, data.environment.weather].filter(Boolean);
    if (envParts.length > 0) {
      let env = `首先，场景设定在${data.environment.scene || '某处'}`;
      if (data.environment.time) env += `，时间是${data.environment.time}`;
      if (data.environment.weather) env += `，天气${data.environment.weather}`;
      if (data.environment.lighting) env += `。光照为${data.environment.lighting}`;
      sentences.push(env + "。");
    } else if (data.environment.lighting) {
      sentences.push(`光照设置为${data.environment.lighting}。`);
    }
    if (data.subject.main) {
      let sub = `接着，在画面中心放置${data.subject.main}`;
      if (data.subject.action) sub += `，正在${data.subject.action}`;
      const apps = [data.subject.clothing ? `身穿${data.subject.clothing}` : null, data.subject.accessories ? `佩戴${data.subject.accessories}` : null].filter(Boolean);
      if (apps.length > 0) sub += `。主体${apps.join("，且")}`;
      sentences.push(sub + "。");
    }
    const cams = [data.camera.shotType, data.camera.composition, data.camera.lens].filter(Boolean);
    if (cams.length > 0) sentences.push(`使用${cams.join("、")}拍摄。`);
    if (data.camera.spatial) sentences.push(`确保${data.camera.spatial}。`);
    if (data.typography.text) {
      let txt = `最后，包含文字"${data.typography.text}"`;
      if (data.typography.placement) txt += `，位于${data.typography.placement}`;
      if (data.typography.style) txt += `，字体风格为${data.typography.style}`;
      sentences.push(txt + "。");
    }
    if (data.logic.details) sentences.push(`注意细节：${data.logic.details}。`);
    if (data.logic.constraints) sentences.push(`逻辑约束：${data.logic.constraints}。`);
    if (data.meta.negativePrompt) sentences.push(`--no ${data.meta.negativePrompt}`);
  }
  return sentences.join(" ");
};

// --- 2. LOGIC OPERATIONS ---

export const optimizeRawPrompt = async (
  prompt: string,
  lang: 'cn' | 'en',
  logicModel: LogicModel
): Promise<string> => {
  const langName = lang === 'cn' ? "Chinese" : "English";
  const systemPromptText = `
    You are an expert AI Art Prompt Polish Tool utilizing the **Google Imagen 3 Prompting Formula**.
    THE FORMULA: **[Context/Scene] -> [Subject] -> [Details/Style] -> [Tech Specs]**
    TASK: Rewrite the input prompt into a SINGLE, FLUENT, HIGH-QUALITY natural language paragraph in ${langName} following the formula.
  `;
  const payload = {
      systemInstruction: { parts: [{ text: systemPromptText }] },
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7 }
  };
  const data = await callGemini(logicModel, payload);
  return extractText(data).trim() || prompt;
};

export const reverseImageToDualStructure = async (
  base64Image: string,
  mimeType: string,
  logicModel: LogicModel
): Promise<DualStructureResult> => {
  const systemPromptText = `
    You are a professional Reverse Prompt Engineer.
    TASK: Analyze image and generate structured JSON (en & cn) + two natural language paragraphs (en & cn) using Google Imagen 3 Formula.
    JSON Schema:
    {
      "en": ${OMNI_SCHEMA_STRING},
      "cn": ${OMNI_SCHEMA_STRING},
      "naturalPromptEN": "Fluent English paragraph",
      "naturalPromptCN": "Fluent Chinese paragraph"
    }
  `;
  const payload = {
      systemInstruction: { parts: [{ text: systemPromptText }] },
      contents: [{ role: "user", parts: [{ inlineData: { mimeType: mimeType, data: base64Image } }, { text: "Reverse engineer." }] }],
      generationConfig: { responseMimeType: "application/json", temperature: 0.5 }
  };
  const data = await callGemini(logicModel, payload);
  const text = extractText(data);
  const parsed = JSON.parse(cleanJSON(text));
  return {
      en: sanitizeStructure(parsed.en),
      cn: sanitizeStructure(parsed.cn),
      naturalPromptEN: parsed.naturalPromptEN || "",
      naturalPromptCN: parsed.naturalPromptCN || ""
  };
};

// UPDATED: Now accepts 'lang' to enforce output language
export const diagnoseQuality = async (
  textInput: string,
  images: { data: string, mimeType: string }[] = [],
  logicModel: LogicModel,
  lang: 'cn' | 'en' // New Param
): Promise<DiagnosisResult> => {
  const parts: any[] = [];
  if (images.length > 0) {
      images.forEach(img => parts.push({ inlineData: { mimeType: img.mimeType || 'image/png', data: img.data } }));
  }

  let userInstruction = "";
  if (images.length > 0 && textInput) {
    userInstruction = `Context: User uploaded ${images.length} image(s).\nPrompt to analyze: "${textInput}".`;
  } else if (images.length > 0) {
    userInstruction = `Analyze the first image for prompt structure quality.`;
  } else {
    userInstruction = `Analyze this Prompt: "${textInput}".`;
  }
  parts.push({ text: userInstruction });

  // Localization Instruction
  const outputLangInstruction = lang === 'cn'
      ? "CRITICAL: You MUST output the 'feedback', 'issues', and 'suggestions' fields in SIMPLIFIED CHINESE (简体中文)."
      : "CRITICAL: You MUST output the 'feedback', 'issues', and 'suggestions' fields in ENGLISH.";

  const systemPromptText = `
    You are a professional **AI Image Prompt Quality Expert**.
    Evaluate based on 6 Dimensions: Subject, Environment, Composition, Style, Details, Clarity.
    ${outputLangInstruction}

    OUTPUT FORMAT (Strict JSON):
    {
      "overall_score": 0,
      "overall_status": "good|needs_improvement|poor",
      "analysis": {
        "subject": { "score": 0, "status": "good", "feedback": "Localized String" },
        "environment": { "score": 0, "status": "good", "feedback": "Localized String" },
        "composition": { "score": 0, "status": "good", "feedback": "Localized String" },
        "style": { "score": 0, "status": "good", "feedback": "Localized String" },
        "details": { "score": 0, "status": "good", "feedback": "Localized String" },
        "clarity": { "score": 0, "status": "good", "feedback": "Localized String" }
      },
      "issues": ["Localized String"],
      "suggestions": ["Localized String"]
    }
  `;

  const payload = {
      systemInstruction: { parts: [{ text: systemPromptText }] },
      contents: [{ role: "user", parts }],
      generationConfig: { responseMimeType: "application/json" }
  };

  const data = await callGemini(logicModel, payload);
  return JSON.parse(cleanJSON(extractText(data) || "{}")) as DiagnosisResult;
};

export const refineDualStructure = async (
  currentData: OmniPromptStructure,
  diagnosis: DiagnosisResult | null,
  userIntent: string,
  images: { data: string, mimeType: string }[] = [],
  logicModel: LogicModel
): Promise<DualStructureResult> => {
  const parts: any[] = [];
  if (images.length > 0) {
      images.forEach(img => parts.push({ inlineData: { mimeType: img.mimeType || 'image/png', data: img.data } }));
  }

  let promptContext = `TASK: Refine/Create Prompt Structure.\nUser Intent: "${userIntent}"\nCurrent Structure: ${JSON.stringify(currentData)}`;
  if (diagnosis?.issues?.length) {
      promptContext += `\nFix Issues: ${diagnosis.issues.join("; ")}`;
  }
  parts.push({ text: promptContext });

  const systemPromptText = `
    You are an expert Prompt Optimizer.
    GOALS: Output 'en' and 'cn' JSON structures + TWO natural language paragraphs.
    JSON Schema:
    {
      "en": ${OMNI_SCHEMA_STRING},
      "cn": ${OMNI_SCHEMA_STRING},
      "naturalPromptEN": "Fluent English paragraph",
      "naturalPromptCN": "Fluent Chinese paragraph"
    }
  `;

  const payload = {
      systemInstruction: { parts: [{ text: systemPromptText }] },
      contents: [{ role: "user", parts }],
      generationConfig: { responseMimeType: "application/json" }
  };

  const data = await callGemini(logicModel, payload);
  const text = extractText(data);
  const parsed = JSON.parse(cleanJSON(text));

  return {
      en: sanitizeStructure(parsed.en),
      cn: sanitizeStructure(parsed.cn),
      naturalPromptEN: parsed.naturalPromptEN || "",
      naturalPromptCN: parsed.naturalPromptCN || ""
  };
};

// --- 3. IMAGE GENERATION ---
export const generateGeminiImage = async (
  prompt: string,
  modelName: GenerationModel,
  aspectRatio: AspectRatio,
  resolution: ImageResolution,
  referenceImages: UploadedImage[] = []
): Promise<string> => {
  const parts: any[] = [];
  if (referenceImages && referenceImages.length > 0) {
      referenceImages.forEach(img => {
          parts.push({ inlineData: { data: img.data, mimeType: img.mimeType } });
      });
  }
  parts.push({ text: prompt });

  const payload: any = {
      contents: [{ role: "user", parts }],
      generationConfig: {
          temperature: 0.9,
          topP: 1,
          topK: 32,
          maxOutputTokens: 2048,
          responseModalities: ["TEXT", "IMAGE"],
      },
      safetySettings: [
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_ONLY_HIGH" },
        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_ONLY_HIGH" },
        { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_ONLY_HIGH" },
        { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_ONLY_HIGH" }
      ]
  };

  if (modelName === 'gemini-3-pro-image-preview') {
      payload.generationConfig.imageConfig = { aspectRatio: aspectRatio, imageSize: resolution };
  } else {
      payload.generationConfig.imageConfig = { aspectRatio: aspectRatio };
  }

  const data = await callGemini(modelName, payload);
  const candidate = data.candidates?.[0];
  if (candidate?.content?.parts) {
      for (const part of candidate.content.parts) {
          if (part.inlineData && part.inlineData.data) {
             return `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
          }
      }
  }

  const textOutput = extractText(data);
  if (textOutput) throw new Error(`Model returned text instead of image: ${textOutput.substring(0, 200)}...`);
  throw new Error("No image data found in response.");
};

export const translateToChinese = async (text: string): Promise<string> => { return text; };

export const analyzeMultimodalInput = async (text: string | null, base64Image: string | null, mimeType: string | null): Promise<PromptEvaluationResult> => {
    const parts: any[] = [];
    if (base64Image) parts.push({ inlineData: { mimeType: mimeType || 'image/png', data: base64Image } });
    if (text) parts.push({ text });
    else parts.push({ text: "Analyze this image for prompt structure." });

    const payload = {
        contents: [{ role: "user", parts }],
        generationConfig: { responseMimeType: "application/json" }
    };

    const data = await callGemini("gemini-2.5-flash", payload);
    const resultText = extractText(data);
    return JSON.parse(cleanJSON(resultText || "{}")) as PromptEvaluationResult;
};
