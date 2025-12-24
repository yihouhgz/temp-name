import { defineComponent } from 'vue'
import { prefix } from 'constants/config'

const Nav = defineComponent({
  setup() {
    return () => {
      return (
        <div class={prefix + '-nav'}>
          <div class={prefix + '-nav-item'}>
            <a href="#">Home</a>
          </div>
          <div class={prefix + '-nav-item'}></div>
        </div>
      )
    }
  },
  name: prefix + '-nav'
})
export default Nav
