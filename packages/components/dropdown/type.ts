import type { PropType } from 'vue'
import { positionValues, type Position } from '../tooltip/type'
import type { VueNode } from '../_util/type'
import { isBoolean } from '../_util'

export type DropdownMenuItem = {
  node: 'title' | 'item' | 'divider'
  name?: string
}

export const dropdownProps = {
  /**
   * @property 弹出层被遮挡时是否自动调整方向
   */
  autoAdjustOverflow: {
    type: Boolean,
    default: true
  },
  /**
   * @property 	在 trigger 或 弹出层按 Esc 键是否关闭面板，受控时不生效
   */
  closeOnEsc: {
    type: Boolean,
    default: true
  },
  /**
   * @property 在弹出层内点击时是否自动关闭弹出层
   */
  clickToHide: {
    type: Boolean,
    default: false
  },
  /**
   * @property 下拉菜单根元素类名
   */
  contentClassName: {
    type: String,
    default: ''
  },
  /**
   * @property trigger为hover时，不响应键盘聚焦弹出浮层事件
   */
  disableFocusListener: {
    type: Boolean,
    default: false
  },
  /**
   * @private 指定父级 DOM，弹层将会渲染至该 DOM 中，自定义需要设置 position: relative 这会改变浮层 DOM 树位置，但不会改变视图渲染位置。
   */
  getPopupContainer: {
    type: Function as PropType<(node: HTMLElement) => HTMLElement>,
    default: () => document.body
  },
  /**
   * @property 关闭时是否保留内部组件 DOM 不销毁
   */
  keepDOM: {
    type: Boolean,
    default: false
  },
  /**
   * @property 弹出层计算溢出时的增加的冗余值，作用同 Tooltip margin
   */
  margin: {
    type: Array as PropType<number[]>,
    default: () => [0, 0, 0, 0]
  },
  /**
   * @property 鼠标移入 Trigger 后，延迟显示的时间，单位毫秒（仅当 trigger 为 hover/focus 时生效）
   */
  mouseEnterDelay: {
    type: Number,
    default: 50
  },
  /**
   * @property 鼠标移出弹出层后，延迟消失的时间，单位毫秒（仅当 trigger 为 hover/focus 时生效）
   */
  mouseLeaveDelay: {
    type: Number,
    default: 50
  },
  /**
   * @property 通过传入 JSON Array 来快速配置 Dropdown 内容
   */
  menu: {
    type: Array as PropType<Array<DropdownMenuItem>>,
    default: () => []
  },
  /**
   * @property 弹出菜单的位置
   */
  position: {
    type: String as PropType<Position>,
    values: positionValues,
    default: 'bottom'
  },
  /**
   * @property 弹出层的内容，由 Dropdown.Menu 及 Dropdown.Item、Dropdown.Title 构成
   */
  render: {
    type: [String, Object, Function] as PropType<VueNode>,
    default: undefined
  },
  /**
   * @property 可以更新该项值手动触发弹出层的重新定位
   */
  rePosKey: {
    type: [String, Number],
    default: ''
  },
  /**
   * @property 弹出层与 Trigger 元素（即 Dropdown children）的距离，单位 px
   */
  spacing: {
    type: Number,
    default: 4
  },
  /**
   * @property 是否自动在 active 的 Dropdown.Item 项左侧展示表示选中的勾
   */
  showTick: {
    type: Boolean,
    default: false
  },
  /**
   * @property 是否阻止弹出层上的点击事件冒泡
   */
  stopPropagation: {
    ype: Boolean,
    default: false
  },
  /**
   * @property 触发下拉的行为，可选 "hover", "focus", "click", "custom", "contextMenu"
   */
  trigger: {
    values: ['hover', 'focus', 'click', 'custom', 'contextMenu'] as const,
    default: 'hover'
  },
  /**
   * @property 是否显示菜单，需配合 trigger custom 使用
   */
  visible: {
    type: Boolean,
    default: undefined
  },
  /**
   * @property 弹出层 z-index 值
   */
  zIndex: {
    type: Number,
    default: 1050
  }
}

export const dropdownEmits = {
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
  escKeyDown: (e: Event) => e instanceof Event
}
