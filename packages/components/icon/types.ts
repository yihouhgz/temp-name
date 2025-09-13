import type { PropType, VNode, Component } from 'vue'
export const iconProps = {
  /**
   * @description 旋转度数
   */
  rotate: {
    type: Number,
    default: 0,
    required: false
  },
  /**
   * @description 图标大小
   */
  size: {
    values: ['inherit', 'extra-small', 'small', 'default', 'large', 'extra-large'],
    default: 'default',
    required: false
  },
  /**
   * @description 是否旋转
   */
  spin: {
    type: Boolean,
    default: false,
    required: false
  },
  /**
   * @description 图标类型
   */
  type: {
    type: String,
    default: '',
    required: false
  },
  svg: {
    type: [Object, Function, undefined] as PropType<
      string | VNode | Component | (() => VNode) | undefined
    >,
    default: undefined,
    required: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    required: true
  }
}

export const iconEmits = {
  click: (e: MouseEvent) => void e,
  mouseDown: (e: Event) => void e,
  mouseUp: (e: Event) => void e,
  mouseEnter: (e: Event) => void e,
  mouseLeave: (e: Event) => void e,
  mouseMove: (e: Event) => void e
}
