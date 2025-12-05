import { prefix } from 'constants/config'
const REG_S = {
  hex: /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/,
  hslA: /(hsl)a?\(\s*?(\d+),?\s*?(\d+)%,?\s*?(\d+)%,?\s*?\/?(\s*?[\d.]+)?\s*?\)/,
  rgbA: /(rgb)a?\(\s*?(\d+),?\s*?(\d+),?\s*?(\d+),?\s*?\/?(\s*?[\d.]+)?\s*?\)/,
  designTokens: /(\w+)?-?(\w+)-?(\d)?/
}
export const getGeneratedColor = (sourecColor: string) => {
  const color = sourecColor.toLowerCase()
  if (REG_S.hex.test(color)) {
    return hslToRgba(color)
  }
  if (REG_S.designTokens.test(color)) {
    return designTokenToColor(color)
  }
}
const designTokenToColor = (token: string) => {
  if (window) {
    const color = window.getComputedStyle(document.body).getPropertyValue(`--${prefix}-${token}`)
    return color
  }
}
const hslToRgba = (hslColor: string) => {
  const color = hslColor.trim().replace(/\s+/g, ' ')
  // 提取色相、饱和度、亮度和透明度
  let hue,
    saturation,
    lightness,
    alpha = 1

  // 检查是否是 HSLA 格式
  const hslaMatch = color.match(/^hsla?\(([^)]+)\)$/i)
  if (!hslaMatch) {
    throw new Error('Invalid HSL/HSLA color format')
  }

  const valuesStr = hslaMatch[1]

  // 处理新语法（空格和斜杠分隔）
  if (valuesStr.includes('/')) {
    const parts = valuesStr.split('/')
    const hslPart = parts[0].trim()
    const alphaPart = parts[1].trim()

    // 解析 HSL 部分
    const hslValues = hslPart.split(/\s+/)
    if (hslValues.length < 3) {
      throw new Error('Invalid HSL values')
    }

    hue = parseFloat(hslValues[0])
    saturation = parseFloat(hslValues[1].replace('%', ''))
    lightness = parseFloat(hslValues[2].replace('%', ''))

    // 解析透明度
    alpha = parseFloat(alphaPart)
    if (alphaPart.includes('%')) {
      alpha = parseFloat(alphaPart.replace('%', '')) / 100
    }
  }
  // 处理旧语法（逗号分隔）
  else if (valuesStr.includes(',')) {
    const values = valuesStr.split(',')
    const cleanedValues = values.map((v) => v.trim())

    // 移除可能存在的 hsla/hsl 前缀残留
    hue = parseFloat(cleanedValues[0])
    saturation = parseFloat(cleanedValues[1].replace('%', ''))
    lightness = parseFloat(cleanedValues[2].replace('%', ''))

    // 如果有第四个值，则是透明度
    if (cleanedValues.length >= 4) {
      alpha = parseFloat(cleanedValues[3])
      if (cleanedValues[3].includes('%')) {
        alpha = parseFloat(cleanedValues[3].replace('%', '')) / 100
      }
    }
  }
  // 纯空格分隔（无透明度）
  else {
    const values = valuesStr.split(/\s+/)
    hue = parseFloat(values[0])
    saturation = parseFloat(values[1].replace('%', ''))
    lightness = parseFloat(values[2].replace('%', ''))
  }

  // 验证数值范围
  if (isNaN(hue) || isNaN(saturation) || isNaN(lightness) || isNaN(alpha)) {
    throw new Error('Invalid numeric values in HSL color')
  }

  // 将色相归一化到 0-360 度
  hue = hue % 360
  if (hue < 0) hue += 360

  // 将饱和度和亮度归一化到 0-100
  saturation = Math.max(0, Math.min(100, saturation))
  lightness = Math.max(0, Math.min(100, lightness))
  alpha = Math.max(0, Math.min(1, alpha))

  // HSL 到 RGB 的转换算法
  saturation /= 100
  lightness /= 100

  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation
  const x = chroma * (1 - Math.abs(((hue / 60) % 2) - 1))
  const m = lightness - chroma / 2

  let r, g, b

  if (hue >= 0 && hue < 60) {
    r = chroma
    g = x
    b = 0
  } else if (hue >= 60 && hue < 120) {
    r = x
    g = chroma
    b = 0
  } else if (hue >= 120 && hue < 180) {
    r = 0
    g = chroma
    b = x
  } else if (hue >= 180 && hue < 240) {
    r = 0
    g = x
    b = chroma
  } else if (hue >= 240 && hue < 300) {
    r = x
    g = 0
    b = chroma
  } else {
    r = chroma
    g = 0
    b = x
  }

  // 转换为 0-255 范围的 RGB 值
  r = Math.round((r + m) * 255)
  g = Math.round((g + m) * 255)
  b = Math.round((b + m) * 255)

  // 返回 RGBA 字符串
  if (alpha === 1) {
    return `rgb(${r}, ${g}, ${b})`
  } else {
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }
}
