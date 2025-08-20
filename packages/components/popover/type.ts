import type { PropType, VNode } from 'vue'
export const popoverProps = {
  autoAdjustOverflow: {
    type: Boolean,
    default: true
  },
  arrowPointAtCenter: {
    type: Boolean,
    default: true
  },
  closeOnEsc: {
    type: Boolean,
    default: true
  },
  content: {
    type: [String, Object, Function, null] as PropType<
      string | VNode | (() => VNode) | null
    >,
    default: undefined
  },
  getPopupContainer: {
    type: [Function, null] as PropType<(() => HTMLElement) | null>,
    default: null
  }
}
