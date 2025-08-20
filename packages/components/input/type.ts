import type { PropType, VNode, ExtractPropTypes } from 'vue'
import Input from './input'
export const inputPropsDefaults = {
  modelValue: {
    modelValue: String,
    default: undefined
  },
  value: {
    type: String,
    default: undefined
  },
  defaultValue: {
    type: String,
    default: undefined
  },
  size: {
    values: ['small', 'default', 'large'],
    default: 'default'
  },
  // Whether to disable or not, the default is false
  disabled: {
    type: Boolean,
    default: false
  },
  // input mode
  type: {
    values: ['text', 'password'],
    default: 'text'
  },
  // input placeholder
  placeholder: {
    type: String,
    default: undefined
  },
  // clean icon Custom
  clearIcon: {
    type: [String, Object, Function, null] as PropType<
      string | VNode | (() => VNode) | null
    >,
    default: undefined,
    required: false
  },
  // When there is a value in the input box and it is in the hover or focus state, the clean icon is displayed
  showClear: {
    type: Boolean,
    default: false
  },
  // Borderless input box
  borderless: {
    type: Boolean,
    default: false
  },
  // Check the status. The selectable values are default, error, and warning. default is default. Only affects the display style
  validateStatus: {
    values: ['default', 'error', 'warning'],
    default: 'default'
  }
}

export type InputProps = ExtractPropTypes<typeof inputPropsDefaults>
export type InputComponentType = typeof Input
