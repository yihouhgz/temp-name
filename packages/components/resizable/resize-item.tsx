import { defineComponent, computed, watch } from 'vue'
import { prefix } from 'constants/config'
import './style/resizable.ts'
import { resizeItemProps, resizeItemEmits, type Size } from './type'
import { onMounted } from 'vue'
import { getInjectResizeContent } from './resize-content'

const ResizeItem = defineComponent({
  setup(props, ctx) {
    const wrapperClassNames = computed(() => {
      return [`${prefix}-resizable-item`]
    })
    const resizeContent = getInjectResizeContent()
    onMounted(() => {
      resizeContent?.changeItem.add((size: Size, e: Event, direction: string) => {
        ctx.emit('change', size, e, direction)
      })
      resizeContent?.resizeStartItem.add((e: Event, direction: string) => {
        ctx.emit('resizeStart', e, direction)
      })
      resizeContent?.resizeEndItem.add((e: Event, direction: string) => {
        ctx.emit('resizeEnd', e, direction)
      })
    })
    watch(
      () => props,
      (nValue) => {
        if (resizeContent) {
          //todo
          resizeContent?.itemProps.add(nValue)
        }
      },
      { immediate: true }
    )
    return () => {
      return <div class={wrapperClassNames.value}>{ctx.slots.default?.()}</div>
    }
  },
  name: `${prefix}-resize-item`,
  props: resizeItemProps,
  emits: resizeItemEmits
})
export default ResizeItem
