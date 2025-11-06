import type { PropType } from 'vue'
import type { VNode } from 'vue'

export type ConfigType = {
  //弹出位置 bottom
  bottom: number | string
  //弹出位置 top
  top: number | string
  //弹出位置 left
  left: number | string
  //弹出位置 right
  right: number | string
  //弹层 z-index 值
  zIndex: number
  //填充样式，支持 light, normal
  theme: 'light' | 'normal'
  //自动关闭的延时，单位 s，设为 0 时不自动关闭
  duration: number
  //指定父级 DOM，弹层将会渲染至该 DOM 中，自定义需要设置 container 和 内部的 .prefix-toast-wrapper position: relative, 这会改变浮层 DOM 树位置，但不会改变视图渲染位置。
  getPopupContainer: () => HTMLElement | null
}

export const defaultConfig: ConfigType = {
  bottom: 0,
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1010,
  theme: 'normal',
  duration: 3,
  getPopupContainer: () => document.body
}

export type OptionsType = {
  //提示内容
  content: string | VNode | (() => VNode) | null
  //自定义图标
  icon: string | VNode | (() => VNode) | null
  //是否展示关闭按钮
  showClose: boolean
  //内容的最大宽度
  textMaxWidth: number | string
  //toast 关闭的回调函数
  onClose: () => void
  //是否堆叠 Toast
  stack: boolean
  //自定义 ToastId
  id: string | number
}
export const defaultOptions: OptionsType = {
  content: '',
  icon: null,
  showClose: true,
  textMaxWidth: 450,
  onClose: () => {},
  stack: false,
  id: ''
}

export const wrapperPorpos = {
  /**
   * @description 弹层 z-index 值
   */
  zIndex: {
    type: Number,
    default: defaultConfig.zIndex
  },
  /**
   * @description 弹层id
   */
  id: {
    type: [String, Number],
    default: ''
  },
  /**
   * @description 弹层容器
   */
  getPopupContainer: {
    type: Function as PropType<() => HTMLElement | null>,
    default: () => defaultConfig.getPopupContainer
  }
}

export type ToastType = 'success' | 'warning' | 'info' | 'error'
export const toastTypeMap: Record<ToastType, string> = {
  success: 'success',
  warning: 'warning',
  info: 'info',
  error: 'error'
}
export const toastProps = {
  type: {
    values: ['success', 'warning', 'info', 'error'],
    required: true
  },
  content: {
    type: [String, Object, Function, null] as PropType<string | VNode | (() => VNode) | null>,
    default: null,
    required: false
  },
  icon: {
    type: [String, Object, Function, null] as PropType<string | VNode | (() => VNode) | null>,
    default: null,
    required: false
  },
  showClose: {
    type: Boolean,
    default: true,
    required: false
  },
  textMaxWidth: {
    type: [Number, String],
    default: 450,
    required: false
  },
  id: {
    type: [String, Number],
    default: '',
    required: false
  }
}
