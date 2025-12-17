import type { PropType } from 'vue'
import type { Locale, LocaleName } from '../locale'
import { defaultLocale } from '../locale'

export type Direction = 'ltr' | 'rtl'

export const configProviderProps = {
  locale: {
    type: [Object, String] as PropType<Locale | LocaleName>,
    default: defaultLocale
  },
  direction: {
    type: String as PropType<Direction>,
    default: 'ltr'
  },
  getPopupContainer: {
    type: Function as PropType<(node: HTMLElement) => HTMLElement>,
    default: () => document.body
  },
  timeZone: {
    type: [String, Number]
  }
}
