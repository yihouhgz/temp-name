import { defineComponent, computed, getCurrentInstance, reactive, onMounted } from 'vue'
import { prefix } from 'constants/config'
import { toastProps, toastTypeMap } from './type'
import {
  IconTickCircle,
  IconAlertCircle,
  IconAlertTriangle,
  IconInfoCircle,
  IconClose
} from '../icon'
import { hasPropsOrSlots, isNumber, renderElementForPropsOrSlot } from '../_util'
import Button from '../button'
import CSSAnimation from '../css-animation'
import type { StyleValue, CSSProperties } from 'vue'
import { useTemplateRef } from '../_util'

const Toast = defineComponent({
  setup(props, ctx) {
    const state = reactive({
      animationState: 'enter' as 'enter' | 'leave',
      isAnimating: false
    })
    const classNames = computed(() => {
      return [
        prefix + '-toast',
        prefix + '-toast-' + props.type,
        {
          [prefix + '-toast-light']: props.theme === 'light'
        }
      ]
    })
    const vm = getCurrentInstance()
    const renderIcon = () => {
      if (hasPropsOrSlots('icon', vm)) {
        return <div>{renderElementForPropsOrSlot('icon', vm)}</div>
      }
      const size = 'large'
      const classNames = `${prefix}-toast-icon-${props.type}`
      return props.type === toastTypeMap.success ? (
        <IconTickCircle class={classNames} size={size} />
      ) : props.type === toastTypeMap.warning ? (
        <IconAlertTriangle class={classNames} size={size} />
      ) : props.type === toastTypeMap.error ? (
        <IconAlertCircle class={classNames} size={size} />
      ) : (
        <IconInfoCircle class={classNames} size={size} />
      )
    }
    const renderContent = () => {
      const template = renderElementForPropsOrSlot('content', vm)
      let maxWidth = props.textMaxWidth
      if (isNumber(maxWidth)) maxWidth = maxWidth + 'px'
      else {
        const isFlag = maxWidth.includes('%') || maxWidth.includes('px')
        maxWidth = isFlag ? maxWidth : maxWidth + 'px'
      }
      return (
        <span class={prefix + '-toast-text'} style={{ maxWidth: maxWidth }}>
          {template}
        </span>
      )
    }
    const handleAnimationStart = () => {
      state.isAnimating = true
    }
    const handleAnimationEnd = () => {
      console.log('handleAnimationEnd')
      if (!state.isAnimating) return
      if (state.animationState === 'leave') {
        //离开动画结束
        console.log('离开动画结束')
        ctx.emit('close', props)
      } else {
        console.log('进入动画结束')
      }
      state.isAnimating = false
    }
    const handleClose = () => {
      if (!state.isAnimating) {
        state.animationState = 'leave'
      }
    }
    ctx.emit('closeCallback_', {
      key: props.id,
      close: handleClose
    })
    const handleMouseenter = (e: MouseEvent) => {
      ctx.emit('mouseenter', e)
    }
    const handleMouseleave = (e: MouseEvent) => {
      ctx.emit('mouseleave', e)
    }

    const toastRef = useTemplateRef<HTMLDivElement>('toastRef')
    onMounted(() => {
      const rect = toastRef.value?.getBoundingClientRect()
      console.log(rect, 'kkss')
      ctx.emit('heightChange', rect?.height)
    })
    return () => {
      return (
        <CSSAnimation
          fillMode="forwards"
          motion={true}
          animationState={state.animationState}
          startClassName={
            state.animationState === 'enter'
              ? `${prefix}-toast-animation-show`
              : `${prefix}-toast-animation-hide`
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
                style={{ ...(animationStyle as CSSProperties) }}
                {...animationEventsNeedBind}
                {...ctx.attrs}
                role="alert"
                aria-label={`${props.type} type`}
                class={[classNames.value, animationClassName]}
                onMouseenter={handleMouseenter}
                onMouseleave={handleMouseleave}
                ref="toastRef"
              >
                <div class={prefix + '-toast-content'}>
                  {renderIcon()}
                  {renderContent()}
                  {props.showClose && (
                    <div class={`${prefix}-toast-close-button`}>
                      <Button
                        type="tertiary"
                        theme="borderless"
                        size="small"
                        icon={<IconClose />}
                        onClick={handleClose}
                      ></Button>
                    </div>
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
  name: prefix + '-toast-interior',
  props: toastProps,
  emits: ['close', 'closeCallback_', 'mouseenter', 'mouseleave', 'heightChange']
})
export default Toast
