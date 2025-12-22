import type { PropType } from 'vue'
import type { VueNode } from '../_util/type'
import { isString } from '../_util'

export const collapseProps = {
  /**
   * @description 手风琴模式
   */
  accordion: {
    type: Boolean,
    default: false
  },
  /**
   * @description 受控属性, 当前展开的面板的 key
   */
  activeKey: {
    type: [String, Array] as PropType<string | string[]>,
    default: ''
  },
  /**
   * @description 点击 Header 展开收起，否则只响应点击箭头
   */
  clickHeaderToExpand: {
    type: Boolean,
    default: true
  },
  /**
   * @description 自定义折叠图标
   */
  collapseIcon: {
    type: [Function, Object, String] as PropType<VueNode>,
    default: null
  },
  /**
   * @description 初始化选中面板的 key
   */
  defaultActiveKey: {
    type: [String, Array] as PropType<string | string[]>,
    default: ''
  },
  /**
   * @description 自定义展开图标
   */
  expandIcon: {
    type: [Function, Object, String] as PropType<VueNode>,
    default: null
  },
  /**
   * @description 展开图标位置
   */
  expandIconPosition: {
    values: ['left', 'right'] as const,
    default: 'left'
  },
  /**
   * @description 是否保留隐藏的面板 DOM 树，默认销毁
   */
  keepDOM: {
    type: Boolean,
    default: false
  },
  /**
   * @description 是否开启动画
   */
  motion: {
    type: Boolean,
    default: true
  },
  /**
   * @description 配合 keepDOM 使用，为 true 时挂载时不会渲染组件
   */
  lazyRender: {
    type: Boolean,
    default: false
  }
}
export const collapseEmits = {
  /**
   * @description 切换面板的回调
   */
  update: (activeKey: string | string[], e: Event) => {
    return (isString(activeKey) || Array.isArray(activeKey)) && e instanceof Event
  }
}

export const collapsibleProps = {
  /**
   * @description 是否禁用
   */
  disabled: {
    type: Boolean,
    default: false
  },
  /**
   * @description 自定义渲染每个面板右上角的辅助内容（仅当 header 为 string 时生效）
   */
  extra: {
    type: [Function, Object, String] as PropType<VueNode>,
    default: null
  },
  /**
   * @description 面板头内容
   */
  header: {
    type: [Function, Object, String] as PropType<VueNode>,
    default: null
  },
  /**
   * @description 必填且唯一，选中状态匹配 activeKey，defaultActiveKey
   */
  itemKey: {
    type: String,
    default: '',
    required: true
  },
  /**
   * @description 当 reCalcKey 改变时，将重新计算子节点的高度，用于优化动态渲染时的计算
   */
  reCalcKey: {
    type: [String, Number],
    default: ''
  },
  /**
   * @description 是否显示箭头
   */
  showArrow: {
    type: Boolean,
    default: true
  }
}

export const collapsibleEmits = {
  motionEnd: () => {},
  motionStart: () => {}
}
