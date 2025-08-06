import type { VNode } from 'vue'

export interface ButtonProps {
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  loading?: boolean
}

export const buttonProps = {
  type: {
    type: String,
    default: 'default'
  },
  size: {
    type: String,
    default: 'medium'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
}

export interface ButtonEmits {
  onClick?: (event: MouseEvent) => void
}

export interface ButtonSlots {
  default?: () => VNode[]
}

export type ButtonInstance = ButtonProps & ButtonEmits
