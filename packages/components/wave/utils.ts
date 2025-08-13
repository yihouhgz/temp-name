export function isValidWaveColor(color: string) {
  return (
    color &&
    color !== '#fff' &&
    color !== '#ffffff' &&
    color !== 'rgb(255, 255, 255)' &&
    color !== 'rgba(255, 255, 255, 1)' &&
    !/rgba\((?:\d*, ){3}0\)/.test(color) && // any transparent rgba color
    color !== 'transparent' &&
    color !== 'canvastext'
  )
}

export function getTargetWaveColor(node: HTMLElement) {
  const { borderTopColor, borderColor, backgroundColor } =
    getComputedStyle(node)
  if (isValidWaveColor(borderTopColor)) {
    return borderTopColor
  }
  if (isValidWaveColor(borderColor)) {
    return borderColor
  }
  if (isValidWaveColor(backgroundColor)) {
    return backgroundColor
  }
  return null
}

export function getWaveEffectColor(
  color: string | null,
  opacity: number = 0.2
): string {
  if (!color) {
    // 默认使用白色，带有透明度
    return `rgba(255, 255, 255, ${opacity})`
  }

  // 如果已经是rgba格式，直接修改透明度
  const rgbaMatch = color.match(
    /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/
  )
  if (rgbaMatch) {
    const [, r, g, b] = rgbaMatch
    return `rgba(${r}, ${g}, ${b}, ${opacity})`
  }

  // 如果是rgb格式，转换为rgba并添加透明度
  const rgbMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/)
  if (rgbMatch) {
    const [, r, g, b] = rgbMatch
    return `rgba(${r}, ${g}, ${b}, ${opacity})`
  }

  // 如果是十六进制格式，转换为rgba并添加透明度
  const hexMatch = color.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
  if (hexMatch) {
    const hex = hexMatch[1]
    let r, g, b

    if (hex.length === 3) {
      // 短格式 #RGB
      r = parseInt(hex[0] + hex[0], 16)
      g = parseInt(hex[1] + hex[1], 16)
      b = parseInt(hex[2] + hex[2], 16)
    } else {
      // 长格式 #RRGGBB
      r = parseInt(hex.substring(0, 2), 16)
      g = parseInt(hex.substring(2, 4), 16)
      b = parseInt(hex.substring(4, 6), 16)
    }

    return `rgba(${r}, ${g}, ${b}, ${opacity})`
  }

  // 其他情况（如颜色名称）使用白色替代
  return `rgba(255, 255, 255, ${opacity})`
}
