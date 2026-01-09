import type { PropType } from 'vue'
import type { VueNode } from '../_util/type'
import type { StyleValue } from 'vue'

export const emptyProps = {
  /**
   * @property 暗黑模式下的图片
   */
  darkModeImage: {
    type: [Object, Function, null] as PropType<VueNode>,
    default: null
  },
  /**
   * @property 占位图样式
   */
  image: {
    type: [Object, Function, null] as PropType<VueNode>,
    default: null
  },
  /**
   * @property 占位图样式
   */
  imageStyle: {
    type: [String, Object] as PropType<StyleValue>,
    default: {}
  },
  /**
   * @property 布局方向
   */
  layout: {
    type: String as PropType<'vertical' | 'horizontal'>,
    values: ['vertical', 'horizontal'],
    default: 'vertical'
  },
  /**
   * @property 标题
   */
  title: {
    type: [String, Function, Object, null] as PropType<VueNode>,
    default: ''
  },
  /**
   * @property 内容描述
   */
  description: {
    type: [String, Function, Object, null] as PropType<VueNode>,
    default: ''
  }
}
