import type { PropType } from 'vue'
import type { VueNode } from '../_util/type'
import { strings } from './constant'
const types = Object.values(strings.type)
export const brannerProps = {
  /**
   * @property 是否有边框
   */
  bordered: {
    type: Boolean,
    default: false
  },
  /**
   * @property 自定义关闭icon，为 null 时不显示关闭按钮
   */
  closeIcon: {
    type: [String, Object, Function, null] as PropType<VueNode>,
    default: undefined
  },
  /**
   * @property 描述内容
   */
  description: {
    type: [String, Object, Function, null] as PropType<VueNode>,
    default: null
  },
  /**
   * @property 是否为全屏模式
   */
  fullMode: {
    type: Boolean,
    default: true
  },
  /**
   * @property 自定义 icon，为 null 时不显示 icon
   */
  icon: {
    type: [String, Object, Function, null] as PropType<VueNode>,
    default: undefined
  },
  /**
   * @property 标题
   */
  title: {
    type: [String, Object, Function, null] as PropType<VueNode>,
    default: null
  },
  /**
   * @property 类型，支持 info, success, danger, warning
   */
  type: {
    type: String as PropType<(typeof types)[number]>,
    values: types,
    default: strings.type.info
  }
}

export const brannerEmits = {
  /**
   * @property 点击关闭按钮时触发
   */
  close: (e: Event) => e instanceof Event
}
