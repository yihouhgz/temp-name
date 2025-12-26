import type { CSSProperties, PropType } from 'vue'
import type { VueNode } from '../_util/type'
import { isBoolean, isString } from '../_util'

export type FooterType = {
  //子元素
  children?: VueNode
  //最外层样式
  style?: CSSProperties
  //最外层样式名
  className?: string | string[]
  //是否展示底部“收起侧边栏”按钮，mode="vertical" 且 Footer 组件的 children 参数为空才有效果
  collapseButton?: VueNode | false
  //“收起”按钮的文案
  collapseText?: (collapsed: boolean) => VueNode
  //点击事件回调
  onClick?: (e: MouseEvent) => void
}
export const footerProps = {
  children: {
    type: [String, Object, Array] as PropType<VueNode>,
    default: undefined
  },
  collapseButton: {
    type: [Boolean, String, Object, Array] as PropType<VueNode | false>,
    default: false
  },
  collapseText: {
    type: Function as PropType<(collapsed: boolean) => VueNode>,
    default: null
  }
}
export const footerEmits = {
  //点击事件回调
  click: (e: MouseEvent) => e instanceof MouseEvent
}

export type HeaderType = {
  //子元素
  children?: VueNode
  //最外层样式
  style?: CSSProperties
  //最外层样式名
  className?: string | string[]
  //导航项 href 链接，传入时导航项整体会包裹一个 a 标签
  link?: string
  //透传给 a 标签的参数
  linkOptions?: object
  //Logo
  logo?: VueNode
  //Logo 文案
  text?: VueNode
}
export const headerProps = {
  children: {
    type: [String, Object, Function] as PropType<VueNode>,
    default: undefined
  },
  link: {
    type: String,
    default: ''
  },
  linkOptions: {
    type: Object,
    default: () => ({})
  },
  logo: {
    type: [String, Object, Function] as PropType<VueNode>,
    default: undefined
  },
  text: {
    type: [String, Object, Function] as PropType<VueNode>,
    default: undefined
  }
}

export type Item = {
  //是否禁用
  disabled?: boolean
  //导航项目图标
  icon?: VueNode
  //如果 icon 为空，是否保留其占位，仅对一级导航生效
  indent?: boolean
  //导航项目唯一 key
  itemKey: string
  //当前项所在嵌套层级，limitIndent 为 true时，用于自定义缩进位置
  level?: number
  //导航项 href 链接，传入时导航项整体会包裹一个 a 标签
  link?: string
  //透传给 a 标签的参数
  linkOptions?: object
  //导航项目文案或元素
  text?: VueNode
  onClick?: ({
    itemKey,
    domEvent,
    isOpen
  }: {
    itemKey: string
    domEvent: MouseEvent
    isOpen: boolean
  }) => void
  onMouseEnter?: (e: MouseEvent) => void
  onMouseLeave?: (e: MouseEvent) => void
}

export const itemProps = {
  /**
   * @description 是否禁用
   */
  disabled: {
    type: Boolean,
    default: false
  },
  /**
   * @description 导航项目图标
   */
  icon: {
    type: [String, Object, Function] as PropType<VueNode>,
    default: null
  },
  /**
   * @description 如果 icon 为空，是否保留其占位，仅对一级导航生效
   */
  indent: {
    type: Boolean,
    default: false
  },
  /**
   * @description 导航项目唯一 key
   */
  itemKey: {
    type: String,
    default: ''
  },
  /**
   * @description 当前项所在嵌套层级，limitIndent 为 true时，用于自定义缩进位置
   */
  level: {
    type: Number,
    default: 0
  },
  /**
   * @description 导航项 href 链接，传入时导航项整体会包裹一个 a 标签
   */
  link: {
    type: String,
    default: ''
  },
  /**
   * @description 透传给 a 标签的参数
   */
  linkOptions: {
    type: Object,
    default: () => ({})
  },
  /**
   * @description 导航项目文案或元素
   */
  text: {
    type: [String, Object, Function] as PropType<VueNode>,
    default: undefined
  }
}
export const itemEmits = {
  click: ({
    itemKey,
    domEvent,
    isOpen
  }: {
    itemKey: string
    domEvent: MouseEvent
    isOpen: boolean
  }) => {
    return isString(itemKey) && domEvent instanceof MouseEvent && isBoolean(isOpen)
  },
  mouseEnter: (event: MouseEvent) => {
    return event instanceof MouseEvent
  },
  mouseLeave: (event: MouseEvent) => {
    return event instanceof MouseEvent
  }
}

