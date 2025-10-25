import type { PropType, VNode, CSSProperties } from 'vue'
import type { InputPropsType } from '../input/input'
import { positionValues } from '../tooltip/type'
import type { TooltipProps } from '../tooltip/tooltip'
import { selectZIndex } from '../_util/zindex'
export type OptionType = {
  label: string
  value: string | number
  disabled?: boolean
}
export const selectProps = {
  /**
   * 	@description 是否允许用户创建新条目，需配合 filter 使用。该项为true时不再响应 optionList的变更
   */
  allowCreate: {
    type: Boolean,
    default: false,
    required: false
  },
  /**
   * @description 自定义右侧下拉箭头 Icon，当 showClear 开关打开且当前有选中值时，hover 会优先显示 clear icon
   */
  arrowIcon: {
    type: [String, Object, Function, null] as PropType<string | VNode | (() => VNode) | null>,
    default: () => null,
    required: false
  },
  /**
   * 	@description 浮层被遮挡时是否自动调整方向
   */
  autoAdjustOverflow: {
    type: Boolean,
    default: true,
    required: false
  },

  /**
   * @description 选中选项后，是否自动清空搜索关键字，当 mutilple、filter 都开启时生效
   */
  autoClearSearchValue: {
    type: Boolean,
    default: true,
    required: false
  },
  /**
   * @description 初始渲染时是否自动 focus
   */
  autoFocus: {
    type: Boolean,
    default: false,
    required: false
  },
  /**
   * @description 无边框模式
   */
  borderless: {
    type: Boolean,
    default: false,
    required: false
  },
  /**
   * @description 可用于自定义清除按钮, showClear为true时有效
   */
  clearIcon: {
    type: [String, Object, Function, null] as PropType<string | VNode | (() => VNode) | null>,
    default: () => null,
    required: false
  },
  /**
   * @description 是否展示清除按钮
   */
  showClear: {
    type: Boolean,
    default: false,
    required: false
  },
  /**
   * @description 是否展示下拉箭头
   */
  showArrow: {
    type: Boolean,
    default: false,
    required: false
  },
  /**
   * @description 输入框类型
   */
  type: {
    values: ['text', 'password'],
    default: 'text',
    required: false
  },
  /**
   * @description 已展开时，点击选择框是否自动收起下拉列表
   */
  clickToHide: {
    type: Boolean,
    default: false,
    required: false
  },
  /**
   * @description 默认选中的选项
   */
  defaultValue: {
    type: [String, Number, Array] as PropType<string | number | (string | number)[]>,
    default: undefined,
    required: false
  },
  /**
   * @description 是否默认展开下拉列表
   */
  defaultOpen: {
    type: Boolean,
    default: false,
    required: false
  },
  /**
   * @description 是否禁用
   */
  disabled: {
    type: Boolean,
    default: false,
    required: false
  },

  /**
   * @description 是否默认高亮第一个选项（按回车可直接选中）
   */
  defaultActiveFirstOption: {
    type: Boolean,
    default: true,
    required: false
  },

  /**
   * @description 弹出层的 className
   */
  dropdownClassName: {
    type: String,
    default: '',
    required: false
  },
  /**
   * @description 弹出层的样式
   */
  dropdownStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => ({}),
    required: false
  },
  /**
   * @description 下拉菜单最小宽度是否等于 Select
   */
  dropdownMatchSelectWidth: {
    type: Boolean,
    default: true,
    required: false
  },
  /**
   * @description 弹出层计算溢出时的增加的冗余值 同 Tooltip margin
   */
  dropdownMargin: {
    type: [Number, Object] as PropType<number | { x: number; y: number }>,
    default: 8,
    required: false
  },
  /**
   * @description 无结果时展示的内容。设为 null 时，下拉列表将不展示
   */
  emptyContent: {
    type: [String, Object, Function, null] as PropType<string | VNode | (() => VNode) | null>,
    default: () => null,
    required: false
  },

  /**
   * @description 当 maxTagCount 存在且为多选时，是否对溢出部分的 tag 做自适应处理(当宽度不足时，最后一个tag内容作截断处理)。开启该功能后会有一定性能损耗，不推荐在大表单场景下使用
   */
  ellipsisTrigger: {
    type: Boolean,
    default: false,
    required: false
  },
  /**
   * @description 当maxTagCount存在且为多选时，select 在面板打开状态下是否展开多余的 Tag
   */
  expandRestTagsOnClick: {
    type: Boolean,
    default: false,
    required: false
  },
  /**
   * @description 是否禁用
   */
  filter: {
    type: [Function] as PropType<(inputValue: string, option: OptionType) => boolean>,
    default: () => (inputValue: string, option: OptionType) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase()),
    required: false
  },
  /**
   * @description 指定父级 DOM，弹层将会渲染至该 DOM 中，自定义需要设置 position: relative 这会改变浮层 DOM 树位置，但不会改变视图渲染位置。
   */
  getPopupContainer: {
    type: [Function] as PropType<(el: HTMLElement) => HTMLElement>,
    default: () => () => document.body,
    required: false
  },
  /**
   * @description filter 为 true 时, input 输入框的额外配置参数，具体可配置属性请参考 Input 组件（注意：请不要传入 value、ref、onChange、onFocus，否则会覆盖 Select 相关回调，影响组件行为）
   */
  inputProps: {
    type: Object as PropType<InputPropsType>,
    default: () => ({})
  },
  /**
   * @description 渲染在弹出层顶部，在 optionList 内部的自定义 slot
   */
  innerTopSlot: {
    type: [String, Object, Function, null] as PropType<string | VNode | (() => VNode) | null>,
    default: null,
    required: false
  },
  /**
   * @description 渲染在弹出层底部，在 optionList 内部的自定义 slot
   */
  innerBottomSlot: {
    type: [String, Object, Function, null] as PropType<string | VNode | (() => VNode) | null>,
    default: null,
    required: false
  },

  /**
   * @description 下拉列表是否展示加载动画
   */
  loading: {
    type: Boolean,
    default: false,
    required: false
  },

  /**
   * @description 多选模式下，已选项超出 maxTagCount 时，后续选项会被渲染成+N 的形式
   */
  maxTagCount: {
    type: Number,
    default: 0,
    required: false
  },
  /**
   * @description 最多可选几项，仅在多选模式下生效
   */
  max: {
    type: [Number, null],
    default: null,
    required: false
  },
  /**
   * @description 多选模式下，已选项超出 maxTagCount 时，是否通过 Popover 显示剩余内容
   */
  showRestTagsPopover: {
    type: Boolean,
    default: false,
    required: false
  },

  /**
   * @description 默认选中项
   */
  maxHeight: {
    type: Number,
    default: 270,
    required: false
  },
  /**
   * @description 多选
   */
  multiple: {
    type: Boolean,
    default: false,
    required: false
  },

  /**
   * @description 渲染在弹出层顶部，与 optionList 平级的自定义 slot
   */
  outerTopSlot: {
    type: [String, Object, Function, null] as PropType<string | VNode | (() => VNode) | null>,
    default: null,
    required: false
  },

  /**
   * @description 渲染在弹出层底部，与 optionList 平级的自定义 slot
   */
  outerBottomSlot: {
    type: [String, Object, Function, null] as PropType<string | VNode | (() => VNode) | null>,
    default: null,
    required: false
  },

  /**
   * @description 可以通过该属性传入 Option,请确保数组内每个元素都具备 label、value 属性
   */
  optionList: {
    type: [Array, undefined] as PropType<OptionType[] | undefined>,
    default: undefined,
    required: false
  },
  /**
   * @description 选择框默认文字
   */
  placeholder: {
    type: [String, Object, Function, null] as PropType<string | VNode | (() => VNode) | null>,
    default: '',
    required: false
  },
  /**
   * @description 是否禁用
   */
  position: {
    values: positionValues,
    default: 'bottomLeft',
    required: false
  },
  /**
   * @description 选择框的前缀标签
   */
  prefix: {
    type: [String, Object, Function, null] as PropType<string | VNode | (() => VNode) | null>,
    default: null,
    required: false
  },
  /**
   * @description 选择框的后缀标签
   */
  suffix: {
    type: [String, Object, Function, null] as PropType<string | VNode | (() => VNode) | null>,
    default: null,
    required: false
  },
  /**
   * @description 指示浏览器是否应滚动文档以显示新聚焦的元素，作用于组件内的 focus 方法
   */
  preventScroll: {
    type: Boolean,
    default: false,
    required: false
  },
  /**
   * @description allowCreate 为 true 时，可自定义创建标签的渲染。与虚拟化结合使用时，必须将第三个参数style传入自定义DOM中消费
   */
  renderCreateItem: {
    type: Function as PropType<(inputValue: string, isFocus: boolean, style: object) => VNode>,
    default: null,
    required: false
  },
  /**
   * @description 通过 renderSelectedItem 自定义选择框中已选项标签的渲染
   */
  renderSelectedItem: {
    type: Function as PropType<(option: OptionType) => VNode>,
    default: null,
    required: false
  },
  /**
   * @description 通过 renderOptionItem 完全自定义下拉列表中候选项的渲染
   */
  renderOptionItem: {
    type: Function as PropType<(props: unknown) => VNode>,
    default: null,
    required: false
  },
  /**
   * @description Popover 的配置属性
   */
  restTagsPopoverProps: {
    type: Object as PropType<TooltipProps>,
    default: () => ({}),
    required: false
  },
  /**
   * @description 是否开启远程搜索，当 remote 为 true 时，input 内容改变后不会进行本地筛选匹配
   */
  remote: {
    type: Boolean,
    default: false,
    required: false
  },
  /**
   * @description filter开启时，搜索框的位置，默认在 trigger中，可以通过设为 'dropdown' 将搜索框置于下拉列表顶部。搭配 triggerRender 使用可以实现更高自由度的交互
   */
  searchPosition: {
    values: ['trigger', 'dropdown'],
    default: 'trigger',
    required: false
  },

  /**
   * @description 大小
   */
  size: {
    values: ['small', 'default', 'large'],
    default: 'default',
    required: false
  },
  /**
   * @description 是否阻止浮层上的点击事件冒泡
   */
  stopPropagation: {
    type: Boolean,
    default: false,
    required: false
  },
  /**
   * @description 浮层与选择器的距离
   */
  spacing: {
    type: Number,
    default: 4,
    required: false
  },
  /**
   * @description 自定义触发器渲染
   */
  triggerRender: {
    type: [String, Object, Function, null] as PropType<string | VNode | (() => VNode) | null>,
    default: null,
    required: false
  },
  /**
   * @description 当前选中的的值
   */
  value: {
    type: [String, Number, Array] as PropType<string | number | Array<string | number>>,
    default: null,
    required: false
  },
  /**
   * @description 校验结果，可选warning、error、 default（只影响样式背景色）
   */
  validateStatus: {
    values: ['warning', 'error', 'default'],
    default: 'default',
    required: false
  },
  /**
   * @description 列表虚拟化，用于大量节点的情况优化性能表现，由 height, width, itemSize 组成
   */
  virtualize: {
    type: [Object, null],
    default: null,
    required: false
  },
  /**
   * @description 弹出框的 z-index
   */
  zIndex: {
    type: Number,
    default: selectZIndex,
    required: false
  },
  /**
   * @description 是否将选中项 option 的其他属性作为回调。设为 true 时，onChange 的入参类型会从 string 变为 object: { value, label, ...rest }
   */
  onChangeWithObject: {
    type: Boolean,
    default: false,
    required: false
  }
}

