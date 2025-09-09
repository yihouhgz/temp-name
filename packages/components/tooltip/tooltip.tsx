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
  type StyleValue,
  type CSSProperties
} from 'vue'
import { prefix } from 'constants/config'
import './style/tooltip'
import { tooltioProps } from './type'
import { isFunction, isComponentByVNode, domRectToObject, isNumber } from '../_util'
import Portal from '../portal'
import { triggerEventMap } from './trigger'
import { useEventListener, useClickOutside, type EventMap } from '../_util'
import { calcPosition, type PopupContainerDOMRect } from './herps'
import CssAnimation from '../css-animation'

const Tooltip = defineComponent({
  setup(props, ctx) {
    const innerRef = ref()
    const tooltipDefaultRef = ref()
    const triggerElementRef = ref<HTMLElement>()
    const slotRef = ref()
    const targetElementRect = ref()
    const wrapperClass = computed(() => {
      return [
        props.wrapper ? props.wrapper : `${prefix}-tooltip-wrapper`,
        `${prefix}-tooltip-` + props.position
      ]
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
    const showTooltip = computed(() => {
      if (props.trigger !== 'custom') {
        return show.value
      }
      return props.visible
    })
    const triggerHnadle = () => {
      show.value = true
    }

    //computed portal inner box position
    // const innerStyle = computed<StyleValue>(() => {
    //   return {}
    // })

    onMounted(() => {
      const target = tooltipDefaultRef.value.nextElementSibling as HTMLElement
      triggerElementRef.value = target
      targetElementRect.value = target.getBoundingClientRect()
      const eventMap = triggerEventMap[props.trigger as keyof typeof triggerEventMap]
      useEventListener(target, eventMap.enter as keyof EventMap, triggerHnadle)
      if (eventMap.enter === 'click') {
        const handleClickOutside = (event: Event) => {
          if (showTooltip.value && !props.clickToHide) {
            if (innerRef.value.contains(event.target)) return
          }
          show.value = false
        }
        useClickOutside(target, handleClickOutside)
      } else {
        if (eventMap.enter !== 'custom') {
          useEventListener(target, eventMap.leave, () => {
            show.value = false
          })
        }
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
        getProp(name: string) {
          return props[name as keyof typeof props]
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
            arrowBounding: {
              offsetX: 0,
              offsetY: 2,
              width: 24,
              height: 7
            }
          }
        }
      }
    }
    const innerStyle = reactive({ value: {} })
    watch(
      () => showTooltip.value,
      (res) => {
        console.log('res', res)
        if (res) {
          nextTick(() => {
            const position = calcPosition(options.utils)
            if (isNumber(position.top)) position.top = position.top + 'px'
            if (isNumber(position.left)) position.left = position.left + 'px'
            innerStyle.value = position
            console.log(position, 'position')
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
    const _defaultRender = () => {
      let children = ctx.slots.default?.()
      if (children && children.length) {
        const newChildren: typeof children = []
        children.forEach((child) => {
          // if child solt is Component
          console.log(child, 'kk')
          newChildren.push(isComponentByVNode(child) ? cloneVNode(child, { ref: slotRef }) : child)
        })
        children = newChildren
      }
      if (children && children.length > 1) {
        return <span>{children}</span>
      }
      return <Fragment ref={tooltipDefaultRef}>{children}</Fragment>
    }
    if (props.showArrow && props.clickToHide) _defaultRender() //todo slot为component下的trigger foucs

    const handleAnimationStart = () => {
      animationOptions.isAnimating = true
    }
    const handleAnimationEnd = () => {
      console.log('end')
      const { transitionState } = animationOptions
      if (transitionState === 'leave') {
        // 触发动画结束事件 清理Portal
      }
      animationOptions.isAnimating = false
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
                      ref={innerRef}
                      {...animationEventsNeedBind}
                    >
                      <div class={`${prefix}-tooltip-content`}>
                        <ContentWrapper></ContentWrapper>
                      </div>
                      {props.showArrow && (
                        <svg
                          class={arrowClass.value}
                          aria-hidden="true"
                          width="24"
                          height="7"
                          viewBox="0 0 24 7"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                          style="fill: currentcolor;"
                        >
                          <path d="M24 0V1C20 1 18.5 2 16.5 4C14.5 6 14 7 12 7C10 7 9.5 6 7.5 4C5.5 2 4 1 0 1V0H24Z"></path>
                        </svg>
                      )}
                    </div>
                  )
                }}
              </CssAnimation>
            </Portal>
          )}
          <Fragment ref={tooltipDefaultRef}>{ctx.slots.default?.()}</Fragment>
        </>
      )
    }
  },
  name: prefix + '-tooltip',
  props: tooltioProps
})
export default Tooltip
