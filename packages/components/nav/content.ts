import { provide, inject } from 'vue'
import { navProps } from './type'
import type { ExtractPublicPropTypes } from 'vue'
export const navigationKey = Symbol('navigation')
export type NavigationProvideContent = {
  getPopupContainer: (node: HTMLElement) => HTMLElement
  clickItem: (itemKey: string, domEvent: MouseEvent, isOpen: boolean) => void
  getExpandIcon: () => unknown
  isCollapsed: boolean
  collapsedChange: (isCollapsed: boolean) => void
  reCalcKey: Map<string, () => void>
  updateReCalcKey: () => void
  //gather close
  closeCollapsibleMap: Map<
    string,
    {
      close: () => void
      open: (isOpen: boolean) => void
      getCurrent: () => boolean
      before: boolean
    }
  >
  getProps: () => ExtractPublicPropTypes<typeof navProps>
  isDefaultOpen: (key: string) => boolean
  isSelectedKeys: (key: string) => boolean
  openKeys: string[]
  selectedKeys: string[]
}

export function useNavigationProvide(data: NavigationProvideContent) {
  return provide<NavigationProvideContent>(navigationKey, data)
}
export function useNavigationInject() {
  return inject<NavigationProvideContent>(navigationKey)
}
