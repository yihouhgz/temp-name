import { defineComponent } from 'vue'
import { prefix } from 'constants/config'

const NavItem = defineComponent({
  setup() {
    return () => {
      return <div class={prefix + '-nav-footer'}></div>
    }
  },
  name: prefix + '-nav-item'
})
export default NavItem
