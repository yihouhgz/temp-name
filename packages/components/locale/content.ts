import { provide, inject } from 'vue'
import { type Locale } from './index'
import zh_CN from './language/zh_CN'

export const LocaleInjectionKey = Symbol('LocaleInjectionKey')
export const useLocaleProvider = (locale: Locale) => {
  provide(LocaleInjectionKey, locale)
}
export const useLocaleInject = (defaultLocale: Locale = zh_CN) => {
  return inject(LocaleInjectionKey, defaultLocale)
}
