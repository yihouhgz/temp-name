import type { VNode } from 'vue'
export const isFunction = (value: unknown) => typeof value === 'function'
export const isString = (value: unknown) => typeof value === 'string'
export const isNumber = (value: unknown) => typeof value === 'number'
export const isArray = (value: unknown) => Array.isArray(value)
export const isObject = (value: unknown) => value !== null && typeof value === 'object'
export const omitKeys = <T extends Record<string | symbol, unknown>, K extends keyof T>(
  obj: T,
  ...keys: K[]
): Omit<T, K> => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keys.includes(key as unknown as K))
  ) as Omit<T, K>
}
export const isComponentByVNode = (vnode: VNode): boolean => {
  return vnode && !!vnode.type && (isObject(vnode.type) || isFunction(vnode.type))
}
