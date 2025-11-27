import type { PropType } from 'vue'
import type { LocaleName, Locale } from '../locale'
import { defaultLocale } from '../locale'

export type ConfigProviderData = {
  localeName: LocaleName
  locale: Locale
}

export const configProviderProps = {
  localeName: {
    type: String as PropType<LocaleName>,
    default: defaultLocale
  }
}
