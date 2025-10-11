import type { PropType, VNode } from 'vue'
import { isBoolean } from '../_util'
export const popoverProps = {
  /**
   * @description 是否自动调整弹出层展开方向，用于边缘遮挡时自动调整展开方向
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
   * @description 是否显示“小三角”
   */
  showArrow: {
    type: Boolean,
    default: false,
    required: false
  },
  /**
   * @description 点击弹出层及内部任一元素时是否自动关闭弹层
   */
  clickToHide: {
    type: Boolean,
    default: false,
    required: false
  },
  position: {
    values: [
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
    ],
    default: 'top',
    required: false
  },
  /**
   * @description 是否阻止弹出层上的点击事件冒泡
   */
  stopPropagation: {
    type: Boolean,
    default: false,
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

  zIndex: {
    type: Number,
    default: 1000,
    required: false
  },
  /**
   * @description 弹出层计算溢出时的增加的冗余值
   */
  margin: {
    type: Array as PropType<number[]>,
    default: () => [0, 0, 0, 0],
    required: false
  },
  /**
   * @description 弹出层与 children 元素的距离，单位 px
   */
  spacing: {
    type: [Number, Object] as PropType<number | { x: number; y: number }>,
    default: 8,
    required: false
  }
}

export const popoverEmits = {
  visibleChange: (visible: boolean) => isBoolean(visible),
  clickOutSide: (e: Event) => e instanceof Event
}
