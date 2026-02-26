import type { CSSProperties, PropType } from 'vue'
import { isArray, isNumber } from '../_util'
export const sliderProps = {
  /**
   * @description 设置初始取值
   */
  defaultValue: {
    type: [Number, Array] as PropType<number | number[]>,
    default: 0
  },
  /**
   * @description 滑块是否禁用
   */
  disabled: {
    type: Boolean,
    default: false
  },
  /**
   * @description 滑块是否带有圆点
   */
  handleDot: {
    type: [Object, Array] as PropType<
      { color: string; size: string } | { color: string; size: string }[]
    >
  },
  /**
   * @description marks不为空对象时有效，值为true时表示值为包含关系，false表示并列
   */
  included: {
    type: Boolean,
    default: true
  },
  /**
   * @description 刻度，key的类型必须为number且取值在闭区间[min, max]内
   */
  marks: {
    type: Object as PropType<Record<number, string>>
  },
  /**
   * @description 最大值
   */
  max: {
    type: Number,
    default: 100
  },
  /**
   * @description 最小值
   */
  min: {
    type: Number,
    default: 0
  },
  /**
   * @description 滑块轨道的样式
   */
  railStyle: {
    type: Object as PropType<CSSProperties>
  },
  /**
   * @description 是否支持两边同时可滑动
   */
  range: {
    type: Boolean,
    default: false
  },
  /**
   * @description tooltip是否带箭头
   */
  showArrow: {
    type: Boolean,
    default: true
  },
  /**
   * @description 是否在hover时展示最大值最小值
   */
  showBoundary: {
    type: Boolean,
    default: false
  },
  /**
   * @description 是否隐藏标签，2.48.0版本新增
   */
  showMarkLabel: {
    type: Boolean,
    default: true
  },
  /**
   * @description 步长
   */
  step: {
    type: Number,
    default: 1
  },
  /**
   * @description 设置Tooltip的展示格式，默认显示当前选值
   */
  tipFormatter: {
    type: Function as PropType<
      (value: string | number | boolean | (string | number | boolean)[]) => unknown
    >,
    default: (v: unknown) => v
  },
  /**
   * @description 滑轨上的mark是否带有tooltip
   */
  tooltipOnMark: {
    type: Boolean,
    default: false
  },
  /**
   * @description 是否始终显示Tooltip
   */
  tooltipVisible: {
    type: Boolean
  },
  /**
   * @description 设置当前取值
   */
  value: {
    type: [Number, Array] as PropType<number | number[]>
  },
  /**
   * @description 是否设置方向为垂直
   */
  vertical: {
    type: Boolean,
    default: false
  },
  /**
   * @description 反转垂直方向，即上大下小
   */
  verticalReverse: {
    type: Boolean,
    default: false
  },
  /**
   * @description 用于给滑块的当前值提供一个用户友好的名称，对屏幕阅读器用户很重要，参数value为当前滑块的值，index为当前滑块的顺序
   */
  getAriaValueText: {
    type: Function as PropType<(value: number, index?: number) => string>
  },
  /**
   * @description aria-label属性，用来给当前元素加上的标签描述，提升可访问性
   */
  'aria-label': {
    type: String
  },
  /**
   * @description aria-labelledby属性，表明某些元素的id是某一对象的标签。它被用来确定控件或控件组与它们标签之间的联系，提升可访问性
   */
  'aria-labelledby': {
    type: String
  },
  /**
   * @description aria-valuetext属性，为滑块的当前值提供用户友好的名称
   */
  'aria-valuetext': {
    type: String
  }
}

export const sliderEmits = {
  /**
   * @description 值变化后触发，把当前值作为参数传入
   */
  afterChange: (value: number | number[]) => isNumber(value) || isArray(value),
  /**
   * @description 当Slider的值发生改变时的回调
   */
  change: (value: number | number[]) => isNumber(value) || isArray(value),
  /**
   * @description 鼠标松开滑块时触发
   */
  mouseUp: (e: MouseEvent) => e instanceof MouseEvent
}
