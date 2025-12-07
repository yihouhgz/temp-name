import type { PropType } from 'vue'
import { strings } from './constants'
import type { VueNode } from '../_util/type'
import { isNumber, isString } from '../_util'
type NotificationType = (typeof strings.notificationType)[keyof typeof strings.notificationType]
type Position = (typeof strings.position)[keyof typeof strings.position]

export type OptionsType = {
  content: string | VueNode | (() => VueNode) | null
  duration?: number
  getPopupContainer?: () => HTMLElement
  icon?: string | VueNode | (() => VueNode) | null
  id?: string | number
  position?: Position
  showClose?: boolean
  theme?: (typeof strings.theme)[keyof typeof strings.theme]
  title?: string | VueNode | (() => VueNode) | null
  zIndex?: number
  onClick?: (e: Event) => void
  onClose?: () => void
  onCloseClick?: (id: string | number) => void
}

//全局配置在调用前提前配置，全局一次生效
export type ConfigOptiosnType = {
  bottom?: number | string
  duration?: number
  left?: number | string
  position?: Position
  top?: number | string
  right?: number | string
  zIndex?: number
}

export const NotificationProps = {
  /**
   * @property 通知类型
   */
  type: {
    type: String as PropType<NotificationType>,
    values: Object.values(strings.notificationType),
    default: strings.notificationType.default
  },
  /**
   * @property 通知内容
   */
  content: {
    type: [String, Object, Function, null] as PropType<VueNode>,
    default: ''
  },
  /**
   * @property 自动关闭的延时，单位 s，设为 0 时不自动关闭
   */
  duration: {
    type: Number,
    default: 3
  },
  /**
   * @property 指定父级 DOM，弹层将会渲染至该 DOM 中，自定义需要设置 position: relative 这会改变浮层 DOM 树位置，但不会改变视图渲染位置。
   */
  getPopupContainer: {
    type: Function as PropType<() => HTMLElement>,
    default: () => () => document.body
  },
  /**
   * @property 左上角 icon
   */
  icon: {
    type: [String, Object, Function, null] as PropType<VueNode>,
    default: undefined
  },
  /**
   * @property 弹出位置，可选 top、bottom、topLeft、topRight、bottomLeft、bottomRight
   */
  position: {
    type: String as PropType<Position>,
    values: Object.values(strings.position),
    default: strings.position.topRight
  },
  /**
   * @property 是否显示关闭按钮
   */
  showClose: {
    type: Boolean,
    default: true
  },
  /**
   * @property 主题，可选 light、normal
   */
  theme: {
    type: String as PropType<(typeof strings.theme)[keyof typeof strings.theme]>,
    values: Object.values(strings.theme),
    default: strings.theme.normal
  },
  /**
   * @property 标题
   */
  title: {
    type: [String, Object, Function, null] as PropType<VueNode>,
    default: ''
  },
  /**
   * @property 弹层 z-index 值
   */
  zIndex: {
    type: Number,
    default: 1010
  }
}
export const notificationEmits = {
  /**
   * @description 点击通知的回调函数
   */
  click: (e: Event) => e instanceof Event,
  /**
   * @description 通知关闭的回调函数(主动关闭、延时到达关闭都会触发)
   */
  close: () => {},
  /**
   * @description 点击关闭按钮的回调函数
   */
  closeClick: (id: string | number) => isString(id) || isNumber(id)
}
