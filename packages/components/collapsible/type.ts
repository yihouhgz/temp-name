export const collapsibleProps = {
  /**
   * @property 折叠高度
   */
  collapseHeight: {
    type: Number,
    default: 0
  },
  /**
   * @property 折叠动画时长
   */
  duration: {
    type: Number,
    default: 250
  },
  /**
   * @property 是否开启淡入淡出
   */
  fade: {
    type: Boolean,
    default: false
  },
  /**
   * @property 是否展开内容区域
   */
  isOpen: {
    type: Boolean,
    default: false
  },
  /**
   * @property 是否保留隐藏的面板 DOM 树，默认销毁
   */
  keepDOM: {
    type: Boolean,
    default: false
  },
  /**
   * @property 配合 keepDOM 使用，为 true 时挂载时不会渲染组件
   */
  lazyRender: {
    type: Boolean,
    default: false
  },
  /**
   * @property 是否开启动画
   */
  motion: {
    type: Boolean,
    default: true
  },
  /**
   * @property 当 reCalcKey 改变时，将重新计算子节点的高度，用于优化动态渲染时的计算
   */
  reCalcKey: {
    type: [String, Number],
    default: ''
  },
  /**
   * @property id html id string type
   */
  id: {
    type: String,
    default: ''
  }
}

export const collapsibleEmits = {
  motionEnd: () => {},
  motionStart: () => {}
}
