import {
  defineComponent,
  reactive,
  computed,
  getCurrentInstance,
  watch,
  type StyleValue
} from 'vue'
import { prefix } from 'constants/config'
import Portal from '../portal'
import CssAnimation from '../css-animation'
import { sideSheetProps, sideSheetEmits } from './type'
import { hasPropsOrSlots, isString, renderElementForPropsOrSlot } from '../_util'
import { IconClose } from 'icons'
import Button from '../button'
import './style/side-sheet'
import { strings } from './constants'

type StateType = {
  isAnimating: boolean
  firstRender: boolean
  triggerElementRef: HTMLDivElement | null
  animationState: 'enter' | 'leave'
  animationMaskState: 'enter' | 'leave'
}
const SideSheet = defineComponent({
  setup(props, ctx) {
    const state = reactive<StateType>({
      isAnimating: false,
      firstRender: true,
      triggerElementRef: null,
      animationState: 'enter',
      animationMaskState: 'enter'
    })
    const instance = getCurrentInstance()
    const wrapperClass = computed(() => {
      return [prefix + '-sideSheet', prefix + '-sideSheet-' + props.placement]
    })
    const isDisableScroll = computed(() => {
      const { disableScroll } = props
      return disableScroll
    })
    const getSize = () => {
      const { size } = props
      if (size === strings.small) return strings.smallWidth
      else if (size === strings.large) return strings.largeWidth
      return strings.mediumWidth
    }
    const getInnerHeightOrWidth = computed(() => {
      const { placement } = props
      const value = getSize()
      if (placement === strings.top || placement === strings.bottom) {
        if (props.height === value) return value + 'px'
        return isString(props.height) ? props.height : value + 'px'
      }
      if (props.width === value) return value + 'px'
      return isString(props.width) ? props.width : value + 'px'
    })
    watch(
      () => props.visible,
      (visible) => {
        const disableScroll = isDisableScroll.value
        if (visible) {
          state.isAnimating = true
          state.animationState = 'enter'
          state.animationMaskState = 'enter'
          if (disableScroll) {
            document.body.style.overflow = 'hidden'
            document.body.style.width = `calc(100% - ${8}px)`
          }
        } else {
          state.isAnimating = true
          state.animationState = 'leave'
          state.animationMaskState = 'leave'
          if (disableScroll) {
            document.body.style.removeProperty('overflow')
            document.body.style.removeProperty('width')
          }
        }
      }
    )

    const handleAnimationStart = () => {
      if (!props.visible) return
      state.isAnimating = true
    }
    const handleAnimationEnd = () => {
      if (!state.isAnimating) return
      if (state.animationState === 'leave') {
        state.firstRender = false
        ctx.emit('afterVisibleChange', false)
      } else {
        ctx.emit('afterVisibleChange', true)
      }
      state.isAnimating = false
    }
    const handleMaskAnimationStart = () => {}
    const handleMaskAnimationEnd = () => {}

    const showSideSheet = computed(() => {
      const { visible } = props
      if (state.isAnimating) return true
      return visible
    })

    const handleClickClose = (e: MouseEvent) => {
      ctx.emit('cancel', e)
    }
    const handleClickMask = (e: MouseEvent) => {
      if (props.maskClosable) {
        handleClickClose(e)
      }
    }
    const renderMask = () => {
      if (!props.mask) return null
      return (
        <CssAnimation
          fillMode="forwards"
          motion={props.motion}
          animationState={state.animationMaskState}
          startClassName={
            state.animationMaskState === 'enter'
              ? `${prefix}-sideSheet-mask-show`
              : `${prefix}-sideSheet-mask-hide`
          }
          onAnimationStart={handleMaskAnimationStart}
          onAnimationEnd={handleMaskAnimationEnd}
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
                {...animationEventsNeedBind}
                onClick={handleClickMask}
                style={[animationStyle, props.maskStyle]}
                aria-hidden="true"
                class={[`${prefix}-sideSheet-mask`, animationClassName]}
              ></div>
            )
          }}
        </CssAnimation>
      )
    }
    const renderFooter = () => {
      if (hasPropsOrSlots('footer', instance)) {
        return (
          <div class={`${prefix}-sideSheet-footer`}>
            {renderElementForPropsOrSlot('footer', instance)}
          </div>
        )
      }
      return null
    }
    return () => {
      const shouldRenderPortal = (props.keepDOM && !state.firstRender) || showSideSheet.value
      if (!shouldRenderPortal) return null
      const keepDOMStyle: StyleValue = {}
      if (!props.visible && props.keepDOM) {
        keepDOMStyle.display = 'none'
      }
      const isHorizontal = props.placement === strings.top || props.placement === strings.bottom
      const innerStyle: StyleValue = isHorizontal
        ? {
            height: getInnerHeightOrWidth.value
          }
        : {
            width: getInnerHeightOrWidth.value
          }
      return (
        <Portal
          zIndex={props.zIndex}
          getPopupContainer={props.getPopupContainer}
          triggerElementRef={state.triggerElementRef as HTMLDivElement}
        >
          <div
            style={{ ...(props.keepDOM && !showSideSheet.value ? { display: 'none' } : {}) }}
            class={wrapperClass.value}
            ref={(node) => (state.triggerElementRef = node as HTMLDivElement)}
          >
            {renderMask()}
            <CssAnimation
              fillMode="forwards"
              motion={props.motion}
              animationState={state.animationState}
              startClassName={
                state.animationState === 'enter'
                  ? `${prefix}-sideSheet-inner-placement-${props.placement}-show`
                  : `${prefix}-sideSheet-inner-placement-${props.placement}-hide`
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
                    style={[animationStyle, innerStyle]}
                    {...animationEventsNeedBind}
                    role="dialog"
                    tabindex={-1}
                    class={[
                      `${prefix}-sideSheet-inner ${prefix}-sideSheet-inner-wrap`,
                      isHorizontal
                        ? `${prefix}-sideSheet-size-horizontal-${props.size}`
                        : `${prefix}-sideSheet-size-${props.size}`,
                      animationClassName
                    ]}
                  >
                    <div class={`${prefix}-sideSheet-content`}>
                      <div
                        class={`${prefix}-sideSheet-header`}
                        style={props.headerStyle}
                        role="heading"
                        aria-level={1}
                      >
                        <div class={`${prefix}-sideSheet-title`}>
                          {renderElementForPropsOrSlot('title', instance)}
                        </div>
                        <Button
                          class={`${prefix}-sideSheet-close`}
                          type="tertiary"
                          theme="borderless"
                          size="small"
                          icon={<IconClose />}
                          onClick={handleClickClose}
                        ></Button>
                      </div>
                      <div class={`${prefix}-sideSheet-body`} style={props.bodyStyle}>
                        {ctx.slots.default?.()}
                      </div>
                    </div>
                  </div>
                )
              }}
            </CssAnimation>
            {renderFooter()}
          </div>
        </Portal>
      )
    }
  },
  props: sideSheetProps,
  emits: sideSheetEmits,
  name: prefix + '-side-sheet'
})
export default SideSheet
