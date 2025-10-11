import { defineComponent, ref, onMounted, h, reactive } from 'vue'
import { dragMoveProps, dragMoveEmits } from './type'
import { prefix } from 'constants/config'
import { isFunction } from '../_util'
import { useEventListener } from '../_util'

type DragMoveState = {
  isDragging: boolean
  constrainerEl: HTMLElement | null
  handlerEl: HTMLElement | null
}

// 扩展HTMLElement接口，添加触摸位置属性
interface ExtendedHTMLElement extends HTMLElement {
  _lastTouchX?: number
  _lastTouchY?: number
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
        if (constrainerEl instanceof HTMLElement) {
          state.constrainerEl = constrainerEl
          // 处理限制容器没有不是定位包含块情况
          if (constrainerEl.style.position === 'static') {
            constrainerEl.style.position = 'absolute'
          }
        }
      }

      if (props.handler && isFunction(props.handler)) {
        const handlerEl = props.handler()
        if (handlerEl instanceof HTMLElement) {
          state.handlerEl = handlerEl
          state.handlerEl.style.cursor = 'move'
        }
      }

      if (dragMoveRef.value) {
        const { style } = dragMoveRef.value as HTMLElement
        if (style && !['absolute', 'fixed'].includes(style.position)) {
          dragMoveRef.value.style.position = 'absolute'
        }
      }
    })
    const triggerDragging = (isDragging?: boolean) => {
      if (isDragging === undefined) state.isDragging = !state.isDragging
      else state.isDragging = isDragging
    }

    const handleDragMove = (e: MouseEvent | TouchEvent) => {
      if (!state.isDragging) return

      if (e instanceof MouseEvent) {
        ctx.emit('mouseMove', e)
      } else {
        ctx.emit('touchMove', e)
      }

      const { allowMove, customMove, allowInputDrag } = props
      const isAllowMove = !!allowMove(e, dragMoveRef.value as HTMLElement)
      if (isAllowMove) {
        if (
          !allowInputDrag &&
          (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)
        ) {
          return
        }

        if (dragMoveRef.value) {
          const element = dragMoveRef.value as ExtendedHTMLElement
          const currentLeft = element.offsetLeft
          const currentTop = element.offsetTop

          let deltaX = 0
          let deltaY = 0

          if (e instanceof MouseEvent) {
            // 鼠标移动使用movement属性
            deltaX = e.movementX
            deltaY = e.movementY
          } else {
            // 触摸移动需要手动计算
            if (e.touches.length > 0) {
              const touch = e.touches[0]
              if (typeof element._lastTouchX !== 'undefined') {
                deltaX = touch.clientX - element._lastTouchX
              }

              if (typeof element._lastTouchY !== 'undefined') {
                deltaY = touch.clientY - element._lastTouchY
              }

              // 保存当前位置供下次计算使用
              element._lastTouchX = touch.clientX
              element._lastTouchY = touch.clientY
            } else {
              return
            }
          }

          let newLeft = currentLeft + deltaX
          let newTop = currentTop + deltaY

          // 应用边界检测
          if (state.constrainerEl && dragMoveRef.value) {
            const { left, top } = isOverflow(element, newLeft, newTop)
            newLeft = left
            newTop = top
          }

          if (isFunction(customMove)) {
            customMove(element, newTop, newLeft)
          } else {
            element.style.left = newLeft + 'px'
            element.style.top = newTop + 'px'
          }
        }
      }

      // 对于触摸事件，阻止页面滚动
      if (e instanceof TouchEvent) {
        e.preventDefault()
      }
    }

    const isOverflow = (element: HTMLElement, newLeft: number, newTop: number) => {
      const container = state.constrainerEl
      let correctedLeft = newLeft
      let correctedTop = newTop

      if (container) {
        // 获取元素的尺寸
        const elementWidth = element.offsetWidth
        const elementHeight = element.offsetHeight

        // 限制左边界
        if (newLeft < 0) {
          correctedLeft = 0
        }

        // 限制右边界
        if (newLeft + elementWidth > container.offsetWidth) {
          correctedLeft = container.offsetWidth - elementWidth
        }

        // 限制上边界
        if (newTop < 0) {
          correctedTop = 0
        }

        // 限制下边界
        if (newTop + elementHeight > container.offsetHeight) {
          correctedTop = container.offsetHeight - elementHeight
        }
      }

      return {
        left: correctedLeft,
        top: correctedTop
      }
    }

    useEventListener(document.body, 'mousemove', (e: MouseEvent) => {
      handleDragMove(e)
    })

    useEventListener(document.body, 'mouseup', (e: MouseEvent) => {
      ctx.emit('mouseUp', e)
      triggerDragging(false)
    })

    useEventListener(
      document.body,
      'touchmove',
      (e: TouchEvent) => {
        handleDragMove(e)
      },
      { passive: false } as AddEventListenerOptions
    )

    useEventListener(document.body, 'touchend', (e: TouchEvent) => {
      ctx.emit('touchEnd', e)
      triggerDragging(false)
      // 清除保存的触摸位置
      if (dragMoveRef.value) {
        const element = dragMoveRef.value as ExtendedHTMLElement
        delete element._lastTouchX
        delete element._lastTouchY
      }
    })

    function handleMoveStart(e: MouseEvent): void
    function handleMoveStart(e: TouchEvent): void
    function handleMoveStart(e: MouseEvent | TouchEvent) {
      if (state.handlerEl && !state.handlerEl.contains(e.target as Node)) return
      if (e instanceof MouseEvent) ctx.emit('mouseDown' as const, e)
      else {
        if (e.touches.length > 0) {
          const touch = e.touches[0]
          if (dragMoveRef.value) {
            const element = dragMoveRef.value as ExtendedHTMLElement
            element._lastTouchX = touch.clientX
            element._lastTouchY = touch.clientY
          }
        }
        ctx.emit('touchStart' as const, e)
      }
      triggerDragging(true)
    }
    return () => {
      const component = ctx.slots.default?.()
      if (component && component.length > 0) {
        const firstChild = component[0]
        const style = {
          ...firstChild.props?.style
        }
        if (!state.handlerEl) {
          style.cursor = 'move'
        }
        return h(firstChild, {
          ref: dragMoveRef,
          style: style,
          onMousedown: (e: MouseEvent) => {
            handleMoveStart(e)
          },
          onTouchstart: (e: TouchEvent) => {
            handleMoveStart(e)
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
