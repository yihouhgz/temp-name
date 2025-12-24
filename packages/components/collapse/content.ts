import { provide, inject, type ExtractDefaultPropTypes } from 'vue'
import { collapseProps } from './type'
import type { VueNode } from '../_util/type'

export const collapsekey = Symbol('collapse')
export type CollapseProvideType = {
  change: (activeKey: string, e: Event) => void
  getProps: () => ExtractDefaultPropTypes<typeof collapseProps>
  includes: (key: string) => boolean
  closeMap: Map<string, () => void>
  getCollapseIcon: () => VueNode
  getExpandIcon: () => VueNode
}
export function useCollapseProvide(data: CollapseProvideType) {
  return provide<CollapseProvideType>(collapsekey, data)
}
export function useCollapseInject() {
  return inject<CollapseProvideType>(collapsekey)
}
