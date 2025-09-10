import { defineComponent } from 'vue'
import { prefix } from 'constants/config'
export default defineComponent({
  setup(props, ctx) {
    return () => {
      return <div>{ctx.slots.default?.()}</div>
    }
  },
  name: prefix + '-select-option'
})
