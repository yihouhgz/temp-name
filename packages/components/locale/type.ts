import type { PropType } from 'vue'
import type { Locale, LocaleName } from '.'
import zh_CN from './language/zh_CN'
export const localeProps = {
  locale: {
    type: [Object, String] as PropType<Locale | LocaleName>,
    default: zh_CN
  }
}
