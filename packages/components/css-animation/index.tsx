import { defineComponent, ref, watch, onMounted, type CSSProperties, type PropType } from 'vue'

export default defineComponent({
  name: 'CSSAnimation',
  props: {
    startClassName: String,
    endClassName: String,
    animationState: {
      type: String as PropType<'enter' | 'leave'>,
      default: 'enter'
    },
    onAnimationEnd: {
      type: Function as PropType<(stoppedByAnother: boolean) => void>,
      default: undefined
    },
    onAnimationStart: {
      type: Function as PropType<() => void>,
      default: undefined
    },
    motion: {
      type: Boolean,
      default: true
    },
    replayKey: {
      type: String,
      default: ''
    },
    fillMode: {
      type: String as PropType<'backwards' | 'both' | 'forwards' | 'none'>,
      default: undefined
    }
  },
  setup(props, { slots }) {
    // 响应式状态
    const currentClassName = ref(props.startClassName || '')
    const extraStyle = ref<CSSProperties>({
      animationFillMode: props.fillMode
    })
    const isAnimating = ref(true)

    // 动画开始处理函数
    const handleAnimationStart = () => {
      props.onAnimationStart?.()
    }

    // 动画结束处理函数
    const handleAnimationEnd = () => {
      currentClassName.value = props.endClassName || ''
      extraStyle.value = {
        animationFillMode: props.fillMode
      }
      isAnimating.value = false
      props.onAnimationEnd?.(false)
    }

    // 监听属性变化
    watch(
      () => [props.startClassName, props.replayKey, props.motion],
      () => {
        currentClassName.value = props.startClassName || ''
        extraStyle.value = {
          animationFillMode: props.fillMode
        }
        isAnimating.value = true

        // 触发动画开始回调
        props.onAnimationStart?.()

        // 如果没有动画，立即结束
        if (!props.motion) {
          props.onAnimationEnd?.(isAnimating.value)
          isAnimating.value = false
        }
      }
    )

    // 组件挂载后处理
    onMounted(() => {
      // 触发动画开始回调
      props.onAnimationStart?.()

      // 如果没有动画，立即结束
      if (!props.motion) {
        props.onAnimationEnd?.(false)
        isAnimating.value = false
      }
    })

    return () => {
      // 渲染插槽内容
      if (props.motion) {
        if (slots.default) {
          return slots.default({
            animationClassName: currentClassName.value ?? '',
            animationStyle: extraStyle.value,
            animationEventsNeedBind: {
              onAnimationstart: handleAnimationStart,
              onAnimationend: handleAnimationEnd
            },
            isAnimating: isAnimating.value
          })
        }
      } else {
        if (slots.default) {
          return slots.default({
            animationClassName: '',
            animationStyle: {},
            animationEventsNeedBind: {},
            isAnimating: isAnimating.value
          })
        }
      }
      return null
    }
  }
})
