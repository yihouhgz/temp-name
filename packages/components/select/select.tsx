import { defineComponent } from 'vue'
import { prefix } from 'constants/config'

const Select = defineComponent(
  () => {
    return () => {
      return <div>Select</div>
    }
  },
  { name: prefix + '-select' }
)

export default Select
