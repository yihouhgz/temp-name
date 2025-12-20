import { defineComponent, type PropType } from 'vue'
import ConfigConsumer from '../config-provider/config-consumer'
import { useLocaleInject } from './content'
import type { ConfigProviderType } from '../config-provider/content'
import zh_CN from './language/zh_CN'
const LocaleConsumer = defineComponent({
  setup(props, ctx) {
    const localeData = useLocaleInject()
    return () => {
      return (
        <ConfigConsumer>
          {({ locale }: ConfigProviderType) => {
            const { componentName } = props
            const data = locale || localeData
            const componentLocale = data[componentName]
            return ctx.slots.default?.(componentLocale, data.locale)
          }}
        </ConfigConsumer>
      )
    }
  },
  name: 'LocaleConsumer',
  props: {
    componentName: {
      type: String as PropType<keyof typeof zh_CN>,
      default: ''
    }
  }
})
export default LocaleConsumer
