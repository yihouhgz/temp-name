import type { PropType, VNode, StyleValue } from 'vue'
import { isObject, isString } from '../_util'

export type Size = {
  width: number | `${number}px` | `${number}vw` | `${number}vh` | `${number}%` | `auto`
  height: number | `${number}px` | `${number}vw` | `${number}vh` | `${number}%` | `auto`
}
export type Enable = {
  left: boolean
  right: boolean
  top: boolean
  bottom: boolean
  topLeft: boolean
  topRight: boolean
  bottomLeft: boolean
  bottomRight: boolean
}
export type BoundElement = 'parent' | 'window'
type VueNode = string | VNode | (() => VNode) | null
type HandleNode = {
  left: VueNode
  right: VueNode
  top: VueNode
  bottom: VueNode
  topLeft: VueNode
  topRight: VueNode
  bottomLeft: VueNode
  bottomRight: VueNode
}
export type HandleStyle = {
  left: StyleValue
  right: StyleValue
  top: StyleValue
  bottom: StyleValue
  topLeft: StyleValue
  topRight: StyleValue
  bottomLeft: StyleValue
  bottomRight: StyleValue
}
export type HandleClass = {
  left: string
  right: string
  top: string
  bottom: string
  topLeft: string
  topRight: string
  bottomLeft: string
  bottomRight: string
}
export type Snap = {
  x: number[]
  y: number[]
}
export const resizableProps = {
  /**
   * @description 控制伸缩框的大小，支持数字和字符串（px/vw/vh/%/auto）两种格式
   */
  size: {
    type: Object as PropType<Partial<Size>>,
    default: () => ({})
  },
  /**
   * @description 默认的伸缩框大小，支持数字和字符串（px/vw/vh/%/auto）两种格式
   */
  defaultSize: {
    type: Object as PropType<Partial<Size>>,
    default: () => ({})
  },
  /**
   * @description 指定伸缩框最小宽度
   */
  minWidth: {
    type: [Number, String],
    default: 0
  },
  /**
   * @description 指定伸缩框最大宽度
   */
  maxWidth: {
    type: [Number, String],
    default: 0
  },
  /**
   * @description 指定伸缩框最小高度
   */
  minHeight: {
    type: [Number, String],
    default: 0
  },
  /**
   * @description 指定伸缩框最大高度
   */
  maxHeight: {
    type: [Number, String],
    default: 0
  },
  /**
   * @description 设置伸缩框横纵比，当为true时按照初始宽高锁定
   */
  lockAspectRatio: {
    type: [Boolean, Number] as PropType<boolean | number>,
    default: false
  },
  /**
   * @description 指定伸缩框可以伸缩的方向，没有设置为 false，则默认允许该方向的拖动
   */
  enable: {
    type: Object as PropType<Enable>,
    default: () => ({
      left: true,
      right: true,
      top: true,
      bottom: true,
      topLeft: true,
      topRight: true,
      bottomLeft: true,
      bottomRight: true
    })
  },
  /**
   * @description 可伸缩元素被缩放的比例
   */
  scale: {
    type: Number,
    default: 1
  },
  /**
   * @description 用于限制可伸缩元素宽高的元素,传入 parent 设置父节点为限制节点
   */
  boundElement: {
    type: String as PropType<BoundElement>,
    default: 'window'
  },
  /**
   * @description 用于设置拖拽处理元素各个方向的自定义节点
   */
  handleNode: {
    type: Object as PropType<Partial<HandleNode>>,
    default: () => ({
      left: null,
      right: null,
      top: null,
      bottom: null,
      topLeft: null,
      topRight: null,
      bottomLeft: null,
      bottomRight: null
    })
  },
  /**
   * @description 用于设置拖拽处理元素各个方向的样式
   */
  handleStyle: {
    type: Object as PropType<Partial<HandleStyle>>,
    default: () => ({
      left: null,
      right: null,
      top: null,
      bottom: null,
      topLeft: null,
      topRight: null,
      bottomLeft: null,
      bottomRight: null
    })
  },
  /**
   * @description 用于设置拖拽处理元素各个方向的class
   */
  handleClass: {
    type: Object as PropType<Partial<HandleClass>>,
    default: () => ({
      left: null,
      right: null,
      top: null,
      bottom: null,
      topLeft: null,
      topRight: null,
      bottomLeft: null,
      bottomRight: null
    })
  },
  /**
   * @description 用于指定移动到下一个目标所需的最小间隙
   */
  snapGap: {
    type: Number,
    default: 0
  },
  /**
   * @description 指定调整大小时应对齐的绝对像素值。 x 和 y 都是可选的，允许仅包含要定义的轴
   */
  snap: {
    type: Object as PropType<Partial<Snap>>,
    default: () => ({
      x: null,
      y: null
    })
  },
  /**
   * @description 指定调整大小应对齐的增量
   */
  grid: {
    type: Array as PropType<Array<number>>,
    default: () => [1, 1]
  }
}

export const resizableEmits = {
  /**
   * @description 拖拽过程中的回调
   */
  change: (size: Size, e: Event, direction: string) => {
    return isObject(size) && e instanceof Event && isString(direction)
  },
  /**
   * @description 开始伸缩的回调
   */
  resizeStart: (e: Event, direction: string) => {
    return e instanceof Event && isString(direction)
  },
  /**
   * @description 结束伸缩的回调
   */
  resizeEnd: (e: Event, direction: string) => {
    return e instanceof Event && isString(direction)
  }
}
