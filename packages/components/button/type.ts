import type { VNode, PropType } from 'vue'
import type Button from './button.tsx'
export interface ButtonProps {
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  loading?: boolean
  icon?: string | VNode | (() => VNode) | null
  autoInsertSpace?: boolean
  block?: boolean
  htmlType?: 'button' | 'submit' | 'reset'
}
export const buttonPropsDefaults = {
  type: {
    type: String as PropType<ButtonProps['type']>,
    default: 'primary',
    values: ['primary', 'success', 'warning', 'danger', 'info'],
    required: false
  },
  size: {
    type: String as PropType<ButtonProps['size']>,
    default: 'medium',
    values: ['small', 'medium', 'large'],
    required: false
  },
  disabled: {
    type: Boolean,
    default: false,
    required: false
  },
  loading: {
    type: Boolean,
    default: false,
    required: false
  },
  icon: {
    type: [String, Object, Function, null] as PropType<ButtonProps['icon']>,
    default: null,
    required: false
  },
  autoInsertSpace: {
    type: Boolean,
    default: true,
    required: false
  },
  block: {
    type: Boolean,
    default: false,
    required: false
  },
  htmlType: {
    type: String as PropType<ButtonProps['htmlType']>,
    default: 'button',
    required: false
  }
}

export interface ButtonEmits {
  onClick?: (event: MouseEvent) => void
}

export interface ButtonSlots {
  default?: () => VNode[]
}

export type ButtonInstance = InstanceType<typeof Button> & unknown

// export type ButtonInstance = ButtonProps & ButtonEmits
