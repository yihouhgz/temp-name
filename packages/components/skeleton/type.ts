import type { PropType } from 'vue'
import type { VueNode } from '../_util/type'
import type { StyleValue } from 'vue'

export const skeletonProps = {
  /**
   * 是否展示动画效果
   */
  active: {
    type: Boolean,
    default: false
  },
  /**
   * 为 true 时，显示占位元素。反之则显示子组件
   */
  loading: {
    type: Boolean,
    default: true
  },
  /**
   * 加载等待时的占位元素
   */
  placeholder: {
    type: [String, Object, Function, null] as PropType<VueNode | (() => VueNode)>,
    default: null
  },
  style: {
    type: Object as PropType<StyleValue>,
    default: () => ({})
  },
  className: {
    type: [String, Array, Object],
    default: ''
  }
}
export const sizes = [
  'extra-extra-small',
  'extra-small',
  'small',
  'medium',
  'large',
  'extra-large'
] as const
export const baseProps = {
  /**
   * 尺寸 extra-extra-small, extra-small、small、medium、large、extra-large
   */
  size: {
    type: String as PropType<(typeof sizes)[number]>,
    values: sizes,
    default: 'medium'
  }
}
export const shapes = ['circle', 'square'] as const
export const avatarProps = {
  ...baseProps,
  /**
   * 头像形状 circle、square
   */
  shape: {
    type: String as PropType<(typeof shapes)[number]>,
    values: shapes,
    default: 'circle'
  }
}

export const paragraphProps = {
  /**
   * 段落骨架屏行数
   */
  rows: {
    type: [Number, String],
    default: 4
  }
}
