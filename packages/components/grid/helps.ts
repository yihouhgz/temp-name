import { isNumber, isArray } from '../_util/helps'
import consola from '../_util/console'
import type { Guttertype } from './row'
export const getGutter = (gutter: Guttertype, scope: boolean = false) => {
  const trend = scope ? -1 : 1
  const attrName = scope ? 'padding' : 'margin'
  if (isNumber(gutter)) {
    return {
      [`${attrName}Left`]: (-gutter / 2) * trend + 'px',
      [`${attrName}Right`]: (-gutter / 2) * trend + 'px'
    }
  } else if (isArray(gutter)) {
    const [gutterX, gutterY] = gutter
    if (!isNumber(gutterX)) {
      consola.error('gutterX must be a number')
    }
    if (!isNumber(gutterY)) {
      consola.error('gutterY must be a number')
    }
    return {
      [attrName]: `${(-gutterY / 2) * trend}px ${(-gutterX / 2) * trend}px`
    }
  }
  //对象响应式处理 todo
  return {}
}
