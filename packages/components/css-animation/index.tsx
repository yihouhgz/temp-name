import { defineComponent, ref, watch, onMounted, type CSSProperties } from 'vue'
import { prefix } from 'constants/config'
import { cssAnimationProps } from './type'
export default defineComponent({
  setup(props, { slots }) {
    const currentClassName = ref(props.startClassName || '')
    const extraStyle = ref<CSSProperties>({
      animationFillMode: props.fillMode
    })
    const isAnimating = ref(true)
    const handleAnimationStart = () => {
      props.onAnimationStart?.()
    }
    const handleAnimationEnd = () => {
      currentClassName.value = props.endClassName || ''
      extraStyle.value = {
        animationFillMode: props.fillMode
      }
      isAnimating.value = false
      props.onAnimationEnd?.(false)
    }
    watch(
      () => [props.startClassName, props.replayKey, props.motion],
      () => {
        currentClassName.value = props.startClassName || ''
        extraStyle.value = {
          animationFillMode: props.fillMode
        }
        isAnimating.value = true
        props.onAnimationStart?.()
        if (!props.motion) {
          props.onAnimationEnd?.(isAnimating.value)
          isAnimating.value = false
        }
      }
    )
    onMounted(() => {
      props.onAnimationStart?.()
      if (!props.motion) {
        props.onAnimationEnd?.(false)
        isAnimating.value = false
      }
    })
    return () => {
      const animationStyle = props.motion ? extraStyle.value : {}
      const animationEventsNeedBind = props.motion
        ? {
            onAnimationstart: handleAnimationStart,
            onAnimationend: handleAnimationEnd
          }
        : {}
      const animationClassName = props.motion ? (currentClassName.value ?? '') : ''
      return slots.default?.({
        animationClassName,
        animationStyle: animationStyle,
        animationEventsNeedBind,
        isAnimating: isAnimating.value
      })
    }
  },
  name: prefix + '-css-animation',
  props: cssAnimationProps
})
