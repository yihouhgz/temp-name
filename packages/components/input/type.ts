import type { PropType, VNode } from 'vue'
export const inputPropsDefaults = {
  value: {
    type: String,
    default: ''
  },
  size: {
    values: ['small', 'default', 'large'],
    default: 'default'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  type: {
    values: ['text', 'password'],
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  clearIcon: {
    type: [String, Object, Function, null] as PropType<
      string | VNode | (() => VNode) | null
    >,
    default: null,
    required: false
  },
  showClear: {
    type: Boolean,
    default: false
  }
}
