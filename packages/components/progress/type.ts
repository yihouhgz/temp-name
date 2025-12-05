import type { PropType } from 'vue'
import type { VueNode } from '../_util/type'
import { prefix } from 'constants/config'

export const directions = ['horizontal', 'vertical'] as const
export type StrokeArray = Array<{ percent: number; color: string }>
export const DEFAULT_COLOR = `var(--${prefix}-color-success)`
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
    default: (percent: number) => percent + '%'
  },
  /**
   * 进度条 id
   */
  id: {
    type: String,
    default: ''
  },
  /**
   * 进度条轨道填充色
   */
  orbitStroke: {
    type: String,
    default: `var(--${prefix}-color-fill-0)`
  },
  /**
   * 进度百分比
   */
  percent: {
    type: Number,
    validator: (val: number) => val >= 0 && val <= 100,
    default: 0
  },
  /**
   * 环形进度条是否显示中间文本，条状进度条后右侧是否显示文本
   */
  showInfo: {
    type: Boolean,
    default: false
  },
  /**
   * 尺寸,可选default、small(仅 type=circle 生效)、large(仅 type=line 生效)
   */
  size: {
    type: String as PropType<'default' | 'small' | 'large'>,
    default: 'default'
  },
  /**
   * 进度条填充色，类型为 Array<{percent:number; color:string }> 时，color 参数支持颜色类型：'Hex' | 'Hsl' | 'Hsla' | 'Rgb' | 'Rgba' | 'Design Tokens'
   */
  stroke: {
    type: [String, Array] as PropType<string | StrokeArray>,
    default: () => DEFAULT_COLOR
  },
  /**
   * 是否自动生成渐变色补齐区间颜色，需要 stroke 设置至少一个颜色区间
   */
  strokeGradient: {
    type: Boolean,
    default: false
  },
  /**
   * 圆角round/方角square(仅在 type='circle'模式下生效)
   */
  strokeLinecap: {
    type: String as PropType<'round' | 'square'>,
    default: 'round'
  },
  /**
   * type 为circle时，该属性控制进度条宽度
   */
  strokeWidth: {
    type: Number,
    default: 4
  },
  /**
   * 进度条类型,可选line(条状进度条)、circle(环形进度条)
   */
  type: {
    type: String as PropType<'line' | 'circle'>,
    default: 'line'
  },
  /**
   * 环形进度条宽度，size='default'时为 72，'small'为 24
   */
  width: {
    type: Number,
    default: undefined
  }
}
