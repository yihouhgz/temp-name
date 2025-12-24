import { provide, inject } from 'vue'

export const collapsekey = Symbol('collapse')
export type CollapseProvideType = {
  change: (activeKey: string, e: Event) => void
}
export function useCollapseProvide(data: CollapseProvideType) {
  return provide<CollapseProvideType>(collapsekey, data)
}
export function useCollapseInject() {
  return inject<CollapseProvideType>(collapsekey)
}
