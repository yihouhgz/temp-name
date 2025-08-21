import type { PropType, VNode } from 'vue'
export const tooltioProps = {
  showArrow: {
    type: Boolean,
    default: true
  },
  position: {
    values: [
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
    ],
    default: 'top'
  },
  content: {
    type: [String, Object, Function, null] as PropType<
      string | VNode | (() => VNode) | null
    >,
    default: undefined
  },
  getPopupContainer: {
    type: [Function] as PropType<(el: HTMLElement) => HTMLElement>,
    default: () => () => document.body,
    required: false
  },
  trigger: {
    values: ['hover', 'focus', 'click', 'custom', 'contextMenu'],
    default: 'hover'
  }
}
