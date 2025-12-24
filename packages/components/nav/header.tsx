import { defineComponent } from 'vue'
import { prefix } from 'constants/config'

const NavHeader = defineComponent({
  setup() {
    return () => {
      return <div class={prefix + '-nav-footer'}></div>
    }
  },
  name: prefix + '-nav-header'
})
export default NavHeader
