import type { PropType } from 'vue'
import type { VueNode } from '../_util/type'
import { omitKeys } from '../_util'
import type { TooltipProps } from '../tooltip/tooltip'
import type { PopoverProps } from '../popover/popover'
export type CopyableConfigType = {
  /**
   * @description 复制出的文本
   */
  content: string
  /**
   * @description 复制图标的 tooltip 展示内容
   */
  copyTip: VueNode
  /**
   * @description 自定义渲染复制节点
   */
  icon: VueNode
  /**
   * @description 点击复制的回调函数
   */
  onCopy: (e: Event, content: string, res: boolean) => void
  /**
   * 自定义渲染复制节点
   */
  render: (copied: boolean, doCopy: (e: MouseEvent) => void, configs: CopyableConfigType) => VueNode
  /**
   * @description 复制成功的展示内容
   */
  successTip: VueNode
}
export type EllipsisConfigType = {
  /**
   * @description 折叠的展示文本
   */
  collapseText: string
  /**
   * @description 是否可折叠
   */
  collapsible: boolean
  /**
   * @description 展开的展示文本
   */
  expandText: string
  /**
   * @description 是否可展开
   */
  expandable: boolean

  /**
   * @description 省略截断的位置，支持末尾和中间截断：end, middle
   */
  pos: 'end' | 'middle'

  /**
   * @description 省略溢出行数
   */
  rows: number

  showTooltip:
    | boolean
    | {
        type: 'tooltip' | 'popover'
        opts: TooltipProps | PopoverProps
        renderTooltip: (content: VueNode, children: VueNode) => VueNode
      }

  /**
   * @description 始终展示的后缀
   */
  suffix: string

  /**
   * @description 展开/收起的回调
   */
  onExpand: (expanded: boolean, e: Event) => void
}

export const textProps = {
  /**
   * @description 自定义渲染元素
   */
  component: {
    type: String as PropType<keyof HTMLElementTagNameMap>,
    default: 'span'
  },
  /**
   * @description 是否被 code 元素包裹
   */
  code: {
    type: Boolean,
    default: false
  },
  /**
   * @description 是否可拷贝
   */
  copyable: {
    type: [Boolean, Object] as PropType<boolean | CopyableConfigType>,
    default: false
  },
  /**
   * @description 添加删除线样式
   */
  delete: {
    type: Boolean,
    default: false
  },
  /**
   * @description 禁用样式
   */
  disabled: {
    type: Boolean,
    default: false
  },
  /**
   * @description 设置自动溢出省略
   */
  ellipsis: {
    type: [Boolean, Object] as PropType<boolean | EllipsisConfigType>,
    default: false
  },
  icon: {
    type: [Function, Object] as PropType<VueNode>,
    default: null
  },
  /**
   * @description 是否为链接，传object时，属性将透传给a标签
   */
  link: {
    type: [Boolean, Object],
    default: false
  },
  /**
   * @description 添加标记样式
   */
  mark: {
    type: Boolean,
    default: false
  },
  /**
   * @description 添加粗体样式
   */
  strong: {
    type: Boolean,
    default: false
  },
  /**
   * @description 文本大小，可选normal，small，inherit
   */
  size: {
    values: ['normal', 'small', 'inherit'] as const,
    default: 'normal'
  },
  /**
   * @description 文本类型
   */
  type: {
    values: [
      'primary',
      'success',
      'warning',
      'danger',
      'secondary',
      'tertiary',
      'quaternary'
    ] as const,
    default: 'primary'
  },
  /**
   * @description 添加下划线样式
   */
  underline: {
    type: Boolean,
    default: false
  },
  /**
   * @description 设置字重, 可选 light, regular, medium, semibold, bold, default
   */
  weight: {
    values: ['light', 'regular', 'medium', 'semibold', 'bold', 'default'] as const,
    default: 'default'
  }
}

export const titleProps = Object.assign(
  omitKeys(textProps, ['component', 'icon', 'strong', 'size']),
  {
    /**
     * @description 自定义渲染元素，默认由 heading 决定
     */
    component: {
      type: String as PropType<keyof HTMLElementTagNameMap>,
      default: null
    },
    /**
     * @description 标题级别，可选1， 2， 3，4，5，6，对应相应的标题
     */
    heading: {
      values: [1, 2, 3, 4, 5, 6] as const,
      default: 1
    }
  }
)

export const paragraphProps = Object.assign(omitKeys(textProps, ['component', 'icon', 'weight']), {
  /**
   * @description 自定义渲染元素
   */
  component: {
    type: Object as PropType<HTMLElement>,
    default: () => document.createElement('p')
  },
  /**
   * @description 行距大小，可选normal，extended
   */
  spacing: {
    values: ['normal', 'extended'] as const,
    default: 'normal'
  }
})

export const numeralProps = Object.assign(textProps, {
  /**
   * @description 解析规则，可选 text, numbers, bytes-decimal, bytes-binary, percentages, exponential
   */
  rule: {
    values: [
      'text',
      'numbers',
      'bytes-decimal',
      'bytes-binary',
      'percentages',
      'exponential'
    ] as const,
    default: 'text'
  },

  /**
   * @description 可以设置小数点后保留位数, 用于设置精度
   */
  precision: {
    type: Number,
    default: 0
  },
  /**
   * @description 小数点后保留位截段取整方式，可选 ceil, floor, round，作用与 Math.ceil、Math.floor、Math.round 对齐
   */
  truncate: {
    values: ['ceil', 'floor', 'round'] as const,
    default: 'round'
  },
  /**
   * @description 自定义数值解析函数
   */
  parser: {
    type: Function as PropType<(str: string) => string>,
    default: null
  }
})
