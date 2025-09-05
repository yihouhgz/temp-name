import type { PropType, VNode } from 'vue'
const values = [
  'top',
  'topLeft',
  'topRight',
  'left',
  'leftTop',
  'leftBottom',
  'right',
  'rightTop',
  'rightBottom',
  'bottom',
  'bottomLeft',
  'bottomRight'
] as const
export const tooltioProps = {
  autoAdjustOverflow: {
    type: Boolean,
    default: true,
    required: false
  },
  showArrow: {
    type: Boolean,
    default: true,
    required: false
  },
  position: {
    values: values,
    default: 'top',
    required: false
  },
  content: {
    type: [String, Object, Function, null] as PropType<string | VNode | (() => VNode) | null>,
    default: undefined
  },
  getPopupContainer: {
    type: [Function] as PropType<(el: HTMLElement) => HTMLElement>,
    default: () => () => document.body,
    required: false
  },
  trigger: {
    values: ['hover', 'focus', 'click', 'custom', 'contextMenu'],
    default: 'hover',
    required: false
  },
  // if trigger == custom effect
  visible: {
    type: Boolean,
    default: false,
    required: false
  },
  wrapper: {
    type: [Boolean, String],
    default: false,
    required: false
  },
  clickToHide: {
    type: Boolean,
    default: false,
    required: false
  },
  spacing: {
    type: [Number, Object] as PropType<number | { x: number; y: number }>,
    default: 8,
    required: false
  },
  motion: {
    type: Boolean,
    default: true,
    required: false
  }
}
export type Position = (typeof values)[number]
