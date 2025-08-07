import Color from 'color'
import { getColorString } from './utils'
import type { formatType, ColorType } from './type'
// 动态梯度算法
function colorPalette(originColor: ColorType, i: number, format: formatType) {
  const color = Color(originColor)
  const h = color.hue()
  const s = color.saturationv()
  const v = color.value()

  const hueStep = 2
  const maxSaturationStep = 100
  const minSaturationStep = 9

  const maxValue = 100
  const minValue = 30

  function getNewHue(isLight: boolean, i: number) {
    let hue
    if (h >= 60 && h <= 240) {
      hue = isLight ? h - hueStep * i : h + hueStep * i
    } else {
      hue = isLight ? h + hueStep * i : h - hueStep * i
    }
    if (hue < 0) {
      hue += 360
    } else if (hue >= 360) {
      hue -= 360
    }
    return Math.round(hue)
  }

  function getNewSaturation(isLight: boolean, i: number) {
    let newSaturation

    if (isLight) {
      newSaturation =
        s <= minSaturationStep ? s : s - ((s - minSaturationStep) / 5) * i
    } else {
      newSaturation = s + ((maxSaturationStep - s) / 4) * i
    }
    return newSaturation
  }

  function getNewValue(isLight: boolean, i: number) {
    return isLight
      ? v + ((maxValue - v) / 5) * i
      : v <= minValue
        ? v
        : v - ((v - minValue) / 4) * i
  }

  const isLight = i < 6
  const index = isLight ? 6 - i : i - 6

  const retColor =
    i === 6
      ? color
      : Color({
          h: getNewHue(isLight, index),
          s: getNewSaturation(isLight, index),
          v: getNewValue(isLight, index)
        })

  return getColorString(retColor, format)
}

export default colorPalette
