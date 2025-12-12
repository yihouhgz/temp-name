import { defineComponent, reactive, computed, getCurrentInstance, type StyleValue } from 'vue'
import { prefix } from 'constants/config'
import Portal from '../portal'
import CssAnimation from '../css-animation'
import { sideSheetProps, sideSheetEmits } from './type'
import { renderElementForPropsOrSlot } from '../_util'
import { IconClose } from '../icon'
import Button from '../button'

type StateType = {
  triggerElementRef: HTMLDivElement | null
  animationState: 'enter' | 'leave'
}
const SideSheet = defineComponent({
  setup(props) {
    const state = reactive<StateType>({
      triggerElementRef: null,
      animationState: 'enter'
    })
    const instance = getCurrentInstance()
    const wrapperClass = computed(() => {
      return [prefix + '-side-sheet', prefix + '-side-sheet-' + props.placement]
    })
    const handleAnimationStart = () => {}
    const handleAnimationEnd = () => {}
    return () => {
      return (
        <Portal
          zIndex={1010}
          getPopupContainer={() => document.body}
          triggerElementRef={state.triggerElementRef as HTMLDivElement}
        >
          <CssAnimation
            fillMode="forwards"
            motion={true}
            animationState={state.animationState}
            startClassName={
              state.animationState === 'enter'
                ? `${prefix}-sideSheet-animation-show`
                : `${prefix}-sideSheet-animation-hide`
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
                  style={animationStyle}
                  {...animationEventsNeedBind}
                  class={[wrapperClass.value, animationClassName]}
                  ref={(node) => (state.triggerElementRef = node as HTMLDivElement)}
                >
                  <div aria-hidden="true" class={`${prefix}-sidesheet-mask`}></div>
                  <div
                    role="dialog"
                    tabindex={-1}
                    class={`${prefix}-sidesheet-inner ${prefix}-sidesheet-inner-wrap ${prefix}-sidesheet-size-${props.size}`}
                  >
                    <div class={`${prefix}-sidesheet-content`}>
                      <div class={`${prefix}-sidesheet-header`} role="heading" aria-level={1}>
                        <div class={`${prefix}-sidesheet-title`}>
                          {renderElementForPropsOrSlot('title', instance)}
                        </div>
                        <Button
                          class={`${prefix}-sidesheet-close`}
                          type="tertiary"
                          icon={<IconClose />}
                          onClick={() => {
                            state.animationState = 'leave'
                          }}
                        ></Button>
                      </div>
                      <div class={`${prefix}-sidesheet-body`}></div>
                    </div>
                  </div>
                </div>
              )
            }}
          </CssAnimation>
        </Portal>
      )
    }
  },
  props: sideSheetProps,
  emits: sideSheetEmits,
  name: prefix + '-side-sheet'
})
export default SideSheet
