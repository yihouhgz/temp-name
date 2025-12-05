import { prefix } from 'constants/config'
import type { StrokeArray } from './type'
import { DEFAULT_COLOR } from './type'
import { CSS_COLORS } from './constant'
const REG_S = {
  hex: /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/,
  hslA: /(hsl)a?\(\s*?(\d+),?\s*?(\d+)%,?\s*?(\d+)%,?\s*?\/?(\s*?[\d.]+)?\s*?\)/,
  rgbA: /(rgb)a?\(\s*?(\d+),?\s*?(\d+),?\s*?(\d+),?\s*?\/?(\s*?[\d.]+)?\s*?\)/,
  designTokens: /(\w+)?-?(\w+)-?(\d)?/
}
export const getGeneratedColor = (sourecColor: string) => {
  if (sourecColor.indexOf(prefix) > -1) {
    return sourecColor
  }
  const color = sourecColor.toLowerCase()
  if (REG_S.hex.test(color)) {
    return hslToRgba(color)
  } else if (REG_S.designTokens.test(color)) {
    const r = designTokenToColor(color)
    if (r) return r
    return sourecColor
  } else {
    return sourecColor
  }
}

const formatRgbColor = (rgba: [number, number, number, number]): string => {
  const [r, g, b, a] = rgba
  if (a === 1) {
    return `rgb(${r}, ${g}, ${b})`
  }
  return `rgba(${r}, ${g}, ${b}, ${a})`
}

const interpolateColor = (
  color1: [number, number, number, number],
  color2: [number, number, number, number],
  ratio: number
): [number, number, number, number] => {
  return [
    Math.round(color1[0] + (color2[0] - color1[0]) * ratio),
    Math.round(color1[1] + (color2[1] - color1[1]) * ratio),
    Math.round(color1[2] + (color2[2] - color1[2]) * ratio),
    color1[3] + (color2[3] - color1[3]) * ratio
  ]
}

