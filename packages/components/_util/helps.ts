import type { VNode } from 'vue'
export const isFunction = (value: unknown) => typeof value === 'function'
export const isString = (value: unknown) => typeof value === 'string'
export const isNumber = (value: unknown) => typeof value === 'number'
export const isArray = (value: unknown) => Array.isArray(value)
export const isObject = (value: unknown) => value !== null && typeof value === 'object'
export const isBoolean = (value: unknown) => typeof value === 'boolean'
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
export const Undefined = void 0

export const isColorValue = (color: string) => {
  const hexColorRegex = /^#([0-9A-F]{3}|[0-9A-F]{6})$/i
  const rgbColorRegex = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/
  const rgbaColorRegex = /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(0|0?\.\d+|1(\.0)?)\)$/
  return hexColorRegex.test(color) || rgbColorRegex.test(color) || rgbaColorRegex.test(color)
}

export const renderVnode = (
  vnode: string | VNode | (() => VNode) | null | undefined
): VNode | null | string | undefined => {
  if (isFunction(vnode)) return vnode()
  return vnode
}
