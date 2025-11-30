import type { Direction } from './type'

export const includesUnit = (target: string | number, units: string[]) => {
  for (const unit of units) {
    if (target.toString().includes(unit)) return true
  }
  return false
}

export const getPixelSize = (size: string, parentSize: number): number => {
  if (size.endsWith('px')) {
    return Number(size.replace('px', ''))
  }
  if (size.endsWith('%')) {
    return (Number(size.replace('%', '')) / 100) * parentSize
  }

  return typeof size === 'undefined' ? size : Number(size)
}

export const getOffset = (style: CSSStyleDeclaration, direction: 'horizontal' | 'vertical') => {
  if (direction === 'horizontal') {
    const paddingLeft = parseFloat(style.paddingLeft)
    const paddingRight = parseFloat(style.paddingRight)
    const borderLeftWidth = parseFloat(style.borderLeftWidth)
    const borderRightWidth = parseFloat(style.borderRightWidth)
    return paddingLeft + paddingRight + borderLeftWidth + borderRightWidth
  } else {
    const paddingTop = parseFloat(style.paddingTop)
    const paddingBottom = parseFloat(style.paddingBottom)
    const borderTopWidth = parseFloat(style.borderTopWidth)
    const borderBottomWidth = parseFloat(style.borderBottomWidth)
    return paddingTop + paddingBottom + borderTopWidth + borderBottomWidth
  }
}

export const getItemDirection = (direction: Direction) => {
  if (direction === 'vertical') {
    return ['bottom', 'top']
  } else {
    return ['right', 'left']
  }
}
