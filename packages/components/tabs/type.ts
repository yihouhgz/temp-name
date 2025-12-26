import type { CSSProperties, PropType } from 'vue'
import type { DropdownProps } from '../dropdown/dropdown'
import type { VueNode } from '../_util/type'
import type { ExtractPublicPropTypes } from 'vue'
import { isBoolean, isObject, isString } from '../_util'
export type OverflowItem = {
  node: 'title' | 'item' | 'divider'
}
export const tabsProps = {
  /**
   * @property 当前激活的 tab 页的 itemKey 值
   */
  activeKey: {
    type: String,
    default: undefined
  },
  /**
   * @property 折叠模式下，左右切换箭头渲染位置
   */
  arrowPosition: {
    values: ['start', 'end', 'both'],
    default: 'start'
  },
  /**
   * @property 折叠的 Tabs
   */
  collapsible: {
    type: Boolean,
    default: false
  },
  /**
   * @property 用于在折叠模式下透传参数到下拉菜单的 Dropdown 组件
   */
  dropdownProps: {
    type: Object as PropType<DropdownProps>,
    default: () => ({})
  },
  /**
   * @property 整体滚动区域 Style
   */
  visibleTabsStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => ({})
  },
  /**
   * @property 内容区域外层样式对象
   */
  contentStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => ({})
  },
  /**
   * @property 初始化选中的 tab 页的 key 值
   */
  defaultActiveKey: {
    type: String,
    default: ''
  },
  /**
   * @property 使用 TabPane 写法时是否渲染隐藏面板的 DOM 结构
   */
  keepDOM: {
    type: Boolean,
    default: true
  },
  /**
   * @property 懒渲染，仅当面板激活过才被渲染在 DOM 树中
   */
  lazyRender: {
    type: Boolean,
    default: false
  },
  /**
   * @property 将一部分 Tab 渲染到下拉菜单中
   */
  more: {
    type: [Number, Object] as PropType<
      number | { count: number; render: () => VueNode; dropdownProps: DropdownProps }
    >,
    default: undefined
  },
  /**
   * @property 用于二次封装标签栏
   */
  renderTabBar: {
    type: Function as PropType<
      (
        items: OverflowItem[],
        pos: 'start' | 'end',
        handleArrowClick: () => void,
        defaultNode: VueNode
      ) => VueNode
    >
  },
  /**
   * @property 指示浏览器是否应滚动文档以显示新聚焦的元素，作用于组件内的 focus 方法
   */
  preventScroll: {
    type: Boolean,
    default: false
  },
  /**
   * @property 是否将收起的 Tab 展示在下拉菜单中（仅当 collapsible 为 true 时生效）
   */
  showRestInDropdown: {
    type: Boolean,
    default: false
  },

  size: {
    type: String as PropType<'large' | 'medium' | 'small'>,
    values: ['large', 'medium', 'small'],
    default: 'medium'
  },
  /**
   * @property 用于扩展标签栏的内容
   */
  tabBarExtraContent: {
    type: [String, Object, Function] as PropType<VueNode>,
    default: undefined
  },
  /**
   * @property 标签页对象组成的数组，该对象支持 itemKey（对应 activeKey，tab（标签页文字）及 icon（标签页图标）
   */
  tabList: {
    type: Array as PropType<Array<ExtractPublicPropTypes<typeof tabPaneProps>>>,
    default: () => []
  },
  /**
   * @property 	是否使用动画切换 tabs
   */
  tabPaneMotion: {
    type: Boolean,
    default: true
  },
  /**
   * @property tab 的位置，支持top(水平), left(垂直)
   */
  tabPosition: {
    type: String as PropType<'top' | 'left'>,
    values: ['top', 'left'],
    default: 'top'
  },
  /**
   * @property 	标签栏的样式，可选line、 card、 button、slash
   */
  type: {
    type: String as PropType<'line' | 'card' | 'button' | 'slash'>,
    values: ['line', 'card', 'button', 'slash'],
    default: 'line'
  }
}
export const tabsEmits = {
  /**
   * @property 点击标签时触发
   */
  tabClick: (key: string, e: Event) => isString(key) && e instanceof Event,
  /**
   * @property 	切换 tab 页时的回调函数
   */
  change: (activeKey: string) => isString(activeKey),
  /**
   * @property 	关闭 tab 页时的回调函数
   */
  tabClose: (key: string) => isString(key),
  /**
   * @property 	折叠滚动模式下，溢出项切换变化回调
   */
  visibleTabsChange: (visibleState: Record<string, boolean>) => {
    return isObject(visibleState) && Object.values(visibleState).every(isBoolean)
  }
}

export const tabPaneProps = {
  /**
   * @property 	对应 activeKey
   */
  itemKey: {
    type: String,
    default: '',
    required: true
  },
  /**
   * @property 	标签页栏是否禁用
   */
  disabled: {
    type: Boolean,
    default: false
  },
  /**
   * @property 	标签页栏的类名
   */
  className: {
    type: String,
    default: ''
  },
  /**
   * @property 	标签页栏 icon
   */
  icon: {
    type: [String, Object, Function] as PropType<VueNode>,
    default: undefined
  },
  /**
   * @property 	样式对象
   */
  style: {
    type: Object as PropType<CSSProperties>,
    default: () => ({})
  },
  /**
   * @property 	标签页栏显示文字
   */
  tab: {
    type: [String, Object, Function] as PropType<VueNode>,
    default: undefined
  },
  /**
   * @property 	允许关闭 tab
   */
  closable: {
    type: Boolean,
    default: false
  }
}
