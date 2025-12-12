import type { PropType } from 'vue'
import type { VueNode } from '../_util/type'
import { strings } from './constants'

export type FeedbackType = (typeof strings.type)[number]

export const feefbackProps = {
  /**
   * @description 标题
   */
  title: {
    type: [String, Object, null] as PropType<VueNode>,
    default: null
  },
  /**
   * @description 设置取消按钮的参数
   */
  cancelButtonProps: {
    type: Object,
    default: () => ({})
  },
  /**
   * @description 设置提交按钮的参数，比如当设置 type 为 custom，用户自定义反馈内容时，通过设置 okButtonProps 中的 disabled 设置是否禁用提交
   */
  okButtonProps: {
    type: Object,
    default: () => ({})
  },
  /**
   * @description 设置多选的参数
   */
  checkboxGroupProps: {
    type: Object,
    default: () => ({})
  },
  /**
   * @description 设置单选的参数
   */
  radioGroupProps: {
    type: Object,
    default: () => ({})
  },
  /**
   * @description 自定义反馈内容展示
   */
  renderContent: {
    type: [Function, Object, null] as PropType<VueNode>,
    default: null
  },
  /**
   * @description 展示模式，支持 popup、modal
   */
  mode: {
    type: String as PropType<'single' | 'multiple'>,
    default: 'single'
  },
  /**
   * @description 反馈内容的类型，支持 text、emoji、radio，checkbox，custom
   */
  type: {
    type: String as PropType<FeedbackType>,
    values: strings.type,
    default: 'emoji'
  },
  /**
   * @description 设置多行输入框的参数
   */
  textAreaProps: {
    type: Object,
    default: () => ({})
  }
}
