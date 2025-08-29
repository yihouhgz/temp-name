import type { PropType, ExtractPropTypes, VNode } from 'vue'
export const props = {
  content: {
    type: [] as PropType<string[] | undefined>,
    default: undefined,
    required: false
  },
  getListenerTarget: {
    type: Function as PropType<() => HTMLElement | undefined>,
    default: () => document.body,
    required: false
  },
  hotKeys: {
    type: Array as PropType<KeyboardEvent['key'][] | undefined>,
    default: () => [],
    required: false
  },
  preventDefault: {
    type: Boolean,
    default: false,
    required: false
  },
  render: {
    type: [String, Object, Function, null] as PropType<string | VNode | (() => VNode) | null>,
    default: () => {},
    required: false
  }
}
export type HotKeysProps = ExtractPropTypes<typeof props>

export const emits = {
  click: (e: Event) => e,
  keydown: (e: KeyboardEvent) => e
}
