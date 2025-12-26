import { defineComponent } from 'vue'
import { prefix } from 'constants/config'
const TabPane = defineComponent({
  setup() {
    return () => {
      return <div class="pane"></div>
    }
  },
  name: prefix + '-tab-pane'
})
export default TabPane
