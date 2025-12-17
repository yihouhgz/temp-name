import { inject, provide } from 'vue'
import type { Locale } from '../locale'
import type { Direction } from './type'
export const configProviderKey = Symbol('configProvider')
export type ConfigProvider = {
  direction?: Direction
  getPopupContainer?: (node?: HTMLElement) => HTMLElement
  locale?: Locale
  timeZone?: string | number
}
export const useConfigProvider = (config: ConfigProvider) => {
  provide(configProviderKey, config)
}
export const useConfigInject = (defaultConfig: ConfigProvider) => {
  return inject<ConfigProvider>(configProviderKey, defaultConfig)
}
