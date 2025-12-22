import { prefix } from 'constants/config'
import { defineComponent } from 'vue'

const Collapse = defineComponent({
  setup(props, ctx) {
    return () => {
      return <div class={prefix + '-collapse'}>{ctx.slots.default?.()}</div>
    }
  },
  name: prefix + '-collapse'
})
export default Collapse
