import { defineComponent, computed } from 'vue'
import { prefix } from 'constants/config'
import './style/resizable.ts'
import { resizeItemProps, resizeItemEmits } from './type'

const ResizeItem = defineComponent({
  setup(props, ctx) {
    const wrapperClassNames = computed(() => {
      return [`${prefix}-resizable-item`]
    })
    return () => {
      return <div class={wrapperClassNames.value}>{ctx.slots.default?.()}</div>
    }
  },
  name: `${prefix}-resize-item`,
  props: resizeItemProps,
  emits: resizeItemEmits
})
export default ResizeItem
