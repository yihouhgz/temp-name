import { watchEffect } from 'vue'
import { reactive, readonly, onScopeDispose } from 'vue'
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
export const useDefaultProps = <T extends Record<string, unknown>>(defaultProps: T) => {
  const props: { [key in keyof T]?: T[key] } = {}
  const stopWatch = watchEffect(() => {
    for (const key in defaultProps) {
      props[key] = defaultProps[key]
    }
  })
  onScopeDispose(() => {
    stopWatch?.()
  })
  return readonly(reactive(props))
}
