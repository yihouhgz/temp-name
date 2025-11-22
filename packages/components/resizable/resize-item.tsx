import { defineComponent, computed, ref } from 'vue'
import { prefix } from 'constants/config'
import './style/resizable.ts'
import { resizeItemProps, resizeItemEmits } from './type'
import type { Size } from './type'
import Resizable from './resizable'
import { watchEffect } from 'vue'
import type { ResizableExpose } from './resizable'

export type ResizeItemExpose = {
  _onResizeStart: (e: Event, direction: string) => void
  _onResizeEnd: (e: Event, direction: string) => void
} & ResizableExpose

const ResizeItem = defineComponent({
  setup(props, ctx) {
    const resizeItemRef = ref()
    const resizablePropsMap = ref({})
    const wrapperClassNames = computed(() => {
      return [`${prefix}-resizable-item`]
    })
    const enable = {
      left: false,
      right: false,
      top: false,
      bottom: false,
      topLeft: false,
      topRight: false,
      bottomLeft: false,
      bottomRight: false
    }
    const onResizeStart = (e: Event, direction: string) => {
      ctx.emit('resizeStart', e, direction)
    }
    const onResizeEnd = (e: Event, direction: string) => {
      ctx.emit('resizeEnd', e, direction)
    }
    const onChange = (size: Size, e: Event, direction: string) => {
      ctx.emit('change', size, e, direction)
    }
    ctx.expose({
      _updateTargetSizeWrap(e: Event, direction: string) {
        resizeItemRef.value?._updateTargetSizeWrap(e, direction)
      },
      _onResizeStart: onResizeStart,
      _onResizeEnd: onResizeEnd
    })
    watchEffect(() => {
      const { defaultSize, min, max, _direction } = props
      console.log(defaultSize, min, max, 'defaultSize, min, max')
      const key = _direction === 'horizontal' ? 'width' : 'height'
      const tempPrpos = {}
      if (defaultSize) {
        console.log(tempPrpos)
      }
      resizablePropsMap.value = {
        [key]: defaultSize,
        ['min' + key]: min,
        ['max' + key]: max
      }
    })
    return () => {
      return (
        <Resizable
          {...resizablePropsMap.value}
          onResizeStart={onResizeStart}
          onResizeEnd={onResizeEnd}
          onChange={onChange}
          class={wrapperClassNames.value}
          enable={enable}
          ref={(node) => (resizeItemRef.value = node)}
        >
          {ctx.slots.default?.()}
        </Resizable>
      )
    }
  },
  name: `${prefix}-resize-item`,
  props: resizeItemProps,
  emits: resizeItemEmits
})
export default ResizeItem
