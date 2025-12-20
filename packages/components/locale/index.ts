import zh_CN from './language/zh_CN'
import zh_TW from './language/zh_TW'
import en_US from './language/en_US'

export type LocaleName = 'en-US' | 'zh-CN' | 'zh-TW'
export type Locale = typeof zh_CN
export const defaultLocale = zh_CN

export const getLocale = (localeName: LocaleName) => {
  switch (localeName) {
    case 'en-US':
      return en_US
    case 'zh-CN':
      return zh_CN
    case 'zh-TW':
      return zh_TW
    default:
      return defaultLocale
  }
}