export const getGradientColor = (strokeArray: StrokeArray): StrokeArray => {
  if (strokeArray.length === 0) {
    return []
  }
  const sorted = [...strokeArray].sort((a, b) => a.percent - b.percent)

  if (sorted[0].percent !== 0) {
    sorted.unshift({ color: 'rgb(249, 57, 32)', percent: 0 })
  }
  if (sorted[sorted.length - 1].percent !== 100) {
    sorted.push({ ...sorted[sorted.length - 1], percent: 100 })
  }

  const result = []
  const parsedColors = sorted.map((stop) => ({
    percent: stop.percent,
    rgba: parseColor(stop.color)
  }))

  for (let percent = 0; percent <= 100; percent++) {
    const existingStop = sorted.find((stop) => stop.percent === percent)
    if (existingStop) {
      result.push({ percent, color: existingStop.color })
      continue
    }
    for (let i = 0; i < parsedColors.length - 1; i++) {
      const start = parsedColors[i]
      const end = parsedColors[i + 1]

      if (percent >= start.percent && percent <= end.percent) {
        const ratio = (percent - start.percent) / (end.percent - start.percent)
        const interpolatedRgba = interpolateColor(start.rgba, end.rgba, ratio)
        result.push({
          percent,
          color: formatRgbColor(interpolatedRgba)
        })
        break
      }
    }
  }

  return result
}
const normalizeColor = (color: string): string => {
  const normalized = color.toLowerCase().trim()
  if (CSS_COLORS[normalized]) {
    return CSS_COLORS[normalized]
  }
  if (normalized === 'transparent') {
    return 'rgba(0,0,0,0)'
  }
  return color
}
const parseColor = (color: string): [number, number, number, number] => {
  const normalizedColor = normalizeColor(color)
  const colorStr = normalizedColor.replace(/\s/g, '')
  if (REG_S.hex.test(colorStr)) {
    return parseHexColor(colorStr)
  }
  if (REG_S.rgbA.test(colorStr)) {
    return parseRgbColor(colorStr)
  }
  if (REG_S.hslA.test(colorStr)) {
    return parseHslColor(colorStr)
  }
  if (REG_S.designTokens.test(colorStr)) {
    // return designTokenToColor(colorStr)
  }
  throw new Error(`Unsupported color format: ${color}`)
}
const parseHslColor = (hsl: string): [number, number, number, number] => {
  const match = hsl.match(/hsla?\((\d+),([\d.]+)%?,([\d.]+)%?(?:,([\d.]+))?\)/i)
  if (!match) {
    throw new Error(`Invalid hsl color: ${hsl}`)
  }

  const h = parseInt(match[1]) / 360
  const s = parseFloat(match[2]) / 100
  const l = parseFloat(match[3]) / 100
  const a = match[4] ? parseFloat(match[4]) : 1

  // 将HSL转换为RGB
  if (s === 0) {
    const value = Math.round(l * 255)
    return [value, value, value, a]
  }

  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1
    if (t > 1) t -= 1
    if (t < 1 / 6) return p + (q - p) * 6 * t
    if (t < 1 / 2) return q
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
    return p
  }

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s
  const p = 2 * l - q

  const r = hue2rgb(p, q, h + 1 / 3)
  const g = hue2rgb(p, q, h)
  const b = hue2rgb(p, q, h - 1 / 3)

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255), a]
}
const parseRgbColor = (rgb: string): [number, number, number, number] => {
  const match = rgb.match(/rgba?\((\d+),(\d+),(\d+)(?:,([\d.]+))?\)/i)
  if (!match) {
    throw new Error(`Invalid rgb color: ${rgb}`)
  }
  return [
    parseInt(match[1]),
    parseInt(match[2]),
    parseInt(match[3]),
    match[4] ? parseFloat(match[4]) : 1
  ]
}
const parseHexColor = (hex: string): [number, number, number, number] => {
  hex = hex.replace('#', '')
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }
  if (hex.length === 6) {
    return [
      parseInt(hex.substring(0, 2), 16),
      parseInt(hex.substring(2, 4), 16),
      parseInt(hex.substring(4, 6), 16),
      1
    ]
  }
  if (hex.length === 8) {
    return [
      parseInt(hex.substring(0, 2), 16),
      parseInt(hex.substring(2, 4), 16),
      parseInt(hex.substring(4, 6), 16),
      parseInt(hex.substring(6, 8), 16) / 255
    ]
  }
  throw new Error(`Invalid hex color: ${hex}`)
}
const designTokenToColor = (token: string) => {
  if (window) {
    const color = window.getComputedStyle(document.body).getPropertyValue(`--${prefix}-${token}`)
    if (color) {
      const [r, g, b] = color.split(',')
      return `rgba(${r},${g},${b},1)`
    }
    return color
  }
}
const hslToRgba = (hslColor: string) => {
  const color = hslColor.trim().replace(/\s+/g, ' ')
  let hue,
    saturation,
    lightness,
    alpha = 1

  const hslaMatch = color.match(/^hsla?\(([^)]+)\)$/i)
  if (!hslaMatch) {
    throw new Error('Invalid HSL/HSLA color format')
  }

  const valuesStr = hslaMatch[1]

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
  } else if (valuesStr.includes(',')) {
    const values = valuesStr.split(',')
    const cleanedValues = values.map((v) => v.trim())

    hue = parseFloat(cleanedValues[0])
    saturation = parseFloat(cleanedValues[1].replace('%', ''))
    lightness = parseFloat(cleanedValues[2].replace('%', ''))

    if (cleanedValues.length >= 4) {
      alpha = parseFloat(cleanedValues[3])
      if (cleanedValues[3].includes('%')) {
        alpha = parseFloat(cleanedValues[3].replace('%', '')) / 100
      }
    }
  } else {
    const values = valuesStr.split(/\s+/)
    hue = parseFloat(values[0])
    saturation = parseFloat(values[1].replace('%', ''))
    lightness = parseFloat(values[2].replace('%', ''))
  }

  if (isNaN(hue) || isNaN(saturation) || isNaN(lightness) || isNaN(alpha)) {
    throw new Error('Invalid numeric values in HSL color')
  }

  hue = hue % 360
  if (hue < 0) hue += 360

  saturation = Math.max(0, Math.min(100, saturation))
  lightness = Math.max(0, Math.min(100, lightness))
  alpha = Math.max(0, Math.min(1, alpha))

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

  r = Math.round((r + m) * 255)
  g = Math.round((g + m) * 255)
  b = Math.round((b + m) * 255)

  if (alpha === 1) {
    return `rgb(${r}, ${g}, ${b})`
  } else {
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }
}
