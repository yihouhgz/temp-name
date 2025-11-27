import { defineComponent, provide } from 'vue'
import { prefix } from 'constants/config'
import { configProviderProps } from './type'
import { configProviderKey } from './utils'
import type { ConfigProviderData } from './type'
import { getLocale } from '../locale'

const ConfigProvider = defineComponent({
  setup(props, ctx) {
    const provideData: ConfigProviderData = {
      localeName: props.localeName,
      locale: getLocale(props.localeName)
    }
    provide<ConfigProviderData, string>(configProviderKey, provideData)
    return () => {
      return ctx.slots.default?.()
    }
  },
  name: prefix + '-config-provider',
  props: configProviderProps
})
export default ConfigProvider
