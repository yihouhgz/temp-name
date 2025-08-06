import { withDefaults, defineProps } from 'vue'

export const watermarkProps = {
  width: 120,
  height: 64,
  inherit: true,
  rotate: -22,
  zIndex: 9,
  image: '',
  content: '',
  font: () => ({
    fontSize: 16,
    fontFamily: 'sans-serif',
    fontWeight: 'normal',
    fontStyle: 'normal',
    color: 'rgba(0, 0, 0, 0.15)',
    textAlign: 'center'
  }),
  gap: () => [100, 100],
  offset: () => [100 / 2, 100 / 2]
}

export interface WatermarkProps {
  width: number
  height: number
  inherit: boolean
  rotate: number
  zIndex: number
  image: string
  content: string
  font: FontParamsType
  gap: [number, number]
  offset: [number, number]
}
export type FontParamsType = {
  color: string
  fontSize: number
  fontWeight: 'normal' | 'light' | 'weight' | number
  fontFamily: string
  fontStyle: 'none' | 'normal' | 'italic' | 'oblique'
  textAlign: TextAlignType
}
export type TextAlignType = 'left' | 'center' | 'right' | 'start' | 'end'
