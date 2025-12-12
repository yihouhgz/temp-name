import { defineComponent, reactive, computed, type StyleValue } from 'vue'
import { prefix } from 'constants/config'
import Portal from '../portal'
import { feefbackProps } from './type'
import CssAnimation from '../css-animation'

type StateType = {
  triggerElementRef: HTMLDivElement | null
  animationState: 'enter' | 'leave'
}
const Feedback = defineComponent({
  setup(props) {
    const state = reactive<StateType>({
      triggerElementRef: null,
      animationState: 'enter'
    })
    const wrapperClass = computed(() => {
      return [prefix + '-feedback', prefix + '-feedback-' + props.type]
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
                  style={animationStyle}
                  {...animationEventsNeedBind}
                  class={[wrapperClass.value, animationClassName]}
                  ref={(node) => (state.triggerElementRef = node as HTMLDivElement)}
                ></div>
              )
            }}
          </CssAnimation>
        </Portal>
      )
    }
  },
  props: feefbackProps,
  name: prefix + '-feedback'
})
export default Feedback
