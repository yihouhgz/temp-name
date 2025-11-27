import { defineComponent } from 'vue'
import { prefix } from 'constants/config'

const configConsumer = defineComponent({
  name: `${prefix}-config-consumer`,
  setup(props, ctx) {
    const value = {}
    return () => {
      return ctx.slots.default?.(value)
    }
  }
})
export default configConsumer
