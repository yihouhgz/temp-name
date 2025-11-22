import { defineComponent } from 'vue'
import { prefix } from 'constants/config'
import Input from '../input'
// import Tag from '../tag'

const AutoComplete = defineComponent({
  setup() {
    return () => {
      return (
        <div>
          <Input></Input>
        </div>
      )
    }
  },
  name: prefix + '-auto-complete'
})
export default AutoComplete
