import { inject, provide } from 'vue'
import type { Locale } from '../locale'
import type { Direction } from './type'
export const configProviderKey = Symbol('configProvider')
export type ConfigProviderType = {
  direction?: Direction
  getPopupContainer?: (node?: HTMLElement) => HTMLElement
  locale?: Locale
  timeZone?: string | number
}
export const useConfigProvider = (config: ConfigProviderType) => {
  provide(configProviderKey, config)
}
export const useConfigInject = (defaultConfig: ConfigProviderType) => {
  return inject<ConfigProviderType>(configProviderKey, defaultConfig)
}
