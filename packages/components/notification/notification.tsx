import { defineComponent } from 'vue'
import { prefix } from 'constants/config'

const Notification = defineComponent({
  setup() {
    return () => {
      return <div></div>
    }
  },
  name: `${prefix}-notification`
})
export default Notification
