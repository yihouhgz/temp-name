import { defineComponent, computed, ref, onMounted } from 'vue'
import { prefix } from 'constants/config'
import './style/resizable.ts'
import { IconHandle } from '../icon'
import { resizeHandlerProps, resizableEmits } from './type'
import { useEventListener } from '../_util'

const ResizeHandler = defineComponent({
  setup(props, ctx) {
    const wrapperClassNames = computed(() => {
      return [`${prefix}-resizable-handler`, `${prefix}-resizable-handler-${props.direction}`]
    })
    let isDragging = false
    const handerRef = ref()
    onMounted(() => {
      useEventListener(handerRef.value, 'mousedown', (e) => {
        if (!isDragging) {
          isDragging = true
          ctx.emit('resizeStart', e, props.direction)
        }
      })
      useEventListener(window, 'mousemove', (e) => {
        if (isDragging) {
          ctx.emit('change', { width: 200, height: 200 }, e, props.direction)
        }
      })
      useEventListener(window, 'mouseup', (e) => {
        if (isDragging) {
          ctx.emit('resizeEnd', e, props.direction)
          isDragging = false
        }
      })
    })
    return () => {
      return (
        <div class={wrapperClassNames.value} ref={(node) => (handerRef.value = node)}>
          <IconHandle />
        </div>
      )
    }
  },
  name: `${prefix}-resize-handler`,
  props: resizeHandlerProps,
  emits: resizableEmits
})

export default ResizeHandler
