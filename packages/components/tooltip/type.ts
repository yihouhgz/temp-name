import type { PropType, VNode } from 'vue'
import { prefix } from 'constants/config'
import { isBoolean } from '../_util'
import type { VNodeType } from '../_util'
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
    default: true
  },
  /**
   * @description 小三角”是否指向元素中心，需要同时传入"showArrow=true
   */
  arrowPointAtCenter: {
    type: Boolean,
    default: true
  },
  /**
   * @description 是否显示箭头三角形
   */
  showArrow: {
    type: Boolean,
    default: true
  },
  /**
   * @description 是否阻止弹层上的点击事件冒泡
   */
  stopPropagation: {
    type: Boolean,
    default: false
  },
  /**
   * @description 是否从包裹的元素水平或垂直中心处变换，该参数仅影响动效变换的 transform-origin，一般无需改动
   */
  transformFromCenter: {
    type: Boolean,
    default: true
  },
  /**
   * @description 弹出层展示位置，可选值：top, topLeft, topRight, left, leftTop, leftBottom, right, rightTop, rightBottom, bottom, bottomLeft, bottomRight
   */
  position: {
    values: positionValues,
    default: 'top',
    required: false
  },
  /**
   * @description 弹层内容
   */
  content: {
    type: [String, Object, Function, null] as PropType<string | VNode | (() => VNode) | null>,
    default: undefined
  },
  /**
   * @description 指定父级 DOM，弹层将会渲染至该 DOM 中，自定义需要设置 position: relative 这会改变浮层 DOM 树位置，但不会改变视图渲染位置。
   */
  getPopupContainer: {
    type: [Function] as PropType<(el: HTMLElement) => HTMLElement>,
    default: () => () => document.body
  },
  /**
   * @description 关闭时是否保留内部组件不销毁
   */
  keepDOM: {
    type: Boolean,
    default: false
  },
  trigger: {
    values: ['hover', 'focus', 'click', 'custom', 'contextMenu'] as const,
    default: 'hover'
  },
  /**
   * @description trigger为hover时，不响应键盘聚焦弹出浮层事件
   */
  disableFocusListener: {
    type: Boolean,
    default: false
  },
  // if trigger == custom effect
  visible: {
    type: Boolean,
    default: false
  },
  /**
   * @description 当 children 为 disabled ，或者 children 为多个元素时，外层将会包裹一层 span 元素，该 api 用于设置此 span 的样式类名
   */
  wrapperClassName: {
    type: String,
    default: ''
  },
  /**
   * @description 弹出层 wrapper 节点的 id，trigger 的 aria 属性指向此 id，若不设置组件会随机生成一个 id
   */
  wrapperId: {
    type: String,
    default: ''
  },
  /**
   * @description 弹出层 wrapper div 的 className 前缀，设置该项时，弹出层将不再带 Tooltip 的样式
   */
  prefixCls: {
    type: String,
    default: prefix + '-tooltip'
  },
  /**
   * @description 点击弹出层及内部任一元素时是否自动关闭弹层
   */
  clickToHide: {
    type: Boolean,
    default: false
  },
  /**
   * @description 弹出层与 children 元素的距离，单位 px
   */
  spacing: {
    type: [Number, Object] as PropType<number | { x: number; y: number }>,
    default: 8
  },
  /**
   * @description 是否展示弹出层动画
   */
  motion: {
    type: Boolean,
    default: true
  },
  /**
   * @description 计算溢出时的增加的冗余值
   */
  margin: {
    type: Array as PropType<number[]>,
    default: () => [0, 0, 0, 0]
  },
  /**
   * @description 鼠标移入后，延迟显示的时间，单位毫秒（仅当 trigger 为 hover/focus 时生效）
   */
  mouseEnterDelay: {
    type: Number,
    default: 50
  },
  /**
   * @description 鼠标移出后，延迟消失的时间，单位毫秒（仅当 trigger 为 hove/focus 时生效），不小于 mouseEnterDelay
   */
  mouseLeaveDelay: {
    type: Number,
    default: 50
  },
  zIndex: {
    type: Number,
    default: 1000,
    required: false
  },
  /**
   * @description 指示浏览器是否应滚动文档以显示新聚焦的元素，作用于组件内的 focus 方法
   */
  preventScroll: {
    type: Boolean,
    default: false
  },
  /**
   * @description 可以更新该项值手动触发弹出层的重新定位
   */
  rePosKey: {
    type: [Number, String],
    default: ''
  },

  /**
   * @description 三角形
   */
  _arrow: {
    type: Object as unknown as PropType<{
      vertical: VNodeType
      horzontal: VNodeType
    }>,
    default: () => undefined
  }
}
export type Position = (typeof positionValues)[number]

export const tooltipEmits = {
  /**
   * @description 弹出层展示/隐藏时触发的回调
   */
  visibleChange: (visible: boolean) => isBoolean(visible),
  /**
   * @description 当弹出层处于展示状态，点击非Children、非浮层内部区域时的回调（仅trigger为custom、click时有效）
   */
  clickOutSide: (e: Event) => e instanceof Event,

  /**
   * @description 在 trigger 或 弹出层按 Esc 键时调用
   */
  escKeyDown: (e: KeyboardEvent) => e instanceof KeyboardEvent
}
