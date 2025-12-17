import type { PropType } from 'vue'
import type { Locale, LocaleName } from '../locale'
import { defaultLocale } from '../locale'
import type { ConfigProviderType } from './content'

export type Direction = 'ltr' | 'rtl'

export const defaultConfig: ConfigProviderType = {
  direction: 'ltr',
  locale: defaultLocale,
  getPopupContainer: () => document.body,
  timeZone: undefined
}

export const configProviderProps = {
  locale: {
    type: [Object, String] as PropType<Locale | LocaleName>,
    default: defaultConfig.locale
  },
  direction: {
    type: String as PropType<Direction>,
    default: defaultConfig.direction
  },
  getPopupContainer: {
    type: Function as PropType<(node: HTMLElement) => HTMLElement>,
    default: defaultConfig.getPopupContainer
  },
  timeZone: {
    type: [String, Number],
    default: defaultConfig.timeZone
  }
}
