import { defineComponent, computed } from 'vue'
import { prefix } from 'constants/config'
import './style/resizable.ts'
import { IconHandle } from '../icon'

const ResizeHandler = defineComponent({
  setup() {
    const wrapperClassNames = computed(() => {
      return [`${prefix}-resizable-handler`]
    })
    return () => {
      return (
        <div class={wrapperClassNames.value}>
          <IconHandle />
        </div>
      )
    }
  },
  name: `${prefix}-resize-handler`
})

export default ResizeHandler
