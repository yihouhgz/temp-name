import { defineComponent } from 'vue'
import { prefix } from 'constants/config'
import { useConfigInject } from '../config-provider/content'
import { defaultConfig } from '../config-provider/type'

const ConfigConsumer = defineComponent({
  name: `${prefix}-config-consumer`,
  setup(props, ctx) {
    const value = useConfigInject(defaultConfig)
    return () => {
      return ctx.slots.default?.(value)
    }
  }
})
export default ConfigConsumer
