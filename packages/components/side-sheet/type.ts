import type { CSSProperties, PropType } from 'vue'
import type { VueNode } from '../_util/type'
import { strings } from './constants'
import { isBoolean } from '../_util'

export type PlacementType = (typeof strings.placement)[number]
export type SizeType = (typeof strings.size)[number]
export const sideSheetProps = {
  /**
   * @property 面板内容的样式
   */
  bodyStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => ({})
  },
  /**
   * @property 是否允许通过右上角的关闭按钮关闭
   */
  closable: {
    type: Boolean,
    default: true
  },
  /**
   * @property 自定义关闭图标
   */
  closeIcon: {
    type: [String, Object, null] as PropType<VueNode>,
    default: null
  },
  /**
   * @property 允许通过键盘事件 Esc 触发关闭
   */
  closeOnEsc: {
    type: Boolean,
    default: false
  },
  /**
   * @property 默认渲染在 document.body 层时是否禁止 body 的滚动，即给 body 添加 overflow: hidden
   */
  disableScroll: {
    type: Boolean,
    default: true
  },
  /**
   * @property 侧边栏底部
   */
  footer: {
    type: [String, Object, null] as PropType<VueNode>,
    default: null
  },
  /**
   * @property 指定父级 DOM，弹层将会渲染至该 DOM 中，自定义需要设置 position: relative 这会改变浮层 DOM 树位置，但不会改变视图渲染位置。
   */
  getPopupContainer: {
    type: Function as PropType<(node: HTMLElement) => HTMLElement>,
    default: () => document.body
  },
  /**
   * @property 面板头部的样式
   */
  headerStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => ({})
  },
  /**
   * @property 高度，位置为 top 或 bottom 时生效
   */
  height: {
    type: [Number, String],
    default: 400
  },
  /**
   * @property 关闭 SideSheet 时是否保留内部组件不销毁
   */
  keepDOM: {
    type: Boolean,
    default: false
  },
  /**
   * @property 是否显示遮罩，当 mask={false} 时允许对外部区域进行操作
   */
  mask: {
    type: Boolean,
    default: true
  },
  /**
   * @property 是否允许通过点击遮罩来关闭面板
   */
  maskClosable: {
    type: Boolean,
    default: true
  },
  /**
   * @property 遮罩样式
   */
  maskStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => ({})
  },
  /**
   * @property 是否允许动画
   */
  motion: {
    type: Boolean,
    default: true
  },
  /**
   * @property 侧边栏滑出位置，支持top, bottom, left, right
   */
  placement: {
    type: String as PropType<PlacementType>,
    values: strings.placement,
    default: strings.defaultPlacement
  },
  /**
   * @property 尺寸，支持 small(448px)， medium(684px), large(920px)，仅在 left 或 right 时生效
   */
  size: {
    type: String as PropType<SizeType>,
    values: strings.size,
    default: strings.defaultSize
  },
  /**
   * @property 面板的标题
   */
  title: {
    type: [String, Object, null] as PropType<VueNode>,
    default: null
  },
  /**
   * @property 面板是否可见
   */
  visible: {
    type: Boolean,
    default: false
  },
  /**
   * @property 宽度，位置为 left 或 right 时生效
   */
  width: {
    type: [Number, String],
    default: 448
  },
  /**
   * @property 弹层 z-index
   */
  zIndex: {
    type: Number,
    default: 1000
  }
}

export const sideSheetEmits = {
  /**
   * @property 面板展示/隐藏时动画结束触发的回调
   */
  afterVisibleChange: (isVisible: boolean) => isBoolean(isVisible),
  /**
   * @property 取消面板时的回调函数
   */
  cancel: (e: MouseEvent) => e instanceof MouseEvent
}
