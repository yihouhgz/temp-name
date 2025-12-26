import { defineComponent, watchEffect, reactive, computed, nextTick, watch, onMounted } from 'vue'
import { prefix } from 'constants/config'
import { collapsibleProps, collapsibleEmits } from './type'
import type { StyleValue } from 'vue'
import './style/collapsible'
import { onElementResize } from '../_util'

type CollapsibleState = {
  isOpen: boolean
  container: HTMLElement | null
  isAnimation: boolean
  containerHeight: number
  animationState: 'enter' | 'leave'
  lazyRender: boolean
}
const Collapsible = defineComponent({
  setup(props, ctx) {
    const state = reactive<CollapsibleState>({
      isOpen: props.isOpen,
      lazyRender: props.lazyRender,
      container: null,
      containerHeight: 0,
      isAnimation: false,
      animationState: 'enter'
    })
    onMounted(() => {
      state.lazyRender = false
      onElementResize(state.container, () => {
        calcContainerHeight()
      })
    })
    const calcContainerHeight = () => {
      const rect = state.container?.getBoundingClientRect()
      state.containerHeight = rect?.height || 0
    }
    watch(
      () => props.reCalcKey,
      () => {
        calcContainerHeight()
      }
    )
    watchEffect(() => {
      const { isOpen } = props
      state.isOpen = isOpen
      nextTick(() => {
        if (!state.containerHeight) {
          calcContainerHeight()
        }
      })
    })
    watchEffect(() => {
      if (state.isOpen) {
        state.animationState = 'enter'
      } else {
        state.animationState = 'leave'
      }
      state.isAnimation = true
    })
    const wrapperStyle = computed<StyleValue>(() => {
      const height = state.isOpen ? state.containerHeight : props.collapseHeight
      const transitionDuration = state.isAnimation ? props.duration + 'ms' : '0ms'
      const opacity = state.isOpen ? 1 : 0
      const style: StyleValue = {
        height: height + 'px',
        opacity: props.fade ? opacity : 1,
        transitionDuration: props.motion ? transitionDuration : '0ms'
      }
      style.overflow = 'hidden'
      return style
    })
    const handleAnimationStart = () => {
      if (state.isAnimation) {
        return
      }
      ctx.emit('motionStart')
    }
    const handleAnimationEnd = () => {
      if (!state.isAnimation) return
      ctx.emit('motionEnd')
      state.isAnimation = false
    }
    const renderChildren = () => {
      if (!state.isOpen && !state.isAnimation && !props.keepDOM) {
        return null
      }
      if (state.lazyRender) {
        return null
      }
      const children = ctx.slots.default?.()
      return children
    }
    return () => {
      const animationClassName = 'semi-collapsible-transition'
      return (
        <div
          class={[prefix + '-collapsible-wrapper', animationClassName]}
          style={wrapperStyle.value}
          onTransitionstart={handleAnimationStart}
          onTransitionend={handleAnimationEnd}
        >
          <div
            {...(props.id ? { id: props.id } : {})}
            style={'overflow: hidden'}
            ref={(el) => {
              state.container = el as HTMLElement
            }}
          >
            {renderChildren()}
          </div>
        </div>
      )
    }
  },
  props: collapsibleProps,
  emits: collapsibleEmits,
  name: prefix + '-collapsible'
})
export default Collapsible
