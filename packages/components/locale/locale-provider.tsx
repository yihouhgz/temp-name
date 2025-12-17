import { defineComponent, ref, watchEffect } from 'vue'
import { prefix } from 'constants/config'
import { localeProps } from './type'
import { useLocaleProvider } from './content'
import { isString } from '../_util'
import { getLocale } from '.'

const LocaleProvider = defineComponent({
  setup(props, { slots }) {
    const locale = ref()
    watchEffect(() => {
      if (isString(props.locale)) {
        locale.value = getLocale(props.locale)
      } else {
        locale.value = props.locale
      }
    })
    useLocaleProvider(locale.value)
    return () => {
      return slots.default?.()
    }
  },
  props: localeProps,
  name: prefix + '-locale-provider'
})

export default LocaleProvider
