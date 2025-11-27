import zh_CN from './language/zh_CN'
import zh_TW from './language/zh_TW'
import en_US from './language/en_US'

export type LocaleName = 'en_US' | 'zh_CN' | 'zh_TW'
export type Locale = typeof zh_CN
export const defaultLocale = zh_CN.locale as LocaleName

export const getLocale = (localeName: LocaleName) => {
  switch (localeName) {
    case 'en_US':
      return en_US
    case 'zh_CN':
      return zh_CN
    case 'zh_TW':
      return zh_TW
    default:
      return zh_CN
  }
}
