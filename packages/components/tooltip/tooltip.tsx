import {
  defineComponent,
  ref,
  computed,
  Fragment,
  watchEffect,
  cloneVNode,
  onMounted,
  type StyleValue
} from 'vue'
import { prefix } from 'constants/config'
import './style/tooltip'
import { tooltioProps } from './type'
import { isFunction, isComponentByVNode } from '../_util'
import Portal from '../portal'
import { triggerEventMap } from './trigger'
import { useEventListener, useClickOutside, type EventMap } from '../_util'

const Tooltip = defineComponent(
  (props, ctx) => {
    const innerRef = ref()
    const tooltipDefaultRef = ref()
    const triggerElementRef = ref<HTMLElement>()
    const slotRef = ref()
    const targetElementRect = ref()
    const wrapperClass = computed(() => {
      return [
        props.wrapper ? props.wrapper : 'tempui-tooltip-wrapper',
        'tempui-tooltip-' + props.position
      ]
    })
    const arrowClass = computed(() => {
      return ['tempui-tooltip-arrow', 'tempui-tooltip-' + props.position + '-arrow']
    })
    const show = ref(false)
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
    const innerStyle = computed<StyleValue>(() => {
      return {}
    })
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
    watchEffect(() => {})
    const ContentWrapper = () => {
      if (isFunction(props.content)) {
        return props.content()
      }
      return <>{props.content}</>
    }
    const TooltipPortal = () => {
      return (
        <div class={wrapperClass.value} ref={innerRef}>
          <div class="tempui-tooltip-content">
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
              <TooltipPortal></TooltipPortal>
            </Portal>
          )}
          <Fragment ref={tooltipDefaultRef}>{ctx.slots.default?.()}</Fragment>
        </>
      )
    }
  },
  { name: prefix + '-tooltip', props: tooltioProps }
)

export default Tooltip
