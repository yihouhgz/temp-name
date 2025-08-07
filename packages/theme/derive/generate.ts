import colorPalette from './palette'
import colorPaletteDark from './palette-dark'
import { type formatType } from './type'

type GenerateOptions = {
  dark?: boolean
  list?: boolean
  index?: number
  format?: formatType
}
export function generate(color: string, options: GenerateOptions = {}) {
  const { dark, list, index = 6, format = 'hex' } = options

  if (list) {
    const list = []
    const func = dark ? colorPaletteDark : colorPalette
    for (let i = 1; i <= 10; i++) {
      list.push(func(color, i, format))
    }
    return list
  }
  return dark
    ? colorPaletteDark(color, index, format)
    : colorPalette(color, index, format)
}
