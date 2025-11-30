import type { PropType } from 'vue'
import type { VueNode } from '../_util/type'
import { isBoolean } from '../_util'

export const checkboxType = ['default', 'card', 'pureCard'] as const
export type CheckboxType = (typeof checkboxType)[number]

export const checkboxProps = {
  /**
   * @description addon 节点 id，aria-labelledby 指向这个 id，若无设置会随机生成一个 id
   */
  addonId: {
    type: String,
    default: ''
  },
  /**
   * @description 定义 Checkbox 的作用
   */
  ariaLabel: {
    type: String,
    default: ''
  },
  /**
   * @description 指定当前Checkbox是否选中（在Group中使用时无效）
   */
  checked: {
    type: Boolean,
    default: false
  },
  /**
   * @description 设置checkbox 的样式类型，可选值为: default、card、pureCard
   */
  type: {
    type: String as PropType<CheckboxType>,
    default: checkboxType[0]
  },
  /**
   * @description 指定当前Checkbox初始是否选中（在Group中使用时无效）
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
   * @description 副文本
   */
  extra: {
    type: [String, Object, Function, null] as PropType<VueNode>,
    default: null
  },
  /**
   * @description 副文本的 id，aria-describedby 指向这个 id，若无设置会随机生成一个 id
   */
  extraId: {
    type: String,
    default: ''
  },
  /**
   * @description 该checkbox在CheckboxGroup中代表的value
   */
  value: {},
  /**
   * @description 设置 indeterminate 状态，只负责样式控制
   */
  indeterminate: {
    type: Boolean,
    default: false
  },
  /**
   * @description 指示浏览器是否应滚动文档以显示新聚焦的元素，作用于组件内的 focus 方法
   */
  preventScroll: {
    type: Boolean,
    default: true
  }
}

export const checkboxEmits = {
  'update:modelValue': (value: boolean) => isBoolean(value),
  /**
   * @description 点击时回调函数
   */
  click: (e: Event) => e instanceof Event,
  /**
   * @description 变化时回调函数
   */
  change: (value: boolean) => isBoolean(value)
}
