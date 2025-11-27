import type { PropType } from 'vue'
import { isBoolean } from '../_util'
import type { VueNode } from '../_util/type'
export const popoverProps = {
  /**
   * @description 是否自动调整弹出层展开方向，用于边缘遮挡时自动调整展开方向
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
   * @description 是否显示“小三角”
   */
  showArrow: {
    type: Boolean,
    default: false
  },
  /**
   * @description 点击弹出层及内部任一元素时是否自动关闭弹层
   */
  clickToHide: {
    type: Boolean,
    default: false
  },
  /**
   * @description trigger为hover时，不响应键盘聚焦弹出浮层事件
   */
  disableFocusListener: {
    type: Boolean,
    default: true
  },
  /**
   * @description 在 trigger 或 弹出层按 Esc 键是否关闭面板，受控时不生效
   */
  closeOnEsc: {
    type: Boolean,
    default: true
  },
  /**
   * @description 当焦点处于弹出层内时，切换 Tab 是否让焦点在弹出层内循环
   */
  guardFocus: {
    type: Boolean,
    default: true
  },
  /**
   * @description 按下 Esc 键后，焦点是否回到 trigger 上，设置 trigger 为 hover, focus, click 时生效
   */
  returnFocusOnClose: {
    type: Boolean,
    default: true
  },
  /**
   * @description 关闭时是否保留内部组件不销毁
   */
  keepDOM: {
    type: Boolean,
    default: false
  },
  /**
   * @description 方向，可选值：top,topLeft,topRight,left,leftTop,leftBottom,right,rightTop,rightBottom,bottom,bottomLeft,bottomRight
   */
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
    ] as const,
    default: 'bottom'
  },
  /**
   * @description 鼠标移入后，延迟显示的时间，单位毫秒（仅当 trigger 为 hover/focus 时生效）
   */
  mouseEnterDelay: {
    type: Number,
    default: 50
  },
  /**
   * @description 鼠标移出后，延迟隐藏的时间，单位毫秒（仅当 trigger 为 hover/focus 时生效）
   */
  mouseLeaveDelay: {
    type: Number,
    default: 50
  },
  /**
   * @description 触发元素重新定位的 key
   */
  rePosKey: {
    type: [String, Number],
    default: ''
  },
  /**
   * @description 是否阻止弹出层上的点击事件冒泡
   */
  stopPropagation: {
    type: Boolean,
    default: false
  },
  content: {
    type: [String, Object, Function, null] as PropType<VueNode | (() => VueNode)>,
    default: undefined
  },
  getPopupContainer: {
    type: [Function] as PropType<(el: HTMLElement) => HTMLElement>,
    default: () => () => document.body
  },
  trigger: {
    values: ['hover', 'focus', 'click', 'custom', 'contextMenu'],
    default: 'hover'
  },
  // if trigger == custom effect
  visible: {
    type: Boolean,
    default: false
  },

  zIndex: {
    type: Number,
    default: 1030
  },
  /**
   * @description 弹出层计算溢出时的增加的冗余值
   */
  margin: {
    type: Array as PropType<number[]>,
    default: () => [0, 0, 0, 0]
  },
  /**
   * @description 弹出层与 children 元素的距离，单位 px 4(showArrow=false 时) 10(showArrow=true 时)
   */
  spacing: {
    type: [Number, Object] as PropType<number | { x: number; y: number }>,
    default: 4
  },
  /**
   * @description 是否禁用弹出层 custom不受控制
   */
  disabled: {
    type: Boolean,
    default: false
  }
}

export const popoverEmits = {
  /**
   * @description 弹出层展示/隐藏时触发的回调
   */
  visibleChange: (visible: boolean) => isBoolean(visible),
  /**
   * @description 点击弹出层外部时触发的回调
   */
  clickOutSide: (e: Event) => e instanceof Event,
  /**
   * @description 在 trigger 或弹出层按 Esc 键时调用
   */
  escKeyDown: (e: Event) => e instanceof Event
}
