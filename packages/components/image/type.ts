import type { CSSProperties, PropType } from 'vue'
import type { VueNode } from '../_util/type'

export const imageProps = {
  /**
   * @description 图片的描述
   */
  alt: {
    type: String,
    default: ''
  },
  /**
   * @description 透传给原生 img 标签的 crossorigin
   */
  crossOrigin: {
    type: String as PropType<'anonymous' | 'use-credentials'>,
    default: ''
  },
  /**
   * @description 加载失败容错地址或者自定义加载失败时的显示内容
   */
  fallback: {
    type: [String, Object, Function, null] as PropType<VueNode>,
    default: null
  },
  /**
   * @description 图片高度
   */
  height: {
    type: [Number, String] as PropType<number | `${number}%` | `${number}px`>
  },
  /**
   * @description 图片宽度
   */
  width: {
    type: [Number, String] as PropType<number | `${number}%` | `${number}px`>
  },
  /**
   * @description 自定义样式类名，透传给 img 节点
   */
  imgCls: {
    type: String
  },
  /**
   * @description 自定义样式，透传给 img 节点
   */
  imgStyle: {
    type: [String, Object] as PropType<CSSProperties>,
    default: () => ({})
  },
  /**
   * @description 图片未加载时候的占位内容
   */
  placeholder: {
    type: [String, Object, Function, null] as PropType<VueNode>
  },
  /**
   * @description 图片加载失败时候的占位内容
   */
  preview: {
    type: [Boolean, Object] as PropType<boolean | PreviewConfigType>
  },
  /**
   * @description 图片地址
   */
  src: {
    type: String,
    default: ''
  },
  /**
   * @description 设置图片下载名称
   */
  setDownloadName: {
    type: [String, Function] as PropType<string | ((src: string) => string)>,
    default: ''
  }
}
export const imageEmits = {
  /**
   * @description 点击图片
   */
  click: (e: MouseEvent) => e instanceof MouseEvent,
  /**
   * @description 图片加载失败
   */
  error: (e: Event) => e instanceof Event,
  /**
   * @description 图片加载成功
   */
  load: (e: Event) => e instanceof Event
}

export const previewProps = {}
type PreviewConfigType = typeof previewProps
