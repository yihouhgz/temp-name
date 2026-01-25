import { defineComponent, cloneVNode, reactive, watchEffect } from 'vue'
import { prefix } from 'constants/config'
import { carouselProps, carouselEmits } from './type'
import type { CarouselRef } from './type'
import './style/carousel'
import {
  consolaWrapper,
  isArray,
  isNumber,
  isObject,
  isUndefined,
  useEventListener
} from '../_util'
import type { VNode, StyleValue, HTMLAttributes } from 'vue'
import { IconChevronLeft, IconChevronRight } from 'icons'
import { computed } from 'vue'
import { onMounted } from 'vue'

type CarouselState = {
  currentIndex: number
  direction: 'reverse' | 'forward'
  containerRef: HTMLElement | null
  isHover: boolean
  isAnimation: boolean
}
const Carousel = defineComponent({
  setup(props, ctx) {
    let vNodeLength = 0
    const state = reactive<CarouselState>({
      currentIndex: props.defaultActiveIndex || 0,
      direction: 'forward',
      containerRef: null,
      isHover: false,
      isAnimation: false
    })
    watchEffect(() => {
      const { activeIndex } = props
      if (isNumber(activeIndex)) {
        state.currentIndex = activeIndex
      }
    })
    onMounted(() => {
      const { arrowType } = props
      if (arrowType === 'hover') {
        useEventListener(state.containerRef, 'mouseenter', () => {
          state.isHover = true
        })
        useEventListener(state.containerRef, 'mouseleave', () => {
          state.isHover = false
        })
      }
    })
    ctx.expose<CarouselRef>({
      stop: () => {
        loopWatch?.stop()
      },
      play: () => {
        loopWatch?.pause()
      },
      goTo: (targetIndex: number) => {
        if (targetIndex < 0 || targetIndex > vNodeLength - 1) {
          consolaWrapper.warn('The index is out of bounds')
          return
        }
        handleToTarget(targetIndex)
      },
      prev: () => {
        handlePrev()
      },
      next: () => {
        handleNext()
      }
    })
    const getAutoPlay = () => {
      const { autoPlay, activeIndex } = props
      const params = {
        interval: 2000,
        hoverToresume: true,
        isLoop: !!autoPlay && isUndefined(activeIndex)
      }
      if (isObject(autoPlay)) {
        Object.assign(params, autoPlay)
      }
      return params
    }
    const loopWatch = watchEffect((onCleanup) => {
      const { interval, hoverToresume, isLoop } = getAutoPlay()
      if (!isLoop) {
        return
      }
      const setLoop = () => {
        const timer = setInterval(() => {
          handleNext()
        }, Math.abs(interval))
        return timer
      }
      let timer = setLoop()
      const clear = () => {
        clearInterval(timer)
      }
      if (hoverToresume) {
        useEventListener(state.containerRef, 'mouseenter', () => {
          clear()
        })
        useEventListener(state.containerRef, 'mouseleave', () => {
          timer = setLoop()
        })
      }
      onCleanup(() => {
        clear()
      })
    })
    const getCarouselIndex = (children: unknown[] = []) => {
      const len = children.length
      vNodeLength = len
      const { currentIndex } = state
      let current = currentIndex
      if (currentIndex > len - 1) {
        consolaWrapper.warn('The activeIndex or defaultActiveIndex is out of bounds')
        current = 0
      }
      let nextIndex = currentIndex + 1
      if (nextIndex > len - 1) {
        nextIndex = 0
      }
      let prevIndex = currentIndex - 1
      if (prevIndex < 0) {
        prevIndex = len - 1
      }
      return {
        currentIndex: current,
        nextIndex,
        prevIndex
      }
    }
    const handleEmitEvents = (prevIndex: number) => {
      ctx.emit('change', state.currentIndex, prevIndex)
    }
    const handlePrev = () => {
      const currentIndex = state.currentIndex
      state.direction = 'reverse'
      let tempIndex = currentIndex - 1
      if (tempIndex < 0) {
        tempIndex = vNodeLength - 1
      }
      loopWatch.resume()
      const prevIndex = state.currentIndex
      state.currentIndex = tempIndex
      handleEmitEvents(prevIndex)
    }
    const handleNext = () => {
      const currentIndex = state.currentIndex
      state.direction = 'forward'
      let tempIndex = currentIndex + 1
      if (tempIndex > vNodeLength - 1) {
        tempIndex = 0
      }
      loopWatch.resume()
      const prevIndex = state.currentIndex
      state.currentIndex = tempIndex
      handleEmitEvents(prevIndex)
    }
    const handleToTarget = (targetIndex: number) => {
      if (targetIndex > state.currentIndex) {
        state.direction = 'forward'
      } else {
        state.direction = 'reverse'
      }
      loopWatch.resume()
      const prevIndex = state.currentIndex
      state.currentIndex = targetIndex
      handleEmitEvents(prevIndex)
    }
    const getDirection = computed(() => {
      const { slideDirection } = props
      const { direction } = state
      if (slideDirection === 'left') {
        return direction === 'forward' ? 'reverse' : 'forward'
      }
      return direction
    })
    const renderContent = () => {
      const c = ctx.slots.default?.() || []
      let children = c[0]?.children || []
      if (!isArray(children)) {
        children = []
      }
      const { currentIndex, nextIndex, prevIndex } = getCarouselIndex(children)
      const style: StyleValue = {
        transitionTimingFunction: 'ease',
        transitionDuration: props.speed + 'ms',
        animationTimingFunction: 'ease',
        animationDuration: props.speed + 'ms'
      }
      return (
        <div
          class={[
            prefix + '-carousel-content',
            prefix + '-carousel-content-' + props.animation,
            prefix + '-carousel-content-' + getDirection.value
          ]}
        >
          {children.map((child, index) => {
            return cloneVNode(child as VNode, {
              class: [
                prefix + '-carousel-content-item',
                {
                  [prefix + '-carousel-content-item-current']: index === currentIndex,
                  [prefix + '-carousel-content-item-active']: index === currentIndex,
                  [prefix + '-carousel-content-item-slide-in']:
                    index === currentIndex && props.animation === 'slide',
                  [prefix + '-carousel-content-item-next']: index === nextIndex,
                  [prefix + '-carousel-content-item-slide-out']:
                    index === nextIndex && props.animation === 'slide',
                  [prefix + '-carousel-content-item-prev']: index === prevIndex
                }
              ],
              style
            })
          })}
        </div>
      )
    }
    const renderIndicator = () => {
      if (!props.showIndicator) {
        return null
      }
      const indicators = []
      for (let i = 0; i < vNodeLength; i++) {
        const events: HTMLAttributes = {}
        if (props.trigger === 'click') {
          events.onClick = () => {
            handleToTarget(i)
            loopWatch.resume()
          }
        } else {
          events.onMouseenter = () => {
            handleToTarget(i)
            loopWatch.resume()
          }
        }
        indicators.push(
          <span
            key={i}
            {...events}
            class={[
              `${prefix}-carousel-indicator-item`,
              `${prefix}-carousel-indicator-item-${props.indicatorSize}`,
              `${prefix}-carousel-indicator-item-${props.theme}`,
              {
                [`${prefix}-carousel-indicator-item-active`]: i === state.currentIndex
              }
            ]}
          ></span>
        )
      }
      return (
        <div class={[`${prefix}-carousel-indicator`]}>
          <div
            class={[
              `${prefix}-carousel-indicator`,
              `${prefix}-carousel-indicator-${props.indicatorPosition}`,
              `${prefix}-carousel-indicator-${props.indicatorType}`
            ]}
          >
            {indicators}
          </div>
        </div>
      )
    }

    const showArrow = computed(() => {
      const { arrowType } = props
      if (!props.showArrow) {
        return false
      }
      if (arrowType === 'hover') {
        return state.isHover
      }
      return true
    })
    const renderArrow = () => {
      if (!showArrow.value) {
        return null
      }
      const arrowProps = props.arrowProps
      const prevIcon = () => {
        let icon = <IconChevronLeft aria-label="Previous index" size="extra-large" />
        let divProps = {}
        if (arrowProps?.leftArrow) {
          icon = arrowProps.leftArrow.children as VNode
          divProps = arrowProps.leftArrow.props || {}
        }
        return (
          <div
            {...divProps}
            class={[prefix + '-carousel-arrow-prev']}
            onClick={() => {
              handlePrev()
              loopWatch.resume()
            }}
          >
            {icon}
          </div>
        )
      }
      const nextIcon = () => {
        let icon = <IconChevronRight aria-label="Next index" size="extra-large" />
        let divProps = {}
        if (arrowProps?.rightArrow) {
          icon = arrowProps.rightArrow.children as VNode
          divProps = arrowProps.rightArrow.props || {}
        }
        return (
          <div
            {...divProps}
            class={[prefix + '-carousel-arrow-next']}
            onClick={() => {
              handleNext()
              loopWatch.resume()
            }}
          >
            {icon}
          </div>
        )
      }
      return (
        <div class={[prefix + '-carousel-arrow', prefix + '-carousel-arrow-' + props.theme]}>
          {prevIcon()}
          {nextIcon()}
        </div>
      )
    }
    return () => {
      return (
        <div
          class={prefix + '-carousel'}
          ref={(containerRef) => (state.containerRef = containerRef as HTMLElement)}
        >
          {renderContent()}
          {renderIndicator()}
          {renderArrow()}
        </div>
      )
    }
  },
  props: carouselProps,
  emits: carouselEmits,
  name: prefix + '-carousel'
})

export default Carousel
