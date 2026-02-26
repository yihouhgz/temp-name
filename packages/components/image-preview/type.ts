import type { CSSProperties, PropType } from 'vue'
import type { VueNode } from '../_util/type'
import { isBoolean, isNumber, isString } from '../_util'

export const imagePreviewProps = {
  /**
   * @description 适应页面操作按钮提示
   */
  adaptiveTip: {
    type: String,
    default: '适应页面'
  },
  /**
   * @description 是否显示关闭按钮
   */
  closable: {
    type: Boolean,
    default: true
  },
  /**
   * @description 点击 esc 关闭预览
   */
  closeOnEsc: {
    type: Boolean,
    default: true
  },
  /**
   * @description 透传给预览图片的原生 img 标签的 crossorigin
   */
  crossOrigin: {
    type: String as PropType<'anonymous' | 'use-credentials'>
  },
  /**
   * @description 受控属性，当前预览图片下标
   */
  currentIndex: {
    type: Number
  },
  /**
   * @description 首次展示图片下标
   */
  defaultCurrentIndex: {
    type: Number
  },
  /**
   * @description 首次是否开启预览
   */
  defaultVisible: {
    type: Boolean,
    default: false
  },
  /**
   * @description 是否禁用下载
   */
  disableDownload: {
    type: Boolean,
    default: false
  },
  /**
   * @description 下载操作按钮提示
   */
  downloadTip: {
    type: String,
    default: '下载'
  },
  /**
   * @description 指定父级 DOM，弹层将会渲染至该 DOM 中，自定义需要设置 container position: relative 这会改变浮层 DOM 树位置，但不会改变视图渲染位置。
   */
  getPopupContainer: {
    type: Function as PropType<(triggerNode: HTMLElement) => HTMLElement>
    // default: () => document.body
  },
  /**
   * @description 是否开启无限滚动
   */
  infinite: {
    type: Boolean,
    default: false
  },
  /**
   * @description 是否开启懒加载
   */
  lazyLoad: {
    type: Boolean,
    default: false
  },
  /**
   * @description 传给 options 中的rootMargin 参数
   */
  lazyLoadMargin: {
    type: String,
    default: '0px 100px 100px 0px'
  },
  /**
   * @description 	点击遮罩是否可关闭
   */
  maskClosable: {
    type: Boolean,
    default: true
  },
  /**
   * @description 下一步操作按钮提示
   */
  nextTip: {
    type: String,
    default: '下一步'
  },
  /**
   * @description 原始尺寸操作按钮提示
   */
  originTip: {
    type: String,
    default: '原始尺寸'
  },
  /**
   * @description 是否开启预加载
   */
  preLoad: {
    type: Boolean,
    default: true
  },
  /**
   * @description 预加载的步长
   */
  preLoadGap: {
    type: Number,
    default: 2
  },
  /**
   * @description 自定义预览 title
   */
  previewTitle: {
    type: [String, Object, Function] as PropType<VueNode>
  },
  /**
   * @description 自定义预览样式类名
   */
  previewCls: {
    type: String
  },
  /**
   * @description 自定义预览样式
   */
  previewStyle: {
    type: Object as PropType<CSSProperties>
  },
  /**
   * @description 上一步操作按钮提示
   */
  prevTip: {
    type: String,
    default: '上一步'
  },
  /**
   * @description	自定义关闭icon
   */
  renderCloseIcon: {
    type: [String, Object, Function] as PropType<VueNode>
  },
  /**
   * @description 自定义向左icon
   */
  renderLeftIcon: {
    type: [String, Object, Function] as PropType<VueNode | ((index: number) => VueNode)>
  },
  /**
   * @description 自定义向右icon
   */
  renderRightIcon: {
    type: [String, Object, Function] as PropType<VueNode | ((index: number) => VueNode)>
  },
  /**
   * @description 自定义渲染预览顶部信息
   */
  renderHeader: {
    type: Function as PropType<(info: VueNode) => VueNode>
  },
  /**
   * @description 自定义渲染预览底部菜单
   */
  renderPreviewMenu: {
    type: Function as PropType<(props: MenuProps) => VueNode>
  },
  /**
   * @description 旋转操作按钮提示
   */
  rotateTip: {
    type: String,
    default: '旋转'
  },
  /**
   * @description 是否展示底部操作区提示
   */
  showTooltip: {
    type: Boolean,
    default: false
  },
  /**
   * @description 图片地址
   */
  src: {
    type: [String, Array] as PropType<string | string[]>
  },
  /**
   * @description 隐藏预览操作按钮前的无操作时长
   */
  viewerVisibleDelay: {
    type: Number,
    default: 10000
  },
  /**
   * @description 受控属性，是否预览
   */
  visible: {
    type: Boolean
  },
  /**
   * @description 预览图片的 z-index
   */
  zIndex: {
    type: Number,
    default: 1070
  },
  /**
   * @description 放大操作按钮提示
   */
  zoomInTip: {
    type: String,
    default: '放大'
  },
  /**
   * @description 缩小操作按钮提示
   */
  zoomOutTip: {
    type: String,
    default: '缩小'
  },
  /**
   * @description 图片每次缩小/放大比例
   */
  zoomStep: {
    type: Number,
    default: 0.1
  },
  /**
   * @description 设置图片下载名称
   */
  setDownloadName: {
    type: Function as PropType<(src: string) => string>
  }
}
export const imagePreviewEmits = {
  /**
   * @description 切换图片触发的事件
   */
  change: (index: number) => isNumber(index),
  /**
   * @description 点击关闭按钮时的回调函数
   */
  close: () => true,
  /**
   * @description 图片下载回调函数
   */
  download: (src: string, index: number) => isString(src) && isNumber(index),
  /**
   * @description 图片下载错误回调函数
   */
  downloadError: (src: string) => isString(src),
  /**
   * @description 顺旋转图片的回调
   */
  rotateLeft: (angle: number) => isNumber(angle),
  /**
   * @description 逆旋转图片的回调
   */
  rotateRight: (angle: number) => isNumber(angle),
  /**
   * @description 向后切换图片的回调
   */
  next: (index: number) => isNumber(index),
  /**
   * @description 向前切换图片的回调
   */
  prev: (index: number) => isNumber(index),
  /**
   * @description 放大图片的回调
   */
  zoomIn: (zoom: number) => isNumber(zoom),
  /**
   * @description 缩小图片的回调
   */
  zoomOut: (zoom: number) => isNumber(zoom),
  /**
   * @description 预览图片打开或关闭的回调
   */
  visibleChange: (visible: boolean) => isBoolean(visible)
}

