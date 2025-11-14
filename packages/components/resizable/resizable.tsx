import { defineComponent, computed, reactive, onMounted, effectScope } from 'vue'
import type { StyleValue } from 'vue'
import { prefix } from 'constants/config'
import { resizableProps, resizableEmits } from './type'
import type { Size } from './type'
import './style/resizable'
import { direction } from './constant'
import { isNumber, isString, useEventListener } from '../_util'
import { watchEffect } from 'vue'
type DirectionKeys = (typeof direction)[number]
type StateType = {
  handlerRefNodes: Record<DirectionKeys, HTMLElement | null>
  current: {
    isDrag: boolean
    direction: DirectionKeys | null
  }
  size: Size
}
const Resizable = defineComponent({
  setup(props, ctx) {
    const state = reactive<StateType>({
      handlerRefNodes: direction.reduce(
        (acc, cur) => {
          acc[cur] = null
          return acc
        },
        {} as Record<DirectionKeys, HTMLElement | null>
      ),
      current: {
        isDrag: false,
        direction: null
      },
      size: {
        width: 0,
        height: 0
      }
    })
    watchEffect(() => {
      const { size, defaultSize } = props
      if (defaultSize.width || defaultSize.height) {
        state.size = {
          width: defaultSize.width!,
          height: defaultSize.height!
        }
      }
      if (size.width || size.height) {
        state.size = {
          width: size.width!,
          height: size.height!
        }
      }
    })
    const wrapperClass = computed(() => {
      return [prefix + '-resizable']
    })
    const wrapperStyle = computed<StyleValue>(() => {
      const width = isNumber(state.size.width) ? state.size.width + 'px' : state.size.width
      const height = isNumber(state.size.height) ? state.size.height + 'px' : state.size.height
      return {
        width,
        height,
        userSelect: state.current.isDrag ? 'none' : 'auto'
      }
    })

    const eventHandleScope = effectScope()
    const initEventHandle = () => {
      eventHandleScope.run(() => {
        for (const key in state.handlerRefNodes) {
          const handler = state.handlerRefNodes[key as keyof typeof state.handlerRefNodes]
          useEventListener(handler, 'mousedown', (e) => {
            state.current.isDrag = true
            state.current.direction = key as DirectionKeys
            ctx.emit('resizeStart', e, state.current.direction!)
          })
        }
        useEventListener(window, 'mousemove', (e) => {
          if (state.current.isDrag) {
            // 根据方向调整尺寸
            const dir = state.current.direction!
            switch (dir) {
              case 'left':
                // 向左拖动，宽度减少 movementX
                updateTargetSize('left', ['width'], -e.movementX, e)
                break
              case 'right':
                // 向右拖动，宽度增加 movementX
                updateTargetSize('right', ['width'], e.movementX, e)
                break
              case 'top':
                // 向上拖动，高度减少 movementY
                updateTargetSize('top', ['height'], -e.movementY, e)
                break
              case 'bottom':
                // 向下拖动，高度增加 movementY
                updateTargetSize('bottom', ['height'], +e.movementY, e)
                break
              case 'bottomLeft':
                // 向左下拖动，宽度减少 movementX，高度增加 movementY
                updateTargetSize('bottomLeft', ['width'], -e.movementX, e)
                updateTargetSize('bottomLeft', ['height'], -e.movementY, e)
                break
              case 'bottomRight':
                // 向右下拖动，宽度增加 movementX，高度增加 movementY
                updateTargetSize('bottomRight', ['width', 'height'], e.movementX, e)
                break
              case 'topLeft':
                // 向左上拖动，宽度减少 movementX，高度减少 movementY
                updateTargetSize('topLeft', ['width', 'height'], -e.movementX, e)
                break
              case 'topRight':
                // 向右上拖动，宽度增加 movementX，高度减少 movementY
                updateTargetSize('topRight', ['width', 'height'], e.movementX, e)
                break
            }
          }
        })
        useEventListener(window, 'mouseup', (e) => {
          if (state.current.isDrag) {
            ctx.emit('resizeEnd', e, state.current.direction!)
            console.log(e, 'asdasdasd')
            state.current.isDrag = false
            state.current.direction = null
          }
        })
      })
    }
    const splitMultipleValues = (value: string): [number, string] => {
      const match = value.match(/^([\d.]+)(\D+)$/)
      return match ? [parseFloat(match[1]), match[2]] : [parseFloat(value), '']
    }
    const updateTargetSize = (
      direction: DirectionKeys,
      keys: ('width' | 'height')[],
      offset: number,
      event: Event
    ) => {
      for (const key of keys) {
        const originValue = state.size[key]
        if (isString(originValue)) {
          // vw/vh/%/auto
          if (originValue === 'auto') {
            const rect = state.handlerRefNodes[direction]?.getBoundingClientRect()
            if (rect) {
              state.size[key] = (rect[key === 'width' ? 'width' : 'height'] +
                offset +
                'px') as Size['height']
            }
          } else {
            const [value, unit] = splitMultipleValues(originValue)
            let setValue = ''
            switch (unit) {
              case 'vw':
                setValue = value + offset + 'vw'
                break
              case 'vh':
                setValue = value + offset + 'vh'
                break
              case '%':
                setValue = value + offset + '%'
                break
            }
            state.size[key] = setValue as Size['height']
          }
        } else if (isNumber(offset) && isNumber(originValue)) {
          state.size[key] = offset + originValue
        }
      }
      ctx.emit('change', state.size, event, direction)
    }
    onMounted(() => {
      console.log(state.handlerRefNodes, 'onMounted')
      initEventHandle()
    })
    return () => {
      return (
        <div class={wrapperClass.value} style={wrapperStyle.value}>
          {ctx.slots.default?.()}
          <div>
            {direction.map((direction) => {
              return (
                <div
                  ref={(node) => (state.handlerRefNodes[direction] = node as HTMLElement)}
                  class={prefix + '-resizable-handle ' + prefix + '-resizable-handle-' + direction}
                ></div>
              )
            })}
          </div>
        </div>
      )
    }
  },
  name: prefix + '-resizable',
  props: resizableProps,
  emits: resizableEmits
})
export default Resizable
