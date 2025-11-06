import type { PropType, VNode } from 'vue'

export const breadcrumbProps = {
  /**
   * @description 受控使用，当前选择的导航序号
   */
  activeIndex: {
    type: String,
    default: undefined
  },
  /**
   * @description 是否超出maxItemCount后自动折叠
   */
  autoCollapse: {
    type: Boolean,
    default: true
  },
  /**
   * @description 显示尺寸，是否紧凑
   */
  compact: {
    type: Boolean,
    default: true
  },
  /**
   * @description 超出多少个进行自动折叠
   */
  maxItemCount: {
    type: Number,
    default: 4
  },
  /**
   * @description 默认值
   */
  moreType: {
    values: ['default', 'popover'],
    default: 'default'
  },

  /**
   * @description 弹出框的配置项
   */
  renderMore: {
    type: [String, Object, Function, null] as PropType<string | VNode | (() => VNode) | null>,
    default: null
  },
  /**
   * @description 自定义的分隔符
   */
  separator: {
    type: [String, Object, Function, null] as PropType<string | VNode | (() => VNode) | null>,
    default: '/'
  },
  /**
   * @description 弹出框的配置项
   */
  showTooltip: {
    type: [Boolean, Object] as PropType<
      | boolean
      | {
          width: number
          ellipsisPos: string
          opts: { autoAdjustOverflow: boolean; position: string }
        }
    >,
    default: {
      width: 150,
      ellipsisPos: 'end',
      opts: { autoAdjustOverflow: true, position: 'bottomLeft' }
    }
  }
}

export const itemProps = {
  /**
   * @description 链接的目的地
   */
  href: {
    type: String,
    default: ''
  },
  /**
   * @description 标签的显示图标
   */
  icon: {
    type: [String, Object, Function, null] as PropType<string | VNode | (() => VNode) | null>,
    default: null
  },
  /**
   * @description 分隔符，可以覆盖父级的分隔符
   */
  separator: {
    type: [String, Object, Function, null] as PropType<string | VNode | (() => VNode) | null>,
    default: null
  }
}
