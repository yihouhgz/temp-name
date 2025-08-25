import type { PropType, StyleValue } from 'vue'
export const portalProps = {
  getPopupContainer: {
    type: [Function] as PropType<(el: HTMLElement) => HTMLElement>,
    default: () => () => document.body,
    required: false
  },
  //底元素的尺寸 getBoundingClientRect
  targetElementRect: {
    type: Object as PropType<DOMRect>,
    default: {}
  },
  triggerElementRef: {
    type: Object as PropType<HTMLElement>,
    default: null
  },
  autoAdjustOverflow: {
    type: Boolean,
    default: true,
    required: false
  },
  innerStyle: {
    type: Object as PropType<StyleValue>,
    default: () => ({})
  }
}
