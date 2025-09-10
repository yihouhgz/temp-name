import { defineComponent } from 'vue'
import { prefix } from 'constants/config'
export default defineComponent({
  setup() {
    return () => {
      return <div>group</div>
    }
  },
  name: prefix + '-select-group'
})
