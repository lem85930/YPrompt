/**
 * 分辨率映射工具
 * 将自定义分辨率映射到 Gemini API 支持的标准参数（1K/2K/4K）
 */

// 标准分辨率的近似像素数
const RESOLUTION_THRESHOLDS = {
  '1K': 1024 * 1024,      // ~1,048,576 像素
  '2K': 2048 * 2048,      // ~4,194,304 像素
  '4K': 4096 * 4096       // ~16,777,216 像素
}

/**
 * 将自定义分辨率映射到最接近的标准参数
 * @param width 宽度
 * @param height 高度
 * @returns '1K' | '2K' | '4K'
 */
export function mapResolutionToStandard(width: number, height: number): '1K' | '2K' | '4K' {
  const totalPixels = width * height

  // 计算与每个标准分辨率的距离
  const distances = {
    '1K': Math.abs(totalPixels - RESOLUTION_THRESHOLDS['1K']),
    '2K': Math.abs(totalPixels - RESOLUTION_THRESHOLDS['2K']),
    '4K': Math.abs(totalPixels - RESOLUTION_THRESHOLDS['4K'])
  }

  // 找到距离最小的标准分辨率
  let closestResolution: '1K' | '2K' | '4K' = '1K'
  let minDistance = distances['1K']

  if (distances['2K'] < minDistance) {
    closestResolution = '2K'
    minDistance = distances['2K']
  }

  if (distances['4K'] < minDistance) {
    closestResolution = '4K'
  }

  return closestResolution
}

/**
 * 获取分辨率信息（用于显示）
 * @param width 宽度
 * @param height 高度
 * @returns 分辨率信息对象
 */
export function getResolutionInfo(width: number, height: number) {
  const totalPixels = width * height
  const mappedStandard = mapResolutionToStandard(width, height)
  const megapixels = (totalPixels / (1024 * 1024)).toFixed(2)

  return {
    width,
    height,
    totalPixels,
    megapixels: `${megapixels}MP`,
    mappedStandard,
    displayText: `${width}x${height} (${megapixels}MP) → API: ${mappedStandard}`
  }
}

/**
 * 验证分辨率是否有效
 * @param width 宽度
 * @param height 高度
 * @returns 是否有效
 */
export function isValidResolution(width: number, height: number): boolean {
  // 检查是否为正整数
  if (!Number.isInteger(width) || !Number.isInteger(height)) {
    return false
  }

  // 检查范围（最小 64x64，最大 8192x8192）
  if (width < 64 || height < 64 || width > 8192 || height > 8192) {
    return false
  }

  return true
}

/**
 * 解析分辨率字符串
 * @param resolutionStr 分辨率字符串（如 "1728x2304"）
 * @returns { width, height } 或 null
 */
export function parseResolutionString(resolutionStr: string): { width: number; height: number } | null {
  const match = resolutionStr.match(/^(\d+)\s*[x×]\s*(\d+)$/i)
  if (!match) {
    return null
  }

  const width = parseInt(match[1], 10)
  const height = parseInt(match[2], 10)

  if (!isValidResolution(width, height)) {
    return null
  }

  return { width, height }
}
