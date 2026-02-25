import type { PropType } from 'vue'
export const portalProps = {
  getPopupContainer: {
    type: [Function] as PropType<(el: HTMLElement) => HTMLElement>,
    default: () => () => document.body,
    required: false
  },
  triggerElementRef: {
    type: Object as PropType<HTMLElement>,
    default: null
  },
  zIndex: {
    type: Number,
    default: 1000,
    required: false
  },
  closeOnEsc: {
    type: Boolean,
    default: true
  }
}
export const portalEmits = {
  keyEsc: (e: KeyboardEvent) => e instanceof KeyboardEvent
}
