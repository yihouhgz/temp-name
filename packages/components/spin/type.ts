import type { PropType, VNode } from 'vue'
export const spinPorps = {
  /**
   * @description 延迟显示加载效果的时间 ms
   */
  delay: {
    type: Number,
    default: 0,
    required: false
  },

  /**
   * @description 加载指示符
   */
  indicator: {
    type: [String, Object, Function, null] as PropType<string | VNode | (() => VNode) | null>,
    default: null,
    required: false
  },

  /**
   * @description 组件大小，可选值为 small, middle, large
   */
  size: {
    type: String,
    default: 'middle',
    required: false
  },

  /**
   * @description 是否处于加载中的状态
   */
  spinning: {
    type: Boolean,
    default: true,
    required: false
  },

  /**
   * @description 当 spin 作为包裹元素时，可以自定义描述文字
   */
  tip: {
    type: [String, Object, Function, null] as PropType<string | VNode | (() => VNode) | null>,
    default: null,
    required: false
  }
}