export type Sub = {
  //是否禁用
  disabled?: boolean
  //弹出层 dropdown 参数配置
  dropdownProps?: object
  //弹出层的 style
  dropdownStyle?: object
  //导航项目图标
  icon?: VueNode
  //如果 icon 为空，是否保留其占位，仅对一级导航生效
  indent?: boolean
  //是否处于收起状态的受控属性，仅 mode = "vertical"
  isCollapsed?: boolean
  //是否打开
  isOpen?: boolean
  //导航项的 key
  itemKey: string
  //当前项所在嵌套层级，limitIndent 为 true时，用于自定义缩进位置
  level?: number
  //最大高度
  maxHeight?: number
  //导航项目文案或组件
  text?: VueNode
  items: string[] | Item[] | Sub[]
  onMouseEnter?: (e: MouseEvent) => void
  onMouseLeave?: (e: MouseEvent) => void
}

export const subProps = {
  /**
   * @description 是否禁用
   */
  disabled: {
    type: Boolean,
    default: false
  },
  /**
   * @description 弹出层 dropdown 参数配置
   */
  dropdownProps: {
    type: Object,
    default: () => ({})
  },
  /**
   * @description 弹出层样式
   */
  dropdownStyle: {
    type: Object,
    default: () => ({})
  },
  /**
   * @description 导航项目图标
   */
  icon: {
    type: [String, Object, Function] as PropType<VueNode>,
    default: null
  },
  /**
   * @description 如果 icon 为空，是否保留其占位，仅对一级导航生效
   */
  indent: {
    type: Boolean,
    default: false
  },
  /**
   * @description 是否处于收起状态的受控属性，仅 mode = "vertical"
   */
  isCollapsed: {
    type: Boolean,
    default: false
  },
  /**
   * @description 是否打开
   */
  isOpen: {
    type: Boolean,
    default: false
  },
  /**
   * @description 导航项目唯一 key
   */
  itemKey: {
    type: String,
    default: ''
  },
  /**
   * @description 当前项所在嵌套层级，limitIndent 为 true时，用于自定义缩进位置
   */
  level: {
    type: Number,
    default: 0
  },
  /**
   * @description 最大高度
   */
  maxHeight: {
    type: Number,
    default: 999
  },
  /**
   * @description 导航项目文案或组件
   */
  text: {
    type: [Function, Object, String] as PropType<VueNode>,
    default: undefined
  }
}
export const subEmits = {
  mouseEnter: (e: MouseEvent) => e instanceof MouseEvent,
  mouseLeave: (e: MouseEvent) => e instanceof MouseEvent
}

