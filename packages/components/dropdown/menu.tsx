import { defineComponent } from 'vue'
import { prefix } from 'constants/config'

const DropdownMenu = defineComponent({
  setup(props, ctx) {
    return () => {
      return (
        <div class={prefix + '-dropdown-content'}>
          <ul role="menu" aria-orientation="vertical" class={prefix + '-dropdown-menu'}>
            {ctx.slots.default?.()}
          </ul>
        </div>
      )
    }
  },
  name: prefix + '-dropdown-menu'
})
export default DropdownMenu
