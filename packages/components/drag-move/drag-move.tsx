import { defineComponent, ref, onMounted, h, reactive } from 'vue'
import { dragMoveProps, dragMoveEmits } from './type'
import { prefix } from 'constants/config'
import { consolaWapper, isFunction } from '../_util'
import { useEventListener } from '../_util'

type DragMoveState = {
  isDragging: boolean
  constrainerEl: HTMLElement | null
  handlerEl: HTMLElement | null
}

export default defineComponent({
  setup(props, ctx) {
    const state = reactive<DragMoveState>({
      isDragging: false,
      constrainerEl: null,
      handlerEl: null
    })
    const dragMoveRef = ref<HTMLElement | null>(null)
    onMounted(() => {
      if (props.constrainer && isFunction(props.constrainer)) {
        const constrainerEl = props.constrainer()
        if (constrainerEl instanceof HTMLElement) state.constrainerEl = constrainerEl
      }
      if (props.handler && isFunction(props.handler)) {
        const handlerEl = props.handler()
        if (handlerEl instanceof HTMLElement) state.handlerEl = handlerEl
      }

      const { style } = dragMoveRef.value as HTMLElement
      if (style && !['absolute', 'fixed'].includes(style.position)) {
        consolaWapper.warn('dragMove: The element you want to drag must have a position attribute.')
      }
    })
    const triggerDragging = (isDragging?: boolean) => {
      if (isDragging === undefined) state.isDragging = !state.isDragging
      else state.isDragging = isDragging
    }

    const isOverflow = (position: { left: number; top: number }) => {
      const { left, top } = position
      const container = state.constrainerEl?.getBoundingClientRect()
      console.log(container)
      return {
        left,
        top
      }
    }

    useEventListener(document.body, 'mousemove', (e: MouseEvent) => {
      if (!state.isDragging) return
      ctx.emit('mouseMove', e)
      const { allowMove, customMove, allowInputDrag } = props
      const isAllowMove = !!allowMove(e, dragMoveRef.value as HTMLElement)
      if (isAllowMove) {
        if (
          !allowInputDrag &&
          (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)
        ) {
          return
        }
        // 修复移动计算逻辑
        if (dragMoveRef.value) {
          const element = dragMoveRef.value
          // 获取元素当前位置（相对于其offsetParent）
          const currentLeft = element.offsetLeft
          const currentTop = element.offsetTop

          // 计算鼠标移动的偏移量
          const deltaX = e.movementX
          const deltaY = e.movementY

          // 计算新位置
          const newLeft = currentLeft + deltaX
          const newTop = currentTop + deltaY

          if (isFunction(customMove)) {
            customMove(element, newTop, newLeft)
          } else {
            //判断是否溢出
            if (state.constrainerEl) {
              const position = { left: element.offsetLeft, top: element.offsetTop }
              const { left, top } = isOverflow(position)
            }
            element.style.left = newLeft + 'px'
            element.style.top = newTop + 'px'
          }
        }
      }
    })

    useEventListener(document.body, 'mouseup', (e: MouseEvent) => {
      ctx.emit('mouseUp', e)
      triggerDragging(false)
    })

    return () => {
      const component = ctx.slots.default?.()
      if (component && component.length > 0) {
        const firstChild = component[0]

        return h(firstChild, {
          ref: dragMoveRef,
          style: {
            ...firstChild.props?.style,
            cursor: 'move'
          },
          onMousedown: (e: MouseEvent) => {
            if (state.handlerEl) {
              if (state.handlerEl.contains(e.target as Node)) {
                ctx.emit('mouseDown', e)
                triggerDragging(true)
              }
            } else {
              ctx.emit('mouseDown', e)
              triggerDragging(true)
            }
          },
          onTouchstart: (e: TouchEvent) => {
            ctx.emit('touchStart', e)
          },
          onTouchmove: (e: TouchEvent) => {
            ctx.emit('touchMove', e)
          },
          onTouchend: (e: TouchEvent) => {
            ctx.emit('touchEnd', e)
          }
        })
      }
      return null
    }
  },
  name: prefix + '-drag-move',
  props: dragMoveProps,
  emits: dragMoveEmits
})
