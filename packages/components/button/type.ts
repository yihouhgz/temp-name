import type { VNode, PropType } from 'vue'
import type Button from './button.tsx'
export interface ButtonProps {
  type?: 'primary' | 'warning' | 'danger' | 'tertiary' | 'secondary'
  size?: 'small' | 'default' | 'large'
  disabled?: boolean
  loading?: boolean
  icon?: string | VNode | (() => VNode) | null
  autoInsertSpace?: boolean
  block?: boolean
  htmlType?: 'button' | 'submit' | 'reset'
  noHorizontalPadding: boolean | 'left' | 'right' | ['left', 'right']
  theme: 'solid' | 'borderless' | 'light' | 'outline'
}
export const buttonTypeValues = [
  'primary',
  'success',
  'warning',
  'danger',
  'tertiary',
  'secondary'
] as const
export const buttonPropsDefaults = {
  type: {
    type: String as PropType<ButtonProps['type']>,
    default: 'primary',
    values: buttonTypeValues,
    required: false
  },
  /**
   * @description 按钮尺寸
   */
  size: {
    type: String as PropType<ButtonProps['size']>,
    default: 'default',
    values: ['small', 'default', 'large'],
    required: false
  },
  /**
   * @description 按钮主题，可选值：solid（有背景色）、 borderless（无背景色）、 light（浅背景色）、outline(边框模式)
   */
  theme: {
    type: String as PropType<ButtonProps['theme']>,
    default: 'light',
    values: ['solid', 'borderless', 'light', 'outline'],
    required: false
  },
  /**
   * @description 按钮是否禁用
   */
  disabled: {
    type: Boolean,
    default: false,
    required: false
  },
  /**
   * @description 加载状态
   */
  loading: {
    type: Boolean,
    default: false,
    required: false
  },
  /**
   * @description 图标
   */
  icon: {
    type: [String, Object, Function, null] as PropType<ButtonProps['icon']>,
    default: null,
    required: false
  },
  /**
   * @description 图标位置，可选值：left|right
   */
  iconPosition: {
    type: String,
    default: 'left',
    values: ['left', 'right'],
    required: false
  },
  /**
   * @description 设置水平方向是否去掉内边距，只对设置了 icon 的 Button 有效。
   * 可选值：true（等效于 ["left", "right"]），"left"，"right"，["left", "right"]
   */
  noHorizontalPadding: {
    type: [Boolean, String, Array] as PropType<ButtonProps['noHorizontalPadding']>,
    default: false,
    values: [true, 'left', 'right', ['left', 'right']],
    required: false
  },
  autoInsertSpace: {
    type: Boolean,
    default: true,
    required: false
  },
  /**
   * @description 将按钮设置为块级按钮
   */
  block: {
    type: Boolean,
    default: false,
    required: false
  },
  /**
   * @description 内容区域 className
   */
  contentClassName: {
    type: String,
    default: '',
    required: false
  },
  /**
   * @description 设置 button 原生的 type 值，可选值：button、reset、submit
   */
  htmlType: {
    type: String as PropType<ButtonProps['htmlType']>,
    values: ['button', 'reset', 'submit'],
    default: 'button',
    required: false
  }
}
export const buttonEmits = {
  click: (e: Event) => e instanceof Event,
  mouseenter: (e: Event) => e instanceof Event,
  mouseleave: (e: Event) => e instanceof Event,
  mousedown: (e: Event) => e instanceof Event
}

export const buttonGroupProps = {
  /**
   * @description 按钮组是否禁用
   */
  disabled: {
    type: Boolean,
    default: false,
    required: false
  },
  type: {
    type: String as PropType<ButtonProps['type']>,
    default: 'primary',
    values: ['primary', 'success', 'warning', 'danger', 'info'],
    required: false
  },
  /**
   * @description 按钮尺寸
   */
  size: {
    type: String as PropType<ButtonProps['size']>,
    default: 'default',
    values: ['small', 'default', 'large'],
    required: false
  },
  theme: {
    type: String as PropType<ButtonProps['theme']>,
    default: 'light',
    values: ['solid', 'borderless', 'light', 'outline'],
    required: false
  }
}

export interface ButtonSlots {
  default?: () => VNode[]
}

export type ButtonInstance = InstanceType<typeof Button> & unknown
