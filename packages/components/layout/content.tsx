import { defineComponent } from 'vue'
import { prefix } from 'constants/config'
const Content = defineComponent({
  setup(props, ctx) {
    return () => {
      return (
        <main class={prefix + '-layout-content'} {...ctx.attrs}>
          {ctx.slots.default?.()}
        </main>
      )
    }
  },
  name: prefix + '-layout-content'
})
export default Content
