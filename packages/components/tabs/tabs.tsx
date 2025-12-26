import { defineComponent } from 'vue'
import { prefix } from 'constants/config'
const Tabs = defineComponent({
  setup() {
    return () => {
      return <div class="tabs"></div>
    }
  },
  name: prefix + '-tabs'
})
export default Tabs
