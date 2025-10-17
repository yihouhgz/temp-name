import type { VNode, ComponentInternalInstance } from 'vue'

export const isFunction = (value: unknown) => typeof value === 'function'
export const isString = (value: unknown) => typeof value === 'string'
export const isNumber = (value: unknown) => typeof value === 'number'
export const isArray = (value: unknown) => Array.isArray(value)
export const isObject = (value: unknown) => value !== null && typeof value === 'object'
export const isBoolean = (value: unknown) => typeof value === 'boolean'
export const isUndefined = (value: unknown) => typeof value === 'undefined'
export const omitKeys = <T extends Record<string | symbol, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
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

export type VNodeType = string | VNode | (() => VNode) | null | undefined
export const renderVnode = (vnode: VNodeType): VNode | null | string | undefined => {
  if (isFunction(vnode)) return vnode()
  return vnode
}

export const isIncludedSlot = (slotName: string, vm: ComponentInternalInstance) => {
  const { slots, props } = vm
  return Boolean((props && props[slotName]) || (slots && slots[slotName]))
}

export const hasPropsOrSlots = (slotName: string, vm: ComponentInternalInstance | null) => {
  if (!vm) return false
  const { slots, props } = vm
  return Boolean(props[slotName]) || isFunction(slots?.[slotName])
}

// 处理props传值或者slot的情况 props.solt 优先级高于slots.solt
export const renderElementForPropsOrSlot = (
  slotName: string | { propName: string; slotName: string },
  vm: ComponentInternalInstance | null
) => {
  if (!vm) return null
  const { slots, props } = vm
  let pName = isString(slotName) ? slotName : '',
    sName = isString(slotName) ? slotName : ''
  if (typeof slotName === 'object') {
    pName = slotName.propName
    sName = slotName.slotName
  }
  if (props[pName]) {
    return renderVnode(props[pName] as VNodeType)
  }
  const vSlots = slots?.[sName]?.()
  return vSlots
}

export const domRectToObject = (rect: DOMRect): Omit<DOMRect, 'toJSON'> => {
  return {
    width: rect.width,
    height: rect.height,
    top: rect.top,
    left: rect.left,
    right: rect.right,
    bottom: rect.bottom,
    x: rect.x,
    y: rect.y
  }
}
