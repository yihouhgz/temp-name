import type { PropType } from 'vue'

export const dividerProps = {
  /**
   * @description 带内容时，内容对齐方式
   */
  align: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'center',
    value: ['left', 'center', 'right']
  },
  /**
   * @description 是否为虚线
   */
  dashed: {
    type: Boolean,
    default: false
  },
  /**
   * @description 分割线方向
   */
  layout: {
    type: String as PropType<'horizontal' | 'vertical'>,
    value: ['horizontal', 'vertical'],
    default: 'horizontal'
  },
  /**
   * @description 分割线上下 margin (垂直方向时为左右 margin)
   */
  margin: {
    type: [String, Number] as PropType<string | number>,
    default: '0'
  }
}
