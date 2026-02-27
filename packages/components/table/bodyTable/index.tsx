import { defineComponent } from 'vue'
import { prefix } from 'constants/config'

const BodyTable = defineComponent({
  setup() {
    return () => <div>BodyTable</div>
  },
  name: prefix + '-body-table'
})
export default BodyTable
