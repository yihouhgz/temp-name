import { defineComponent } from 'vue'
import { prefix } from 'constants/config'

const Form = defineComponent(
  (props, ctx) => {
    return () => {
      return <div class="tempui-form">{ctx.slots.default?.()}</div>
    }
  },
  {
    name: `${prefix}-form`
  }
)

export default Form
