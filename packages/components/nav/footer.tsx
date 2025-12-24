import { defineComponent } from 'vue'
import { prefix } from 'constants/config'

const NavFooter = defineComponent({
  setup() {
    return () => {
      return (
        <div class={prefix + '-nav-footer'}>
          <div class={prefix + '-nav-footer-item'}>
            <a href="#">Home</a>
          </div>
          <div class={prefix + '-nav-footer-item'}></div>
        </div>
      )
    }
  },
  name: prefix + '-nav-footer'
})
export default NavFooter
