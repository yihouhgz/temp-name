import type { PropType } from 'vue'
import type { VueNode } from '../_util/type'
import type { HtmlHTMLAttributes } from 'vue'
import { isNumber } from '../_util'

type ArrowButton = {
  props: HtmlHTMLAttributes
  children: VueNode
}

export const carouselProps = {
  /**
   * @property 受控属性
   */
  activeIndex: {
    type: Number,
    default: undefined
  },
  /**
   * @property 切换动画，可选值：fade，slide
   */
  animation: {
    type: String as PropType<'fade' | 'slide'>,
    default: 'slide'
  },
  /**
   * @property 箭头参数，用于自定义箭头样式和点击事件
   */
  arrowProps: {
    type: Object as PropType<{
      leftArrow?: ArrowButton
      rightArrow?: ArrowButton
    }>,
    default: undefined
  },
  /**
   * @property 是否自动循环展示，或者传入 { interval: 自动切换时间间隔(默认: 2000), hoverToPause: 鼠标悬浮时是否暂停自动切换(默认: true) }
   */
  autoPlay: {
    type: [Boolean, Object] as PropType<boolean | { interval?: number; hoverToPause?: boolean }>,
    default: true
  },
  /**
   * @property 初始化时默认展示的索引
   */
  defaultActiveIndex: {
    type: Number,
    default: 0
  },
  /**
   * @property 指示器位置，可选值有： left、center、right
   */
  indicatorPosition: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'center'
  },
  /**
   * @property 指示器尺寸，可选值有： small、medium
   */
  indicatorSize: {
    type: String as PropType<'small' | 'medium'>,
    default: 'small'
  },
  /**
   * @property 指示器类型，可选值有： dot、line、columnar
   */
  indicatorType: {
    type: String as PropType<'dot' | 'line' | 'columnar'>,
    default: 'dot'
  },
  /**
   * @property 指示器和箭头主题，可选值有： primary、light、dark
   */
  theme: {
    type: String as PropType<'primary' | 'light' | 'dark'>,
    default: 'light'
  },
  /**
   * @property 箭头展示时机，可选值有： hover、always
   */
  arrowType: {
    type: String as PropType<'always' | 'hover'>,
    default: 'always'
  },
  /**
   * @property 是否展示箭头
   */
  showArrow: {
    type: Boolean,
    default: true
  },
  /**
   * @property 是否展示指示器
   */
  showIndicator: {
    type: Boolean,
    default: true
  },
  /**
   * @property 动画效果为slide时的滑动的方向，可选值有： left、right
   */
  slideDirection: {
    type: String as PropType<'left' | 'right'>,
    default: 'left'
  },
  /**
   * @property 切换速度，单位为毫秒
   */
  speed: {
    type: Number,
    default: 300
  },
  /**
   * @property 指示器触发的时机，可选值有： hover、click
   */
  trigger: {
    type: String as PropType<'click' | 'hover'>,
    default: 'click'
  }
}

export const carouselEmits = {
  /**
   * @property 切换时触发
   */
  change: (index: number, preIndex: number) => isNumber(index) && isNumber(preIndex)
}

export type CarouselRef = {
  stop: () => void
  play: () => void
  goTo: (targetIndex: number) => void
  prev: () => void
  next: () => void
}
