import type { CSSProperties, PropType } from 'vue'
import type { VueNode } from '../_util/type'

export const badgeProps = {
  /**
   * @description 展示的内容
   */
  count: {
    type: [String, Object, Function, Number] as PropType<string | number | VueNode>
  },
  /**
   * @description 内容区域 className
   */
  countClassName: {
    type: String
  },
  /**
   * @description 不展示数字，显示小圆点
   */
  dot: {
    type: Boolean,
    default: false
  },
  /**
   * @description 最大值，超过最大值会显示为 ${overflowCount}+
   */
  overflowCount: {
    type: Number,
    default: 99
  },
  /**
   * @description 徽章位置，可选 leftTop、 leftBottom、 rightTop、 rightBottom
   */
  position: {
    type: String as PropType<'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom'>,
    values: ['leftTop', 'leftBottom', 'rightTop', 'rightBottom'],
    default: 'rightTop'
  },
  /**
   * @description 徽章内容的样式
   */
  countStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => ({})
  },
  /**
   * @description 徽章主题，可选 solid、 light、 inverted
   */
  theme: {
    type: String as PropType<'light' | 'solid' | 'inverted'>,
    values: ['light', 'solid', 'inverted'],
    default: 'solid'
  },
  /**
   * @description 徽章类型，可选 primary、 secondary、 tertiary、 danger、 warning、 success
   */
  type: {
    type: String as PropType<
      'primary' | 'secondary' | 'tertiary' | 'danger' | 'warning' | 'success'
    >,
    values: ['primary', 'secondary', 'tertiary', 'danger', 'warning', 'success'],
    default: 'primary'
  }
}
