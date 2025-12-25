import { defineComponent } from 'vue'
import { prefix } from 'constants/config'

const DropdownTitle = defineComponent({
  setup(props, ctx) {
    return () => {
      return <div class={prefix + '-dropdown-title'}>{ctx.slots.default?.()}</div>
    }
  },
  name: prefix + '-dropdown-title'
})
export default DropdownTitle
