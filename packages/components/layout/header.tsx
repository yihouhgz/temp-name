import { defineComponent } from 'vue'
import { prefix } from 'constants/config'
const Header = defineComponent({
  setup(props, ctx) {
    return () => {
      return (
        <header class={prefix + '-layout-header'} {...ctx.attrs}>
          {ctx.slots.default?.()}
        </header>
      )
    }
  },
  name: prefix + '-layout-header'
})
export default Header
