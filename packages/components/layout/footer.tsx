import { defineComponent } from 'vue'
import { prefix } from 'constants/config'
const Footer = defineComponent({
  setup(props, ctx) {
    return () => {
      return (
        <footer class={prefix + '-layout-footer'} {...ctx.attrs}>
          {ctx.slots.default?.()}
        </footer>
      )
    }
  },
  name: prefix + '-layout-footer'
})
export default Footer
