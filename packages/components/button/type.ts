import type { VNode, PropType } from 'vue'
export interface ButtonProps {
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  loading?: boolean
  icon?: string | VNode | null
  autoInsertSpace?: boolean
  block?: boolean
  htmlType?: 'button' | 'submit' | 'reset'
}
export const buttonPropsDefaults = {
  type: {
    type: String as PropType<ButtonProps['type']>,
    default: 'primary'
  },
  size: {
    type: String as PropType<ButtonProps['size']>,
    default: 'medium'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  icon: {
    type: [String, Object, null] as PropType<ButtonProps['icon']>,
    default: null
  },
  autoInsertSpace: {
    type: Boolean,
    default: true
  },
  block: {
    type: Boolean,
    default: false
  },
  htmlType: {
    type: String as PropType<ButtonProps['htmlType']>,
    default: 'button'
  }
}

export interface ButtonEmits {
  onClick?: (event: MouseEvent) => void
}

export interface ButtonSlots {
  default?: () => VNode[]
}

export type ButtonInstance = ButtonProps & ButtonEmits
