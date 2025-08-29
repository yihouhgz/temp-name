export const props = {
  rippleSize: {
    type: Array,
    default: () => {
      return [10, 10]
    },
    required: false
  },
  disabled: { type: Boolean, default: false, required: false },
  target: { type: HTMLElement, required: false }
}
