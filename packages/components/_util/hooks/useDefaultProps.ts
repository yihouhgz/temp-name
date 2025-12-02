import { reactive, readonly, onScopeDispose, watchEffect } from 'vue'
import { cloneDeep } from 'lodash'
/**
 * 运行时设置默认props
 * @param defaultProps - 默认属性
 * @returns
 * @example
 * const defaultProps = {
 *    content: ''
 *  }
 *  const props = useDefaultProps(defaultProps)
 */
export const useDefaultProps = <T extends Record<string, unknown>>(
  props: T,
  defaultProps: Partial<T>
) => {
  const newProps: { [key in keyof T]?: T[key] } = reactive({})
  const stopWatch = watchEffect(() => {
    for (const key in props) {
      if (Object.prototype.hasOwnProperty.call(defaultProps, key)) {
        newProps[key] = cloneDeep(defaultProps[key])
      } else {
        newProps[key] = cloneDeep(props[key])
      }
    }
  })
  onScopeDispose(() => {
    stopWatch?.()
  })
  return readonly(newProps)
}
