import { defineComponent } from 'vue'
import { prefix } from 'constants/config'

const NavSub = defineComponent({
  setup() {
    return () => {
      return <div class={prefix + '-nav-footer'}></div>
    }
  },
  name: prefix + '-nav-sub'
})
export default NavSub
