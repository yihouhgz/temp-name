import { defineComponent } from 'vue'
import { prefix } from 'constants/config'
import { useConfigInject } from './content'
import { defaultConfig } from './type'

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