export const selectSolts = {
  /**
   * @description 自定义选项
   */
  arrowIcon: null
}

export const selectEmits = {
  /**
   * @description 失去焦点时的回调
   */
  blur: (e: Event) => void e,

  /**
   * @description 获得焦点时的回调
   */
  focus: (e: Event) => void e,

  /**
   * @description 选项改变时的回调
   */
  change: (value: string | number | string[] | object) => void value,

  /**
   * @description allowCreate 为 true，创建备选项时的回调
   */
  create: (option: unknown) => void option,

  /**
   * @description 下拉菜单展开/收起时的回调
   */
  dropdownVisibleChange: (visible: boolean) => void visible,

  /**
   * @description 候选项列表滚动时的回调
   */
  listScroll: (e: Event) => void e,

  /**
   * @description input 输入框内容发生改变时回调函数
   */
  search: (value: string, e: Event) => void e,

  /**
   * @description 被选中时的回调
   */
  select: (value: string, option: unknown) => void option,

  /**
   * @description 取消选中时的回调，仅在多选时有效
   */
  deselect: (value: string, option: unknown) => void option,

  /**
   * @description 当试图选择数超出 max 限制时的回调
   */
  exceed: (value: string[]) => void value
}

export type SelectRefMethods = {
  /**
   * @description 调用时可以手动关闭下拉列表
   */
  close: () => void

  /**
   * @description 调用时可以手动展开下拉列表
   */
  open: () => void

  /**
   * @description 调用时可以手动聚焦
   */
  focus: () => void

  /**
   * @description 调用时可以手动清空 input 搜索框的值
   */
  clearInput: () => void

  /**
   * @description 调用时可以手动清空所有已选项
   */
  deselectAll: () => void

  /**
   * @description 调用时可以选中所有 Option
   */
  selectAll: () => void

  /**
   * @description 可通过 ref 调用该方法进行搜索，该搜索值会被置给 Input
   */
  search: (value: string, event: Event) => void
}
