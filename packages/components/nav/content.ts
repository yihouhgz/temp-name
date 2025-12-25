import { provide, inject } from 'vue'

export const navigationKey = Symbol('navigation')
export type NavigationProvideContent = {
  getPopupContainer: (node: HTMLElement) => HTMLElement
  clickItem: (itemKey: string, domEvent: MouseEvent, isOpen: boolean) => void
  getExpandIcon: () => unknown
  isCollapsed: boolean
  collapsedChange: (isCollapsed: boolean) => void
}
export function useNavigationProvide(data: NavigationProvideContent) {
  return provide<NavigationProvideContent>(navigationKey, data)
}
export function useNavigationInject() {
  return inject<NavigationProvideContent>(navigationKey)
}
