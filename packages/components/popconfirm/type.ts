import type { PropType } from 'vue'
import type { ButtonPublicPropTypes } from '../button/button'
import { buttonTypeValues, type ButtonProps } from '../button/type'
import type { VueNode } from '../_util/type'
import { isBoolean } from '../_util'
export const popconfirmProps = {
  /**
   * @description “小三角”是否指向元素中心，需要同时传入"showArrow=true"
   */
  arrowPointAtCenter: {
    type: Boolean,
    default: false
  },
  /**
   * @description 是否显示箭头三角形
   */
  showArrow: {
    type: Boolean,
    default: false
  },
  /**
   * @description 取消按钮文字
   */
  cancelText: {
    type: String,
    default: '取消'
  },
  /**
   * @description 取消按钮的 props
   */
  cancelButtonProps: {
    type: Object as PropType<ButtonPublicPropTypes>,
    default: () => ({})
  },
  /**
   * @description 取消按钮类型
   */
  cancelType: {
    type: String as PropType<ButtonProps['type']>,
    values: buttonTypeValues,
    default: 'tertiary'
  },
  /**
   * @description 确认按钮文字
   */
  okText: {
    type: String,
    default: '确定'
  },
  /**
   * @description 确认按钮类型
   */
  okType: {
    type: String as PropType<ButtonProps['type']>,
    values: buttonTypeValues,
    default: 'primary'
  },
  /**
   * @description 确认按钮的 props
   */
  okButtonProps: {
    type: Object as PropType<ButtonPublicPropTypes>,
    default: () => ({})
  },
  /**
   * @description 在 trigger 聚焦时或在弹出层内聚焦元素上按 Esc 键是否关闭面板，受控时不生效
   */
  closeOnEsc: {
    type: Boolean,
    default: true
  },
  /**
   * @description 显示的内容 VNode|({ initialFocusRef }) => VNode
   */
  content: {
    type: [String, Object, Function, null] as PropType<
      VueNode | (({ initialFocusRef }: { initialFocusRef: () => void }) => VueNode)
    >,
    default: null
  },
  /**
   * @description 气泡框默认是否展示
   */
  defaultVisible: {
    type: Boolean,
    default: false
  },
  /**
   * @description 点击 Popconfirm 子元素是否禁止弹出气泡确认框
   */
  disabled: {
    type: Boolean,
    default: false
  },
  /**
   * @description 指定父级 DOM，弹层将会渲染至该 DOM 中，自定义时容器需要设置 position: relative 这会改变浮层 DOM 树位置，但不会改变视图渲染位置。
   */
  getPopupContainer: {
    type: Function as PropType<(triggerNode: HTMLElement) => HTMLElement>,
    default: () => () => document.body
  },
  /**
   * @description 当焦点处于弹出层内时，切换 Tab 是否让焦点在弹出层内循环
   */
  guardFocus: {
    type: Boolean,
    default: true
  },
  /**
   * @description 自定义弹出气泡 Icon 图标
   */
  icon: {
    type: [String, Object, Function, null] as PropType<VueNode>,
    default: null
  },
  /**
   * @description 动画
   */
  motion: {
    type: Boolean,
    default: true
  },
  /**
   * @description 方向，可选值：top,topLeft,topRight,left,leftTop,leftBottom,right,rightTop,rightBottom,bottom,bottomLeft,bottomRight
   */
  position: {
    values: [
      'top',
      'topLeft',
      'topRight',
      'left',
      'leftTop',
      'leftBottom',
      'right',
      'rightTop',
      'rightBottom',
      'bottom',
      'bottomLeft',
      'bottomRight'
    ] as const,
    default: 'bottomLeft'
  },
  /***
   * @description 按下 Esc 键后，焦点是否回到 trigger 上，只有设置 trigger 为 click 时生效
   */
  returnFocusOnClose: {
    type: Boolean,
    default: true
  },
  /**
   * @description 是否阻止弹层上的点击事件冒泡
   */
  stopPropagation: {
    type: Boolean,
    default: true
  },
  /**
   * @description 显示的标题
   */
  title: {
    type: [String, Object, Function, null] as PropType<VueNode>,
    default: null
  },
  /**
   * @description 触发展示的时机，可选值：hover / focus / click / custom
   */
  trigger: {
    type: String as PropType<'hover' | 'focus' | 'click' | 'custom'>,
    values: ['hover', 'focus', 'click', 'custom'],
    default: 'click'
  },
  /**
   * @description 气泡框是否展示的受控属性 trigger = 'custom' 生效
   */
  visible: {
    type: Boolean,
    default: false
  },
  /**
   * @description 弹层 z-index
   */
  zIndex: {
    type: Number,
    default: 1030
  }
}

export const popconfirmEmits = {
  /**
   * @description 弹出层展示/隐藏时触发的回调
   */
  visibleChange: (visible: boolean) => isBoolean(visible),
  /**
   * @description 点击确认按钮时触发
   */
  confirm: (e: Event) => e instanceof Event,
  /**
   * @description 点击取消按钮时触发
   */
  cancel: (e: Event) => e instanceof Event,
  /**
   * @description 当弹出层处于展示状态，点击非 Children、非浮层内部区域时的回调
   */
  clickOutSide: (e: Event) => e instanceof Event,
  /**
   * @description 在 trigger 或弹出层按 Esc 键时调用
   */
  escKeyDown: (e: Event) => e instanceof Event
}
