import { defineComponent, getCurrentInstance, computed, reactive, useAttrs } from 'vue'
import type { StyleValue } from 'vue'
import { prefix } from 'constants/config'
import { notificationProps, notificationEmits } from './type'
import { hasPropsOrSlots, renderElementForPropsOrSlot, useRandomId, useSetTimeout } from '../_util'
import Button from '../button'
import {
  IconTickCircle,
  IconAlertCircle,
  IconAlertTriangle,
  IconInfoCircle,
  IconClose,
  IconLoading
} from '../icon'
import { strings } from './constants'
import CSSAnimation from '../css-animation'
import { useNotification } from './content'
import { onMounted } from 'vue'

type StateType = {
  animationState: 'enter' | 'leave'
  isAnimating: boolean
}

const Notification = defineComponent({
  setup(props, ctx) {
    const state = reactive<StateType>({
      animationState: 'enter',
      isAnimating: false
    })
    const attrs = useAttrs()
    const content = useNotification()
    if (content) {
      content.closeMap.set(props.closeId, () => {
        state.animationState = 'leave'
      })
    }
    const wrapperClass = computed(() => {
      const { type, theme } = props
      return [
        `${prefix}-notification-notice`,
        `${prefix}-notification-notice-${type}`,
        theme !== strings.theme.normal && `${prefix}-notification-notice-${theme}`,
        `${prefix}-notification-notice-placement-${props.position}`
      ]
    })
    const instance = getCurrentInstance()
    const labelledbyId = useRandomId()
    onMounted(() => {
      triggerSetTimeout()
    })
    const triggerSetTimeout = () => {
      if (props.duration !== 0) {
        const cleaup = useSetTimeout(() => {
          state.animationState = 'leave'
        }, props.duration * 1000)
        if (content) {
          content.setTimeOutMap.set(props.closeId, {
            triggerSetTimeout: () => {
              cleaup()
              triggerSetTimeout()
            },
            clear: cleaup
          })
        }
      }
    }

    const handleAnimationStart = () => {
      state.isAnimating = true
    }
    const handleAnimationEnd = () => {
      if (!state.isAnimating) return
      if (state.animationState === 'leave') {
        triggerClose()
      } else {
        //todo
      }
      state.isAnimating = false
    }

    const handleClose = () => {
      if (state.isAnimating) {
        return
      }
      state.animationState = 'leave'
      ctx.emit('closeClick', props.closeId)
    }
    const triggerClose = () => {
      ctx.emit('close')
    }
    const renderIcon = () => {
      if (hasPropsOrSlots('icon', instance)) {
        return (
          <div
            class={`${prefix}-notification-notice-icon ${prefix}-notification-notice-icon-${props.type}`}
          >
            {renderElementForPropsOrSlot('icon', instance)}
          </div>
        )
      }
      let icon = null
      switch (props.type) {
        case strings.notificationType.success:
          icon = <IconTickCircle size="large" />
          break
        case strings.notificationType.info:
          icon = <IconInfoCircle size="large" />
          break
        case strings.notificationType.warning:
          icon = <IconAlertTriangle size="large" />
          break
        case strings.notificationType.error:
          icon = <IconAlertCircle size="large" />
          break
        case strings.notificationType.loading:
          icon = <IconLoading size="large" />
          break
      }
      if (icon) {
        return (
          <div
            class={`${prefix}-notification-notice-icon ${prefix}-notification-notice-icon-${props.type}`}
          >
            {icon}
          </div>
        )
      }
      return icon
    }
    return () => {
      return (
        <CSSAnimation
          fillMode="forwards"
          motion={true}
          animationState={state.animationState}
          startClassName={
            state.animationState === 'enter'
              ? `${prefix}-notification-notice-placement-${props.position}-show`
              : `${prefix}-notification-notice-placement-${props.position}-hide`
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
                {...attrs}
                style={animationStyle}
                class={[wrapperClass.value, animationClassName]}
                {...animationEventsNeedBind}
                role="alert"
                aria-labelledby={labelledbyId}
              >
                <div>{renderIcon()}</div>
                <div class={`${prefix}-notification-notice-inner`}>
                  <div class={`${prefix}-notification-notice-content-wrapper`}>
                    <div id={labelledbyId} class={`${prefix}-notification-notice-title`}>
                      {renderElementForPropsOrSlot('title', instance)}
                    </div>
                    <div class={`${prefix}-notification-notice-content`}>
                      {renderElementForPropsOrSlot('content', instance)}
                    </div>
                  </div>
                  {props.showClose && (
                    <Button
                      onClick={handleClose}
                      class={`${prefix}-notification-notice-icon-close`}
                      aria-label="close"
                      aria-disabled="false"
                      type="tertiary"
                      theme="borderless"
                      size="small"
                      icon={<IconClose aria-label="close" aria-hidden="true"></IconClose>}
                    ></Button>
                  )}
                </div>
              </div>
            )
          }}
        </CSSAnimation>
      )
    }
  },
  inheritAttrs: false,
  props: notificationProps,
  emits: notificationEmits,
  name: `${prefix}-notification`
})
export default Notification
