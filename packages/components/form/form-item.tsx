import { defineComponent } from 'vue'
import { prefix } from 'constants/config'

export default defineComponent(
  () => {
    return () => {
      return <div class="tempui-form-item"></div>
    }
  },
  { name: `${prefix}-form-item` }
)
