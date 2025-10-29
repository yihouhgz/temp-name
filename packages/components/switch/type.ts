import type { PropType, VNode } from 'vue'
import { isBoolean } from '../_util'

export const switchProps = {
  modelValue: {
    modelValue: String,
    default: undefined
  },
  /**
   * @description 指示当前是否选中,配合 onChange 使用
   */
  checked: {
    type: Boolean,
    default: undefined
  },
  /**
   * @description 默认是否选中
   */
  defaultChecked: {
    type: Boolean,
    default: false
  },
  /**
   * @description 禁用
   */
  disabled: {
    type: Boolean,
    default: false
  },
  /**
   * @description 打开时展示的内容, size 为 small 时无效
   */
  checkedText: {
    type: [String, Object, Function, null] as PropType<string | VNode | (() => VNode) | null>,
    default: null
  },
  /**
   * @description 关闭时展示的内容, size 为 small 时无效
   */
  uncheckedText: {
    type: [String, Object, Function, null] as PropType<string | VNode | (() => VNode) | null>,
    default: null
  },
  /**
   * @description 开启时展示的旋钮内容
   */
  checkedKnob: {
    type: [String, Object, Function, null] as PropType<string | VNode | (() => VNode) | null>,
    default: null
  },
  /**
   * @description 关闭时展示的旋钮内容
   */
  uncheckedKnob: {
    type: [String, Object, Function, null] as PropType<string | VNode | (() => VNode) | null>,
    default: null
  },
  /**
   * @description 尺寸
   */
  size: {
    values: ['small', 'default', 'large'],
    default: 'default'
  },
  /**
   * @description 设置加载状态
   */
  loading: {
    type: Boolean,
    default: undefined
  }
}

export const switchEmits = {
  /**
   * @description v-model 语法糖
   */
  'update:modelValue': (value: boolean) => isBoolean(value),

  /**
   * @description 点击时回调函数
   */
  click: (e: Event) => e instanceof Event,

  /**
   * @description 变化时回调函数
   */
  change: (value: boolean) => isBoolean(value),

  /**
   * @description 鼠标移入时回调函数
   */
  mouseEnter: (e: Event) => e instanceof Event,

  /**
   * @description 鼠标移出时回调函数
   */
  mouseLeave: (e: Event) => e instanceof Event
}
