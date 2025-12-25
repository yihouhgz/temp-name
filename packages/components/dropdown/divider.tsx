import { defineComponent } from 'vue'
import { prefix } from 'constants/config'

const DropdownDivider = defineComponent({
  setup(props, ctx) {
    return () => {
      return <div class={prefix + '-dropdown-divider'}>{ctx.slots.default?.()}</div>
    }
  },
  name: prefix + '-dropdown-divider'
})
export default DropdownDivider
