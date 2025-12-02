import type { CSSProperties, PropType } from 'vue'
import { isBoolean } from '../_util'
import type { ExtractPublicPropTypes } from 'vue'

export const radioType = ['default', 'button', 'card', 'pureCard'] as const
export type RadioType = (typeof radioType)[number]
export const modeType = ['default', 'advanced'] as const
export type ModeType = (typeof modeType)[number]

export const radioPorps = {
  /**
   * 包裹内容容器的样式类名
   */
  addonClassName: {
    type: String,
    default: ''
  },
  /**
   * addon 节点 id，aria-labelledby 指向这个 id，若无设置会随机生成一个 id
   */
  addonId: {
    type: String,
    default: ''
  },
  /**
   * 包裹内容容器的内联样式
   */
  addonStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => ({})
  },
  /**
   * Radio 的 label
   */
  'aria-label': {
    type: String,
    default: ''
  },
  /**
   * 是否自动获取焦点
   */
  autoFocus: {
    type: Boolean,
    default: false
  },
  /**
   * 指定当前是否选中
   */
  checked: {
    type: Boolean,
    default: undefined
  },
  /**
   * 初始是否选中
   */
  defaultChecked: {
    type: Boolean,
    default: undefined
  },
  /**
   * 是否禁用
   */
  disabled: {
    type: Boolean,
    default: false
  },
  /**
   * 副文本，只对type='default'生效
   */
  extra: {
    type: String,
    default: ''
  },
  /**
   * 副文本的 id，aria-describedby 指向这个 id，若无设置会随机生成一个 id
   */
  extraId: {
    type: String,
    default: ''
  },
  /**
   * 高级和普通模式，高级模式可以在 checked 时点击变成 unchecked，可选值 advanced
   */
  mode: {
    type: String as PropType<ModeType>,
    values: modeType,
    default: modeType[0]
  },
  /**
   * Radio组件中input[type="radio"]的name属性，具有相同name的Radio属于同一个RadioGroup
   */
  name: {
    type: String,
    default: ''
  },
  /**
   * 指示浏览器是否应滚动文档以显示新聚焦的元素，作用于组件内的 focus 方法
   */
  preventScroll: {
    type: Boolean,
    default: false
  },
  /**
   * 设置 radio的样式类型，可选值为：default、button、card、pureCard
   */
  type: {
    type: String as PropType<RadioType>,
    values: radioType,
    default: radioType[0]
  },
  /**
   * type='button'的radio的尺寸大小，可选值为：small、middle、large
   * @private
   */
  buttonSize: {
    type: String as PropType<'small' | 'middle' | 'large'>,
    values: ['small', 'middle', 'large'] as const,
    default: 'middle'
  },
  /**
   * Radio 组件的值，RadioGroup下生效
   */
  value: {
    default: undefined
  }
}
export type RadioRefMethods = {
  focus: () => void
  blur: () => void
}

export const radioEmits = {
  /**
   * @description 点击回调函数
   */
  change: (e: {
    stopPropagation: () => void
    preventDefault: () => void
    target: { checked: boolean }
  }) => isBoolean(e.target.checked),
  mouseEnter: (e: Event) => e instanceof Event,
  mouseLeave: (e: Event) => e instanceof Event
}

export type OptionsType = ExtractPublicPropTypes<typeof radioPorps> & { label: string }

export const radioGroupProps = {
  /**
   * RadioGroup 的 label
   */
  'aria-label': {
    type: String,
    default: ''
  },
  /**
   * type='button'的radio的尺寸大小，可选值为：small、middle、large
   */
  buttonSize: {
    type: String as PropType<'small' | 'middle' | 'large'>,
    values: ['small', 'middle', 'large'] as const,
    default: 'middle'
  },
  /**
   * 默认选中的 Radio 的 value
   */
  defaultValue: {
    default: undefined
  },
  /**
   * 禁用所有子元素
   */
  disabled: {
    type: Boolean,
    default: false
  },
  /**
   * radio 排列方向, 只对type='default'生效，可选值horizontal、vertical
   */
  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
    values: ['horizontal', 'vertical'] as const,
    default: 'horizontal'
  },
  /**
   * 高级和普通模式，可以在 checked 时点击变成 unchecked，可选值 advanced
   */
  mode: {
    type: String as PropType<ModeType>,
    values: modeType,
    default: modeType[0]
  },
  /**
   * RadioGroup 下所有 input[type="radio"] 的 name 属性
   */
  name: {
    type: String,
    default: 'default'
  },
  /**
   * 以配置形式设置子元素
   */
  options: {
    type: Array as PropType<OptionsType[]>,
    default: () => []
  },
  /**
   * 用于设置当前选中的值
   */
  value: {
    default: undefined
  },
  /**
   * 设置所有radio的样式类型，可选值为：default、button、card、pureCard
   */
  type: {
    type: String as PropType<RadioType>,
    values: radioType,
    default: radioType[0]
  }
}

export const radioGroupEmits = {
  /**
   * @description 点击回调函数
   */
  change: (e: {
    stopPropagation: () => void
    preventDefault: () => void
    target: { checked: boolean }
  }) => isBoolean(e.target.checked)
}
