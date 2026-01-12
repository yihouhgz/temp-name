import { defineComponent } from 'vue'
import { prefix } from 'constants/config'

const MarkdownRender = defineComponent({
  setup() {
    return () => (
      <div class={`${prefix}-markdown-render`}>
        <slot></slot>
      </div>
    )
  },
  name: `${prefix}-markdown-render`
})
export default MarkdownRender
