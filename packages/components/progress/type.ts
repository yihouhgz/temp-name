import type { PropType } from 'vue'
import type { VueNode } from '../_util/type'
import { prefix } from 'constants/config'

export const directions = ['horizontal', 'vertical'] as const
export const progressProps = {
  /**
   * aria-label属性，用来给当前元素加上的标签描述, 用于提升可访问性
   */
  'aria-label': {
    type: String,
    default: ''
  },
  /**
   * aria-labelledby属性，表明某些元素的 id 是当前元素的标签。它被用来确定控件或控件组与它们标签之间的联系, 提升可访问性
   */
  'aria-labelledby': {
    type: String,
    default: ''
  },
  /**
   * aria-valuetext属性，用于提升可访问性
   */
  'aria-valuetext': {
    type: String,
    default: ''
  },
  /**
   * 条状进度条方向 horizontal、vertical
   */
  direction: {
    type: String as PropType<(typeof directions)[number]>,
    values: directions,
    default: 'horizontal'
  },
  /**
   * 格式化函数，入参为当前百分比，return 的结果将会直接渲染在圆形进度条中心
   */
  format: {
    type: Function as PropType<(percent: number) => VueNode>,
    default: () => (percent: number) => percent + '%'
  },
  /**
   * 进度条 id
   */
  id: {
    type: String,
    default: ''
  },
  /**
   * 进度条轨道宽度
   */
  orbitStroke: {
    type: String,
    default: `var(--${prefix}-color-fill-0)`
  },
  /**
   * 进度条宽度
   */
  percent: {
    type: Number,
    default: 0
  }
}
