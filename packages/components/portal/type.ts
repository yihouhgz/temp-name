import type { PropType } from 'vue'
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
  }
}
