export const watermarkProps = {
  /**
   * @description 水印图片的宽度
   */
  width: {
    type: Number,
    default: 100
  },
  /**
   * @description 水印图片的高度
   */
  height: {
    type: Number,
    default: 100
  },
  /**
   * @description 是否继承父元素样式
   */
  inherit: {
    type: Boolean,
    default: true
  },
  /**
   * @description 角度
   */
  rotate: {
    type: Number,
    default: 0
  },
  /**
   * @description 角度
   */
  zIndex: {
    type: Number,
    default: 1000
  },
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
