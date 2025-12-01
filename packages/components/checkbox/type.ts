import type { PropType, ExtractPublicPropTypes } from 'vue'
import type { VueNode } from '../_util/type'
import { isArray, isBoolean } from '../_util'

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
    default: undefined
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
  value: {
    default: undefined
  },
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
  },
  modelValue: {
    type: Boolean,
    default: false
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

export type OptionsType = ExtractPublicPropTypes<typeof checkboxProps> & { label: string }

export const checkboxGroupProps = {
  /**
   * @description 组内默认选中的选项，会与Checkbox的value值做匹配
   */
  defaultValue: {
    type: Array as PropType<unknown[]>,
    default: () => []
  },
  /**
   * @description 选项的排列方向，可选值为: vertical、horizontal
   */
  direction: {
    type: String as PropType<'vertical' | 'horizontal'>,
    values: ['vertical', 'horizontal'] as const,
    default: 'vertical'
  },
  /**
   * @description 是否禁用所有选项
   */
  disabled: {
    type: Boolean,
    default: false
  },
  /**
   * @description CheckboxGroup 下所有 input[type="checkbox"] 的 name 属性
   */
  name: {
    type: String,
    default: ''
  },
  /**
   * @description 是指定可选项
   */
  options: {
    type: Array as PropType<OptionsType[]>,
    default: () => []
  },
  /**
   * @description 设置所有 checkbox 的样式类型，可选值为: default、card、pureCard
   */
  type: {
    type: String as PropType<CheckboxType>,
    default: checkboxType[0]
  },
  /**
   * @description 组内选中的选项，会与Checkbox的value值做匹配
   */
  value: {
    type: Array as PropType<unknown[]>,
    default: () => []
  },
  modelValue: {
    type: Array as PropType<unknown[]>,
    default: () => []
  }
}

export const checkboxGroupEmits = {
  /**
   * @description 选中值发生变化时触发
   */
  'update:modelValue': (value: unknown[]) => isArray(value),
  change: (value: unknown[]) => isArray(value)
}