export type MenuProps = {
  /**
   * @description 当前图片页下标
   */
  curPage: number
  /**
   * @description 是否禁用向左切换按钮
   */
  disabledPrev: boolean
  /**
   * @description 是否禁用向右切换按钮
   */
  disabledNext: boolean
  /**
   * @description 是否禁用下载按钮
   */
  disableDownload: boolean
  /**
   * @description 图片缩放最大比例
   */
  max: number
  /**
   * @description 图片缩放最小比例
   */
  min: number
  /**
   * @description 图片下载的调用函数
   */
  onDownload: () => void
  /**
   * @description 图片放大时的调用函数
   */
  onZoomIn: () => void
  /**
   * @description 图片缩小的调用函数
   */
  onZoomOut: () => void
  /**
   * @description 向前切换图片的调用函数
   */
  onPrev: () => void
  /**
   * @description 向后切换图片的调用函数
   */
  onNext: () => void
  /**
   * @description 逆时针旋转图片的调用函数
   */
  onRotateLeft: () => void
  /**
   * @description 顺时针旋转图片的调用函数
   */
  onRotateRight: () => void
  /**
   * @description 原始尺寸或适应页面按钮状态
   */
  ratio: 'adaptation' | 'realSize'
  /**
   * @description 缩放的比例步长
   */
  step: number
  /**
   * @description 图片总页数
   */
  totalNum: number
  /**
   * @description 当前图片缩放比例
   */
  zoom: number
  /**
   * @description 默认底部预览操作区域功能按钮 ReactNode 数组
   */
  menuItems: VueNode[]
}
