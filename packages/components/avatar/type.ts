import type { ImgHTMLAttributes } from 'vue'
import type { PropType, VNode, CSSProperties } from 'vue'
import { isBoolean } from '../_util'
export type BottomSlotType = {
  render?: string | VNode | (() => VNode) | null
  shape?: 'circle' | 'square'
  text: string | VNode | (() => VNode) | null
  bgColor: string
  textColor: string
  className: string
  style?: CSSProperties
}
export type TopSlotType = {
  render?: string | VNode | (() => VNode) | null
  gradientStart?: string
  gradientEnd?: string
  text: string | VNode | (() => VNode) | null
  textColor: string
  className: string
  style?: CSSProperties
}
export type ColorType =
  | 'amber'
  | 'blue'
  | 'cyan'
  | 'green'
  | 'grey'
  | 'indigo'
  | 'light-blue'
  | 'light-green'
  | 'lime'
  | 'orange'
  | 'pink'
  | 'purple'
  | 'red'
  | 'teal'
  | 'yellow'
export type AvatarSizeType =
  | 'extra-extra-small'
  | 'extra-small'
  | 'small'
  | 'default'
  | 'medium'
  | 'large'
  | 'extra-large'
export const avatarProps = {
  /**
   * @description 图像的替代文本描述
   */
  alt: {
    type: String,
    default: '',
    required: false
  },
  /**
   * @description 头像的src
   */
  src: {
    type: String,
    default: '',
    required: false
  },
  /**
   * @description 设置图片类头像响应式资源地址
   */
  srcSet: {
    type: String,
    default: '',
    required: false
  },
  /**
   * @description 原生 img 属性
   */
  imgAttr: {
    type: Object as PropType<ImgHTMLAttributes>,
    default: () => ({}),
    required: false
  },

  /**
   * @description 额外边框
   */
  border: {
    type: [Object, Boolean] as PropType<{
      color?: string
      motion?: boolean
    }>,
    default: false,
    required: false
  },
  /**
   * @description 顶部 Slot 配置
   */
  topSlot: {
    type: Object as PropType<TopSlotType>,
    default: undefined,
    required: false
  },
  /**
   * @description 底部 Slot 配置
   */
  bottomSlot: {
    type: Object as PropType<BottomSlotType>,
    default: undefined,
    required: false
  },
  /**
   * @description 指定头像的颜色
   */
  color: {
    type: String as PropType<ColorType>,
    default: 'green',
    required: false
  },
  /**
   * @description 头像内容区域动效
   */
  contentMotion: {
    type: Boolean,
    default: false,
    required: false
  },
  /**
   * @description hover 时头像内容覆盖层
   */
  hoverMask: {
    type: [String, Object, Function, null] as PropType<string | VNode | (() => VNode) | null>,
    default: () => {},
    required: false
  },

  /**
   * @description 字符头像距离左右两侧的像素大小
   */
  gap: {
    type: Number,
    default: 3,
    required: false
  },
  /**
   * @description 指定头像的形状，支持 circle、square
   */
  shape: {
    type: String as PropType<'circle' | 'square'>,
    default: 'circle',
    required: false
  },

  /**
   * @description 设置头像的大小，支持 extra-extra-small、extra-small、small、default、medium、large、extra-large 和 合法的 width 属性值例如 "10px"
   */
  size: {
    type: [String] as PropType<AvatarSizeType>,
    default: 'medium',
    required: false
  }
}

export const avatarSlots = ['hoverMask1', 'topSlot1', 'bottomSlot1']

export const avatarEmits = {
  /**
   * @description 点击回调函数
   */
  click: (e: Event) => void e,

  /**
   * @description 图片加载失败的事件，返回 false 会关闭组件默认的 fallback 行为
   */
  error: (e: Event) => {
    return isBoolean(e)
  },

  /**
   * @description MouseEnter 事件的回调
   */
  mouseEnter: (e: Event) => void e,

  /**
   * @description MouseLeave 事件的回调
   */
  MouseLeave: (e: Event) => void e
}

/**
 * @description 头像group组件的属性
 */
export const groupProps = {
  /**
   * @description 最大数量限制，超出后显示+N
   */
  maxCount: {
    type: Number,
    default: 20,
    required: false
  },
  /**
   * @description 设置头像覆盖方向，支持 start, end
   */
  overlapFrom: {
    type: String as PropType<'start' | 'end'>,
    default: 'start',
    required: false
  },
  /**
   * @description 自定义渲染 more 标签
   */
  renderMore: {
    type: [String, Object, Function, null] as PropType<string | VNode | (() => VNode) | null>,
    default: () => {},
    required: false
  },
  /**
   * @description 指定头像的形状，支持circle、square
   */
  shape: {
    type: String as PropType<'circle' | 'square'>,
    default: 'circle',
    required: false
  },
  /**
   * @description 设置头像的大小，支持 extra-extra-small、extra-small、small、default、medium、large、extra-large 和 合法的 width 属性值例如 "10px"
   */
  size: {
    type: [String, Number] as PropType<AvatarSizeType | number>,
    default: 'medium',
    required: false
  },
  /**
   * @description 是否支持展开
   */
  spread: {
    type: Boolean,
    default: false,
    required: false
  }
}
