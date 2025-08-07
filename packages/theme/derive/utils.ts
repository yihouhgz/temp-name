import Color from 'color'

import type { formatType, ColorType, ColorInstance } from './type'
const formats: formatType[] = ['hex', 'rgb', 'hsl']
export const getRgbStr = (color: ColorType) => {
  const colorInstance = Color(color).rgb().round()
  return colorInstance.color.join(',')
}

function getFormat(format: formatType): formatType {
  if (!format || formats.indexOf(format) < 0) {
    return 'hex'
  }
  return format
}

export const getColorString = (color: ColorInstance, format: formatType) => {
  const innerFormat = getFormat(format)

  if (innerFormat === 'hex') {
    return color[innerFormat]()
  }
  return color[innerFormat]().round().string()
}
