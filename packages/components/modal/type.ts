import type { CSSProperties, PropType } from 'vue'
import type { ButtonPublicPropTypes } from '../button/button'
import type { VueNode } from '../_util/type'
import { buttonTypeValues } from '../button/type'
import { strings } from './constants'
export type ButtonType = (typeof buttonTypeValues)[number]
export type ModalSizeType = (typeof strings.size)[keyof typeof strings.size]
export const modalProps = {
  /**
   * @property 对话框内容的样式
   */
  bodyStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => ({})
  },
  /**
   * @property 取消按钮的 props
   */
  cancelButtonProps: {
    type: Object as PropType<ButtonPublicPropTypes>,
    default: () => ({})
  },
  /**
   * @property 取消按钮的文字
   */
  cancelText: {
    type: String,
    default: null
  },
  /**
   * @property 是否居中显示
   */
  centered: {
    type: Boolean,
    default: false
  },
  /**
   * @property 是否显示右上角的关闭按钮
   */
  closable: {
    type: Boolean,
    default: true
  },
  /**
   * @property 关闭按钮的图标
   */
  closeIcon: {
    type: [String, Object, Function, null] as PropType<VueNode>,
    default: null
  },
  /**
   * @property 允许通过键盘事件 Esc 触发关闭
   */
  closeOnEsc: {
    type: Boolean,
    default: true
  },
  /**
   * @property 确认按钮 loading
   */
  confirmLoading: {
    type: Boolean,
    default: false
  },
  /**
   * @property 对话框内容
   */
  content: {
    type: [String, Object, Function, null] as PropType<VueNode>,
    default: null
  },
  /**
   * @property 对话框底部
   */
  footer: {
    type: [String, Object, Function, null] as PropType<VueNode>,
    default: null
  },
  /**
   * @property 对话是否是全屏（会覆盖 width height）
   */
  fullScreen: {
    type: Boolean,
    default: false
  },
  /**
   * @property 指定父级 DOM，弹层将会渲染至该 DOM 中，自定义需要设置 position: relative 这会改变浮层 DOM 树位置，但不会改变视图渲染位置。
   */
  getPopupContainer: {
    type: Function as PropType<(node: HTMLElement) => HTMLElement>,
    default: () => document.body
  },
  /**
   * @property 是否显示取消按钮
   */
  hasCancel: {
    type: Boolean,
    default: true
  },
  /**
   * @property 对话框标题
   */
  header: {
    type: [String, Object, Function, null] as PropType<VueNode>,
    default: null
  },
  /**
   * @property 对话框高度
   */
  height: {
    type: Number,
    default: undefined
  },
  /**
   * @property 对话框图标
   */
  icon: {
    type: [String, Object, Function, null] as PropType<VueNode>,
    default: null
  },
  /**
   * @property 关闭对话框时是否保留内部组件不销毁
   */
  keepDOM: {
    type: Boolean,
    default: false
  },
  /**
   * @property 配合 keepDOM 使用，为 true 时挂载时不会渲染对话框组件
   */
  lazyRender: {
    type: Boolean,
    default: true
  },
  /**
   * @property 是否显示遮罩
   */
  mask: {
    type: Boolean,
    default: true
  },
  /**
   * @property 是否允许通过点击遮罩来关闭对话框
   */
  maskClosable: {
    type: Boolean,
    default: true
  },
  maskStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => ({})
  },
  /**
   * @property 可用于设置对话框内容的样式类名
   */
  modalContentClass: {
    type: String,
    default: ''
  },
  /**
   * @property 自定义渲染 Modal
   */
  modalRender: {
    type: Function as PropType<(modal: VueNode) => VueNode>,
    default: undefined
  },
  /**
   * @property 是否显示动画
   */
  motion: {
    type: Boolean,
    default: true
  },
  /**
   * @property 确认按钮的 props
   */
  okButtonProps: {
    type: Object as PropType<ButtonPublicPropTypes>,
    default: () => ({})
  },
  okText: {
    type: String,
    default: null
  },
  /**
   * @property 确认按钮的类型
   */
  okType: {
    type: String as PropType<ButtonType>,
    values: buttonTypeValues,
    default: 'primary'
  },
  /**
   * @property 指示浏览器是否应滚动文档以显示新聚焦的元素，作用于组件内的 focus 方法，不包含用户传入的组件
   */
  preventScroll: {
    type: Boolean,
    default: false
  },
  /**
   * @property 对话框宽度尺寸，支持 small(448px)， medium(684px), large(920px)，full-width(100vw - 64px)
   */
  size: {
    type: String as PropType<ModalSizeType>,
    values: Object.values(strings.size),
    default: 'small'
  },
  /**
   * @property 对话框标题
   */
  title: {
    type: [String, Object, Function, null] as PropType<VueNode>,
    default: null
  },

  /**
   * @property 是否显示对话框
   */
  visible: {
    type: Boolean,
    default: false
  },
  /**
   * @property 对话框宽度
   */
  width: {
    type: Number,
    default: 448
  },

  /**
   * @property 对话框 z-index
   */
  zIndex: {
    type: Number,
    default: 1000
  }
}

export const modalEmits = {
  afterClose: () => {},
  /**
   * @event 取消对话框时的回调函数，返回 Promise 时，取消按钮会出现 loading 态
   */
  cancel: (e: MouseEvent) => {
    return e instanceof MouseEvent
  },
  /**
   * @event 确认对话框时的回调函数，返回 Promise 时，确认按钮会出现 loading 态
   */
  ok: (e: MouseEvent) => {
    return e instanceof MouseEvent
  }
}
