import type { PropType, ExtractPropTypes, VNode } from 'vue'
export const props = {
  /**
   * @description 显示内容
   */
  content: {
    type: [] as PropType<string[] | undefined>,
    default: undefined,
    required: false
  },
  /**
   * @description 用于设置监听器挂载的DOM
   */
  getListenerTarget: {
    type: Function as PropType<() => HTMLElement | undefined>,
    default: () => document.body,
    required: false
  },
  /**
   * @description 显示内容的背景
   */
  background: {
    type: [Boolean, String] as PropType<boolean | string | undefined>,
    default: true,
    required: false
  },
  /**
   * @description 设置快捷键组合
   */
  hotKeys: {
    type: Array as PropType<KeyboardEvent['key'][] | undefined>,
    default: () => [],
    required: true
  },
  /**
   * @description 是否阻止默认事件
   */
  preventDefault: {
    type: Boolean,
    default: false,
    required: false
  },
  /**
   * @description 覆盖组件渲染
   */
  render: {
    type: [String, Object, Function, null] as PropType<string | VNode | (() => VNode) | null>,
    default: () => {},
    required: false
  }
}
export type HotKeysProps = ExtractPropTypes<typeof props>

export const emits = {
  /**
   * @description 点击回调函数
   */
  click: (e: Event) => e,
  /**
   * @description 快捷键回调函数
   */
  hotKey: (e: KeyboardEvent) => e
}
