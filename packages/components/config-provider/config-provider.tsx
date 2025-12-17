import { defineComponent, ref, watchEffect } from 'vue'
import { prefix } from 'constants/config'
import { configProviderProps } from './type'
import { useConfigProvider } from './content'
import type { ConfigProviderType } from './content'
import LocaleProvider from '../locale/locale-provider'
import { isString } from '../_util'
import { getLocale } from '../locale'

const ConfigProvider = defineComponent({
  setup(props, ctx) {
    const config = ref()
    watchEffect(() => {
      if (isString(props.locale)) {
        const locale = getLocale(props.locale)
        config.value = {
          ...config.value,
          locale
        }
      } else {
        config.value = props
      }
    })
    useConfigProvider(config.value as ConfigProviderType)
    return () => {
      return <LocaleProvider locale={props.locale}>{ctx.slots.default?.()}</LocaleProvider>
    }
  },
  name: prefix + '-config-provider',
  props: configProviderProps
})
export default ConfigProvider
