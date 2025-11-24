import {
  defineComponent,
  ref,
  computed,
  Fragment,
  nextTick,
  cloneVNode,
  onMounted,
  watch,
  reactive,
  useAttrs,
  type StyleValue,
  type CSSProperties,
  type ExtractPropTypes
} from 'vue'
import { prefix } from 'constants/config'
import './style/tooltip'
import { tooltioProps, tooltipEmits } from './type'
import { isFunction, domRectToObject, isNumber, useEventListener, useSetTimeout } from '../_util'
import Portal from '../portal'
import { triggerEventMap } from './trigger'
import { useClickOutside, onElementResize } from '../_util'
import { calcPosition, type PopupContainerDOMRect } from './herps'
import CssAnimation from '../css-animation'
import { arrowBounding } from './constant'
import { watchEffect } from 'vue'
import ArrowHorizontalIcon from './arrow-horizontal-icon'
import ArrowVerticalIcon from './arrow-vertical-icon'
import { effectScope } from 'vue'

const Tooltip = defineComponent({
  setup(props, ctx) {
    const innerRef = ref()
    const tooltipDefaultRef = ref()
    const triggerElementRef = ref<HTMLElement>()
    const targetElementRect = ref()
    const triggerEventSet = ref()
    const clickOutsideStop = ref()
    const state = reactive({
      wrapperId: props.wrapperId
    })

    watch(
      () => props.rePosKey,
      () => {
        if (showTooltip.value) {
          updatePosition()
        }
      }
    )
    const hoverScope = effectScope()
    watchEffect(() => {
      const trigger = props.trigger as keyof typeof triggerEventMap
      const targetEventMap = triggerEventMap[trigger]
      const eventSet: { [key: string]: (e: Event) => void } = {}
      if (trigger !== 'custom') {
        const registerEnterEvent = () => {
          eventSet[targetEventMap.enter] = (e: Event) => {
            if (showTooltip.value) return
            if (trigger === 'contextMenu') {
              e.preventDefault()
            }
            triggerHnadle()
          }
        }
        if (['hover'].includes(trigger)) {
          useSetTimeout(() => {
            registerEnterEvent()
          }, props.mouseLeaveDelay)
        } else {
          registerEnterEvent()
        }
        if (!['click', 'contextMenu'].includes(trigger)) {
          eventSet[targetEventMap.leave] = () => {
            if (trigger === 'hover') {
              hoverScope.run(() => {
                let hoverInInner = false
                useEventListener(innerRef.value, 'mouseenter', () => (hoverInInner = true), {
                  once: true
                })
                useEventListener(
                  innerRef.value,
                  'mouseleave',
                  () => {
                    hoverInInner = false
                    triggerLeave()
                  },
                  { once: true }
                )
                useSetTimeout(() => {
                  if (!hoverInInner) {
                    triggerLeave()
                  }
                }, props.mouseLeaveDelay)
              })
            } else {
              triggerLeave()
            }
          }
        }
      }
      triggerEventSet.value = eventSet
    })
    const registerClickOutside = () => {
      const trigger = props.trigger
      const clickOutsideSet = ['contextMenu', 'click', 'custom']
      if (clickOutsideSet.includes(trigger)) {
        if (clickOutsideStop.value) clickOutsideStop.value?.()
        const stop = useClickOutside(triggerElementRef.value as HTMLElement, (event) => {
          handleClickOutside(event)
        })
        clickOutsideStop.value = stop
      }
    }
    const handleClickOutside = (event: Event) => {
      if (showTooltip.value && innerRef.value) {
        if (!props.clickToHide && innerRef.value.contains(event.target)) return
      } else {
        return
      }
      if (props.trigger !== 'custom') {
        triggerLeave()
      }
      ctx.emit('clickOutSide', event)
    }
    const wrapperClass = computed(() => {
      return [`${props.prefixCls}-wrapper`, `${props.prefixCls}-` + props.position]
    })
    const arrowClass = computed(() => {
      const _position = (innerStyle.value as { _position: string })?._position
      return [
        `${prefix}-tooltip-arrow`,
        `${prefix}-tooltip-` + (_position || props.position) + '-arrow'
      ]
    })
    const show = ref(false)
    const animationOptions = reactive({
      isAnimating: false,
      transitionState: 'enter'
    })
    watch(
      () => props.visible,
      (res) => {
        animationOptions.isAnimating = true
        animationOptions.transitionState = res ? 'enter' : 'leave'
      }
    )
    const showTooltip = computed(() => {
      const { trigger, visible } = props
      if (animationOptions.isAnimating) return animationOptions.isAnimating
      if (trigger !== 'custom') {
        return show.value
      }
      return visible
    })
    const scope = effectScope()
    watch(
      () => showTooltip.value,
      (show) => {
        scope.run(() => {
          if (show) {
            registerClickOutside()
          } else {
            clickOutsideStop.value?.()
          }
          ctx.emit('visibleChange', showTooltip.value)
        })
      }
    )
    const triggerHnadle = () => {
      if (props.motion) {
        animationOptions.isAnimating = true
        animationOptions.transitionState = 'enter'
      }
      show.value = true
    }
    const triggerLeave = () => {
      if (props.motion) {
        animationOptions.isAnimating = true
        animationOptions.transitionState = 'leave'
      }
      show.value = false
    }

    onMounted(() => {
      const target = tooltipDefaultRef.value.nextElementSibling as HTMLElement
      triggerElementRef.value = target
      targetElementRect.value = target.getBoundingClientRect()
      onElementResize(triggerElementRef.value, () => {
        if (showTooltip.value) {
          const position = calcPosition(options.utils)
          if (isNumber(position.top)) position.top = position.top + 'px'
          if (isNumber(position.left)) position.left = position.left + 'px'
          innerStyle.value = position
        }
      })
      if (props.trigger === 'custom' && showTooltip.value) {
        registerClickOutside()
      }
      // const eventMap = triggerEventMap[props.trigger as keyof typeof triggerEventMap]
      // useEventListener(target, eventMap.enter as keyof EventMap, triggerHnadle)
      // if (eventMap.enter === 'click' || eventMap.enter === 'custom') {
      //   const handleClickOutside = (event: Event) => {
      //     if (showTooltip.value && innerRef.value) {
      //       if (!props.clickToHide && innerRef.value.contains(event.target)) return
      //     } else {
      //       return
      //     }
      //     if (eventMap.enter === 'custom') {
      //       ctx.emit('visibleChange', false)
      //     } else {
      //       triggerLeave()
      //     }
      //     ctx.emit('clickOutSide', event)
      //   }
      //   useClickOutside(target, handleClickOutside)
      // } else {
      //   const scope = effectScope()
      //   if (eventMap.leave !== 'contextmenu') {
      //     useEventListener(target, eventMap.leave, () => {
      //       if (eventMap.leave === 'mouseleave') {
      //         scope.run(() => {
      //           let hoverInInner = false
      //           // 鼠标移出
      //           useEventListener(innerRef.value, 'mouseenter', () => (hoverInInner = true), {
      //             once: true
      //           })
      //           useEventListener(
      //             innerRef.value,
      //             'mouseleave',
      //             () => {
      //               hoverInInner = false
      //               triggerLeave()
      //             },
      //             { once: true }
      //           )
      //           useSetTimeout(() => {
      //             if (!hoverInInner) {
      //               triggerLeave()
      //             }
      //           }, 100)
      //         })
      //       } else {
      //         triggerLeave()
      //       }
      //     })
      //   }
      //   const udpateCallback = useThrottle(updatePosition, 20)
      //   useEventListener(window, 'scroll', () => {
      //     if (showTooltip.value) udpateCallback()
      //   })
      // }
    })

    const options = {
      utils: {
        getTriggerBounding() {
          return (triggerElementRef.value as HTMLElement).getBoundingClientRect()
        },
        getPopupContainer() {
          return props.getPopupContainer(triggerElementRef.value as HTMLElement)
        },
        getPopupContainerRect() {
          const container = this.getPopupContainer()
          let rect: PopupContainerDOMRect | null = null
          const boundingRect = container.getBoundingClientRect()
          rect = {
            ...(domRectToObject(boundingRect) as DOMRect),
            scrollLeft: container.scrollLeft,
            scrollTop: container.scrollTop
          }
          return rect
        },
        getWrapperBounding() {
          const wrapper = innerRef.value as HTMLElement
          if (wrapper) return wrapper.getBoundingClientRect()
          return null
        },
        getContainer() {
          const wrapper = innerRef.value as HTMLElement
          return wrapper
        },
        setPosition(value: unknown) {
          console.log(value, 'setPosition')
        },
        getProp<T>(name: string): T {
          return props[name as keyof typeof props] as T
        },
        containerIsBody() {
          const container = this.getPopupContainer()
          return container === document.body
        },
        containerIsRelativeOrAbsolute() {
          const container = this.getPopupContainer()
          const computedStyle = window.getComputedStyle(container)
          const position = computedStyle.getPropertyValue('position')
          document.body.setAttribute('data-position', position)
          return ['relative', 'absolute'].includes(position)
        },
        getDocumentElementBounding() {
          return document.documentElement.getBoundingClientRect()
        },
        getProps() {
          return {
            ...props,
            arrowBounding
          }
        }
      }
    }
    const innerStyle = reactive({ value: {} })
    const updatePosition = () => {
      const position = calcPosition(options.utils)
      if (isNumber(position.top)) position.top = position.top + 'px'
      if (isNumber(position.left)) position.left = position.left + 'px'
      innerStyle.value = position
    }
    watch(
      () => showTooltip.value,
      (res) => {
        if (res) {
          nextTick(() => {
            updatePosition()
          })
        }
      }
    )
    const ContentWrapper = () => {
      if (isFunction(props.content)) {
        return props.content()
      }
      return <>{props.content}</>
    }
    const handleAnimationStart = () => {
      animationOptions.isAnimating = true
    }
    const handleAnimationEnd = () => {
      console.log('end')
      const { transitionState } = animationOptions
      if (transitionState === 'leave') {
        // 触发动画结束事件 清理Portal
        show.value = false
      }
      animationOptions.isAnimating = false
    }
    const isDirectionTopBottom = computed(() => {
      const { position } = props
      return position.startsWith('top') || position.startsWith('bottom')
    })
    const allAttrs = useAttrs()
    const render = () => {
      let vnodes = ctx.slots.default?.()
      if (vnodes) {
        vnodes = vnodes.map((node) => {
          if (typeof node.type === 'symbol') {
            return cloneVNode(node, {
              ...triggerEventSet.value
            })
          }
          return cloneVNode(node, {
            ...triggerEventSet.value
          })
        })
      }
      return vnodes
    }
    return () => {
      return (
        <>
          {showTooltip.value && (
            <Portal
              getPopupContainer={props.getPopupContainer}
              targetElementRect={targetElementRect.value}
              autoAdjustOverflow={props.autoAdjustOverflow}
              triggerElementRef={triggerElementRef.value as HTMLElement}
              innerStyle={innerStyle.value}
            >
              <div
                ref={innerRef}
                class={`${prefix}-portal-inner`}
                tabindex={-1}
                style={innerStyle.value}
              >
                <CssAnimation
                  fillMode="forwards"
                  motion={props.motion}
                  animationState={animationOptions.transitionState as 'enter' | 'leave'}
                  startClassName={
                    animationOptions.transitionState === 'enter'
                      ? `${prefix}-tooltip-animation-show`
                      : `${prefix}-tooltip-animation-hide`
                  }
                  onAnimationStart={handleAnimationStart}
                  onAnimationEnd={handleAnimationEnd}
                >
                  {({
                    animationStyle,
                    animationClassName,
                    animationEventsNeedBind
                  }: {
                    animationStyle: StyleValue
                    animationClassName: string
                    animationEventsNeedBind: {
                      onAnimationStart: (e: AnimationEvent) => void
                      onAnimationend: (e: AnimationEvent) => void
                    }
                  }) => {
                    return (
                      <div
                        style={{
                          ...(animationStyle as CSSProperties),
                          transformOrigin: (innerStyle.value as CSSProperties).transformOrigin
                        }}
                        class={[...wrapperClass.value, animationClassName]}
                        {...animationEventsNeedBind}
                        {...allAttrs}
                      >
                        <div class={`${prefix}-tooltip-content`}>
                          <ContentWrapper></ContentWrapper>
                        </div>
                        {props.showArrow &&
                          (isDirectionTopBottom.value ? (
                            <ArrowVerticalIcon class={arrowClass.value}></ArrowVerticalIcon>
                          ) : (
                            <ArrowHorizontalIcon class={arrowClass.value}></ArrowHorizontalIcon>
                          ))}
                      </div>
                    )
                  }}
                </CssAnimation>
              </div>
            </Portal>
          )}
          <Fragment ref={tooltipDefaultRef}>{render()}</Fragment>
        </>
      )
    }
  },
  name: prefix + '-tooltip',
  props: tooltioProps,
  emits: tooltipEmits,
  inheritAttrs: false
})
export type TooltipProps = ExtractPropTypes<typeof tooltioProps>
export default Tooltip
