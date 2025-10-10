import type { PropType } from 'vue'

export const dragMoveProps = {
  /**
   * @description 点击原生 input/textarea 时是否允许拖动
   */
  allowInputDrag: {
    type: Boolean,
    default: false,
    required: false
  },

  /**
   * @description 点击/触摸时是否允许拖动的判断函数
   */
  allowMove: {
    type: Function as PropType<(event: MouseEvent | TouchEvent, element: HTMLElement) => boolean>,
    default: () => true,
    required: false
  },

  /**
   * @description 返回限制可拖拽的范围的元素
   */
  constrainer: {
    type: Function as PropType<() => HTMLElement>,
    default: undefined,
    required: false
  },

  /**
   * @description 自定义拖动后的位置处理
   */
  customMove: {
    type: Function as PropType<(element: HTMLElement, top: number, left: number) => void>,
    default: undefined,
    required: false
  },

  /**
   * @description 返回触发拖动的元素
   */
  handler: {
    type: Function as PropType<() => HTMLElement>,
    default: undefined,
    required: false
  }
}

export const dragMoveEmits = {
  /**
   * @description 鼠标按下时的回调
   */
  mouseDown: (event: MouseEvent) => event instanceof Event,

  /**
   * @description 鼠标移动时的回调
   */
  mouseMove: (event: MouseEvent) => event instanceof Event,

  /**
   * @description 鼠标抬起时的回调
   */
  mouseUp: (event: MouseEvent) => event instanceof Event,

  /**
   * @description 触摸取消时的回调
   */
  touchCancel: (event: TouchEvent) => event instanceof Event,

  /**
   * @description 触摸结束时的回调
   */
  touchEnd: (event: TouchEvent) => event instanceof Event,

  /**
   * @description 触摸移动时的回调
   */
  touchMove: (event: TouchEvent) => event instanceof Event,

  /**
   * @description 触摸开始时的回调
   */
  touchStart: (event: TouchEvent) => event instanceof Event
}
