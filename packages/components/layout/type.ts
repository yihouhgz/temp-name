import { isBoolean, isString } from '../_util'

export const commonProps = {
  /**
   * @description 表示子元素里有 Sider，一般不用指定。可用于服务端渲染时避免样式闪动
   */
  hasSider: {
    type: Boolean,
    default: undefined,
    required: false
  }
}

export const siderProps = {
  /**
   * @description 触发响应式布局的断点
   */
  breakpoint: {
    values: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
    default: 'lg',
    required: false
  }
}

export const siderEmits = {
  breakpoint: (screen: string, broken: boolean) => {
    return isString(screen) && isBoolean(broken)
  }
}
