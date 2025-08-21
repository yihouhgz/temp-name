import { defineComponent, ref, nextTick, computed, Fragment } from 'vue'
import { prefix } from 'constants/config'
import './style/tooltip'
import { tooltioProps } from './type'
import { isFunction } from '../_util'
import Portal from '../portal'

const Tooltip = defineComponent(
  (props, ctx) => {
    const tooltipDefaultRef = ref()
    const targetElementRect = ref()
    const wrapperClass = computed(() => {
      return ['tempui-tooltip-wrapper', 'tempui-tooltip-' + props.position]
    })
    const arrowClass = computed(() => {
      return [
        'tempui-tooltip-arrow',
        'tempui-tooltip-' + props.position + '-arrow'
      ]
    })
    const show = ref(false)
    setTimeout(() => {
      show.value = true
    }, 2000)
    nextTick(() => {
      console.log(tooltipDefaultRef.value.nextElementSibling)
      const target = tooltipDefaultRef.value.nextElementSibling as HTMLElement
      targetElementRect.value = target.getBoundingClientRect()
    })
    const ContentWrapper = () => {
      if (isFunction(props.content)) {
        return props.content()
      }
      return <>{props.content}</>
    }
    const TooltipPortal = () => {
      return (
        <div class={wrapperClass.value}>
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
    return () => {
      return (
        <>
          {show.value && (
            <Portal
              getPopupContainer={props.getPopupContainer}
              targetElementRect={targetElementRect.value}
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
