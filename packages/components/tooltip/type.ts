import type { PropType, VNode } from 'vue'
export const positionValues = [
  'top',
  'topLeft',
  'topRight',
  'left',
  'leftTop',
  'leftBottom',
  'right',
  'rightTop',
  'rightBottom',
  'bottom',
  'bottomLeft',
  'bottomRight'
] as const
export const tooltioProps = {
  /**
   * @description 弹出层被遮挡时是否自动调整方向
   */
  autoAdjustOverflow: {
    type: Boolean,
    default: true,
    required: false
  },
  /**
   * @description 小三角”是否指向元素中心，需要同时传入"showArrow=true
   */
  arrowPointAtCenter: {
    type: Boolean,
    default: true,
    required: false
  },
  /**
   * @description 是否显示箭头三角形
   */
  showArrow: {
    type: Boolean,
    default: true,
    required: false
  },
  /**
   * @description 是否阻止弹层上的点击事件冒泡
   */
  stopPropagation: {
    type: Boolean,
    default: false,
    required: false
  },
  /**
   * @description 是否从包裹的元素水平或垂直中心处变换，该参数仅影响动效变换的 transform-origin，一般无需改动
   */
  transformFromCenter: {
    type: Boolean,
    default: true,
    required: false
  },
  /**
   * @description 弹层出现的位置
   */
  position: {
    values: positionValues,
    default: 'top',
    required: false
  },
  content: {
    type: [String, Object, Function, null] as PropType<string | VNode | (() => VNode) | null>,
    default: undefined
  },
  getPopupContainer: {
    type: [Function] as PropType<(el: HTMLElement) => HTMLElement>,
    default: () => () => document.body,
    required: false
  },
  trigger: {
    values: ['hover', 'focus', 'click', 'custom', 'contextMenu'],
    default: 'hover',
    required: false
  },
  // if trigger == custom effect
  visible: {
    type: Boolean,
    default: false,
    required: false
  },
  wrapper: {
    type: [Boolean, String],
    default: false,
    required: false
  },
  clickToHide: {
    type: Boolean,
    default: false,
    required: false
  },
  spacing: {
    type: [Number, Object] as PropType<number | { x: number; y: number }>,
    default: 8,
    required: false
  },
  motion: {
    type: Boolean,
    default: true,
    required: false
  },
  margin: {
    type: Array as PropType<number[]>,
    default: () => [0, 0, 0, 0],
    required: false
  },
  zIndex: {
    type: Number,
    default: 1000,
    required: false
  }
}
export type Position = (typeof positionValues)[number]

export const tooltipEmits = {
  /**
   * @description 弹出层展示/隐藏时触发的回调
   */
  visibleChange: (visible: boolean) => void visible,
  /**
   * @description 当弹出层处于展示状态，点击非Children、非浮层内部区域时的回调（仅trigger为custom、click时有效）
   */
  clickOutSide: (e: Event) => void e
}