export const navProps = {
  /**
   * @property 导航项列表的自定义样式
   */
  bodyStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => ({})
  },
  /**
   * @property 默认是否处于收起状态，仅 mode = "vertical" 时有效
   */
  defaultIsCollapsed: {
    type: Boolean,
    default: false
  },
  /**
   * @property 初始打开的子导航 itemKey 数组，仅 mode = "vertical" 且侧边栏处于展开状态时有效
   */
  defaultOpenKeys: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  /**
   * @property 初始选中的导航项 itemKey 数组
   */
  defaultSelectedKeys: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  /**
   * @property 用于控制 horizontal 或者 vertical && isCollapsed 下 nav.sub 中的 dropdown 参数
   */
  subDropdownProps: {
    type: Object,
    default: () => {}
  },
  /**
   * @property 默认下拉箭头Icon
   */
  expandIcon: {
    type: [Object, Function, String] as PropType<VueNode>,
    default: null
  },
  /**
   * @property 默认展开的子菜单 key 数组
   */
  footer: {
    type: [Object, Function, String] as PropType<VueNode | FooterType>,
    default: null
  },
  /**
   * @property 垂直 Nav 折叠或 水平 Nav中 Dropdown 的 getPopupContainer 配置，可指定弹出层容器 这会改变浮层 DOM 树位置，但不会改变视图渲染位置。 v>=2.24.0
   */
  getPopupContainer: {
    type: Function as PropType<(node: HTMLElement) => HTMLElement>,
    default: () => document.body
  },
  /**
   * @property 头部区域配置对象或元素
   */
  header: {
    type: [Object, Function, String] as PropType<VueNode | HeaderType>,
    default: null
  },
  /**
   * @property 是否处于收起状态的受控属性，仅 mode = "vertical" 时有效
   */
  isCollapsed: {
    type: Boolean,
    default: undefined
  },
  /**
   * @property 导航项目列表，每一项可以继续带有 items 属性。如果为 string 数组，则会取每一项作为 text 和 itemKey
   */
  items: {
    type: Array as PropType<string[] | Item[] | Sub[]>
  },
  /**
   * @property 解除缩进限制，可使用 level 自定义导航项缩进，水平模式只能为true
   */
  limitIndent: {
    type: Boolean,
    default: true
  },
  /**
   * @property 导航类型，目前支持横向与竖直，可选值：vertical或horizontal
   */
  mode: {
    type: String as PropType<'horizontal' | 'vertical'>,
    values: ['horizontal', 'vertical'],
    default: 'vertical'
  },
  /**
   * @property 受控的打开的子导航 itemKey 数组，配合 onOpenChange 回调控制子导航项展开，仅 mode = "vertical" 且侧边栏处于展开状态时有效
   */
  openKeys: {
    type: Array as PropType<string[]>,
    default: undefined
  },
  /**
   * @property 自定义导航项外层组件
   */
  renderWrapper: {
    type: Boolean,
    default: true
  },
  /**
   * @property 受控的导航项 itemKey 数组，配合 onSelect 回调控制导航项选择
   */
  selectedKeys: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  /**
   * @property 子导航浮层关闭的延迟。collapse 为 true 或 mode 为 "horizontal" 时有效，单位为 ms
   */
  subNavCloseDelay: {
    type: Number,
    default: 300
  },
  /**
   * @property 子导航折叠动画
   */
  subNavMotion: {
    type: Boolean,
    default: true
  },
  /**
   * @property 子导航浮层显示的延迟。collapse 为 true 或 mode 为 "horizontal" 时有效，单位为 ms
   */
  subNavOpenDelay: {
    type: Number,
    default: 300
  },
  /**
   * @property 带有子导航项的的父级导航项箭头位置，可选 left或 right
   */
  toggleIconPosition: {
    type: String as PropType<'left' | 'right'>,
    default: 'right'
  },
  /**
   * @property tooltip 隐藏的延迟，collapse 为 true 时有效，单位为 ms
   */
  tooltipHideDelay: {
    type: Number,
    default: 100
  },
  /**
   * @property tooltip 显示的延迟，collapse 为 true 时有效，单位为 ms
   */
  tooltipShowDelay: {
    type: Number,
    default: 0
  }
}

export const navEmits = {
  /**
   * @description 点击任意导航项时触发
   */
  click({ itemKey, domEvent, isOpen }: { itemKey: string; domEvent: MouseEvent; isOpen: boolean }) {
    return isString(itemKey) && domEvent instanceof MouseEvent && isBoolean(isOpen)
  },
  /**
   * @description 收起状态变化时的回调
   */
  collapseChange(isCollapsed: boolean) {
    return isBoolean(isCollapsed)
  },

  openChange({
    itemKey,
    openKeys,
    domEvent,
    isOpen
  }: {
    itemKey: string
    openKeys: string[]
    domEvent: MouseEvent
    isOpen: boolean
  }) {
    return (
      isString(itemKey) &&
      Array.isArray(openKeys) &&
      domEvent instanceof MouseEvent &&
      isBoolean(isOpen)
    )
  },
  select({
    itemKey,
    selectedKeys,
    selectedItems,
    domEvent,
    isOpen
  }: {
    itemKey: string
    selectedKeys: string[]
    selectedItems: Item[]
    domEvent: MouseEvent
    isOpen: boolean
  }) {
    return (
      isString(itemKey) &&
      Array.isArray(selectedKeys) &&
      Array.isArray(selectedItems) &&
      domEvent instanceof MouseEvent &&
      isBoolean(isOpen)
    )
  }
}
