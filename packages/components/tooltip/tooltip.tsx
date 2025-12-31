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
  type ExtractPropTypes,
  onUnmounted
} from 'vue'
import { prefix } from 'constants/config'
import './style/tooltip'
import { tooltioProps, tooltipEmits } from './type'
import {
  isFunction,
  domRectToObject,
  isNumber,
  useEventListener,
  useSetTimeout,
  isArray,
  useRandomId,
  useThrottle
} from '../_util'
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
import type { VNode } from 'vue'

type StateType = {
  wrapperId: string
  scrollStop: (() => void) | null
  clickOutsideStop: (() => void) | null
  fristRender: boolean
}
const Tooltip = defineComponent({
  setup(props, ctx) {
    const innerRef = ref()
    const tooltipDefaultRef = ref()
    const triggerElementRef = ref<HTMLElement>()
    const targetElementRect = ref()
    const triggerEventSet = ref()
    const state = reactive<StateType>({
      wrapperId: props.wrapperId || useRandomId(),
      scrollStop: null,
      clickOutsideStop: null,
      fristRender: true
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
    watchEffect((onCleanup) => {
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
            if (['hover'].includes(trigger) && props.mouseEnterDelay > 0) {
              useSetTimeout(() => {
                triggerHnadle()
              }, props.mouseLeaveDelay)
            } else {
              triggerHnadle()
            }
          }
        }
        if (trigger === 'hover') {
          eventSet[triggerEventMap.hover.enter] = () => {
            const { disableFocusListener } = props
            if (!disableFocusListener) {
              triggerHnadle()
            }
          }
          eventSet[triggerEventMap.hover.leave] = () => {
            const { disableFocusListener } = props
            if (!disableFocusListener) {
              triggerLeave()
            }
          }
        }
        registerEnterEvent()
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
      onCleanup(() => {
        triggerEventSet.value = {}
      })
    })
    onUnmounted(() => {
      hoverScope.stop()
    })
    const registerClickOutside = () => {
      const trigger = props.trigger
      const clickOutsideSet = ['contextMenu', 'click', 'custom']
      if (clickOutsideSet.includes(trigger)) {
        if (state.clickOutsideStop) state.clickOutsideStop?.()
        const stop = useClickOutside(triggerElementRef.value as HTMLElement, (event) => {
          handleClickOutside(event)
        })
        state.clickOutsideStop = stop
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
      const _position = (innerStyle.value as { _position: string })?._position
      return [`${props.prefixCls}-wrapper`, `${props.prefixCls}-` + (_position || props.position)]
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
        if (res) {
          triggerHnadle()
        } else {
          triggerLeave()
        }
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
    watch(
      () => showTooltip.value,
      (show) => {
        if (show) {
          registerClickOutside()
        } else {
          state.clickOutsideStop?.()
        }
        ctx.emit('visibleChange', showTooltip.value)
      }
    )
    const triggerHnadle = () => {
      if (state.fristRender) state.fristRender = false
      animationOptions.isAnimating = true
      animationOptions.transitionState = 'enter'
      show.value = true
      if (state.scrollStop) state.scrollStop?.()
      const udpateCallback = useThrottle(updatePosition, 20)
      const stop = useEventListener(window, 'scroll', () => {
        if (showTooltip.value) {
          udpateCallback()
        }
      })
      state.scrollStop = stop
    }
    const triggerLeave = () => {
      if (animationOptions.transitionState === 'leave') return
      animationOptions.isAnimating = true
      animationOptions.transitionState = 'leave'
      show.value = false
      if (state.scrollStop) {
        state.scrollStop?.()
        state.scrollStop = null
      }
      if (state.clickOutsideStop) {
        state.clickOutsideStop()
        state.clickOutsideStop = null
      }
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
    const handleClickInner = (e: Event) => {
      if (props.stopPropagation) {
        e.stopPropagation()
      }
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
    function parseVNode(nodes: VNode[]): VNode[] {
      let eventHander = true
      const deep = (nodes: VNode[]): VNode[] => {
        const result: VNode[] = []
        for (const node of nodes) {
          if (typeof node.type === 'symbol') {
            if (isArray(node.children)) {
              result.push({
                ...node,
                children: deep(node.children as VNode[])
              })
            }
          } else {
            if (eventHander) {
              result.push(
                cloneVNode(node, {
                  'data-popupid': state.wrapperId,
                  'aria-describedby': state.wrapperId,
                  'aria-expanded': showTooltip.value,
                  ...triggerEventSet.value
                })
              )
              eventHander = false
            } else {
              result.push(node)
            }
          }
        }
        return result
      }
      return deep(nodes)
    }
    const render = () => {
      let vnodes = ctx.slots.default?.()
      if (vnodes) {
        // vnodes = vnodes.map((node) => {
        //   if (typeof node.type === 'symbol') {
        //     // 处理symbol类型的节点 Fragment
        //     const children = isArray(node.children) ? node.children[0] : null
        //     if (
        //       children &&
        //       typeof children === 'object' &&
        //       Object.hasOwnProperty.call(children, 'type')
        //     ) {
        //       return cloneVNode(children as typeof node, {
        //         ...triggerEventSet.value
        //       })
        //     }
        //     return node
        //   }
        //   return cloneVNode(node, {
        //     ...triggerEventSet.value
        //   })
        // })
        vnodes = parseVNode(vnodes)
      }
      if (vnodes && vnodes?.length > 1) {
        return (
          <span
            aria-describedby={state.wrapperId}
            data-popupid={state.wrapperId}
            aria-expanded={showTooltip.value}
            class={props.wrapperClassName}
            style={{ display: 'inline-block' }}
          >
            {vnodes}
          </span>
        )
      }
      return vnodes
    }
    return () => {
      const shouldRenderPortal = (props.keepDOM && !state.fristRender) || showTooltip.value
      return (
        <>
          {shouldRenderPortal && (
            <Portal
              getPopupContainer={props.getPopupContainer}
              triggerElementRef={triggerElementRef.value as HTMLElement}
              zIndex={props.zIndex}
            >
              <div
                ref={innerRef}
                class={`${prefix}-portal-inner`}
                tabindex={-1}
                style={{
                  ...innerStyle.value,
                  ...(props.keepDOM && !showTooltip.value ? { display: 'none' } : {})
                }}
                onClick={handleClickInner}
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
                          transformOrigin: !props.transformFromCenter
                            ? (innerStyle.value as CSSProperties).transformOrigin
                            : 'center'
                        }}
                        class={[...wrapperClass.value, animationClassName]}
                        id={state.wrapperId}
                        {...animationEventsNeedBind}
                        {...allAttrs}
                      >
                        <div class={`${prefix}-tooltip-content`}>
                          <ContentWrapper></ContentWrapper>
                        </div>
                        {props.showArrow &&
                          (isDirectionTopBottom.value ? (
                            props._arrow ? (
                              props._arrow.vertical
                            ) : (
                              <ArrowVerticalIcon class={arrowClass.value}></ArrowVerticalIcon>
                            )
                          ) : props._arrow ? (
                            props._arrow.horzontal
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
