import { prefix } from 'constants/config'
import { computed, defineComponent, reactive, type StyleValue } from 'vue'
import './style/silder'
import Tooltip from '../tooltip'
import { sliderProps, sliderEmits } from './type'
import { isArray, isNumber, isUndefined } from '../_util'

type SliderState = {
  hover: boolean
  isMove: boolean
  value: number | number[]
  sliderRef: null | HTMLElement
  handleRef: null | HTMLElement
  offsetX: number
  visibles: boolean[]
  currentIndex: number
  isHoverHnadle: boolean
}

const Slider = defineComponent({
  setup(props, ctx) {
    console.log(props, 'lll')
    const state = reactive<SliderState>({
      hover: false,
      isMove: false,
      value: isUndefined(props.value) ? props.defaultValue : props.value,
      sliderRef: null,
      handleRef: null,
      offsetX: 0,
      visibles: [false, false],
      currentIndex: -1,
      isHoverHnadle: false
    })
    const showBoundary = computed(() => {
      const { showBoundary } = props
      return showBoundary && state.hover
    })
    const handleMouseEnter = () => {
      state.hover = true
    }
    const handleClickDownHandle = (e: MouseEvent, index: number) => {
      state.isMove = true
      if (state.handleRef) {
        const handleRect = state.handleRef.getBoundingClientRect()
        state.offsetX = e.clientX - handleRect.left
      }
      state.currentIndex = index
      document.addEventListener('mousemove', (e) => handleMouseMove(e, index))
      document.addEventListener('mouseup', () => {
        state.isMove = false
        if (!state.isHoverHnadle) {
          state.visibles[index] = false
        }
      })
    }
    const handleMouseMove = (e: MouseEvent, index: number) => {
      if (!state.isMove || !state.sliderRef) return
      const sliderRect = state.sliderRef.getBoundingClientRect()

      const handleLeftPos = e.clientX - state.offsetX - sliderRect.left
      const availableTrackWidth = sliderRect.width - (state.handleRef?.offsetWidth || 0)
      const positionRatio =
        availableTrackWidth > 0 ? Math.max(0, Math.min(1, handleLeftPos / availableTrackWidth)) : 0

      const { min = 0, max = 100, step = 1 } = props
      let newValue = min + positionRatio * (max - min)

      if (step > 0) {
        newValue = Math.floor(newValue / step) * step
      }

      newValue = Math.max(min, Math.min(max, newValue))

      if (props.range && isArray(state.value)) {
        state.value[index] = newValue
        ctx.emit('change', state.value)
      } else {
        state.value = newValue
        ctx.emit('change', newValue)
      }
    }
    const handleTouchHandle = (e: TouchEvent, index: number) => {
      console.log(e, index)
    }
    const handleMouseLeave = () => {
      state.hover = false
    }
    const trackStyle = computed<StyleValue>(() => {
      const { range } = props
      const style: StyleValue = {
        left: 0,
        width: state.value + '%'
      }
      if (range && isArray(state.value)) {
        const [start, end] = state.value
        style.left = start + '%'
        style.width = Math.min(end - start, 100) + '%'
      }
      return style
    })
    const rePosKey = computed(() => {
      const value = state.value
      return isNumber(value) ? value : Math.random()
    })
    const getTipFormatter = () => {
      const { tipFormatter } = props
      const value = state.value
      return tipFormatter(value)
    }
    return () => {
      const { max, min, disabled } = props
      const values = isArray(state.value) ? state.value : [state.value]
      console.log(values, 'values')
      return (
        <div
          class={`${prefix}-slider`}
          onMouseenter={handleMouseEnter}
          onMouseleave={handleMouseLeave}
          ref={(node) => (state.sliderRef = node as HTMLElement)}
        >
          <div class={`${prefix}-slider-wrapper`}>
            <div class={`${prefix}-slider-rail`}></div>
            <div class={`${prefix}-slider-track`} style={trackStyle.value}></div>
            <div>
              {values.map((item, index) => {
                const v = getTipFormatter()
                const style: StyleValue = {
                  zIndex: 1,
                  left: item + '%'
                }
                return (
                  <Tooltip
                    trigger="custom"
                    visible={state.visibles[index]}
                    key={index}
                    position="top"
                    content={<span>{v}</span>}
                    rePosKey={rePosKey.value}
                  >
                    <span
                      ref={(node) => (state.handleRef = node as HTMLElement)}
                      onMousedown={(e) => handleClickDownHandle(e, index)}
                      onTouchstart={(e) => handleTouchHandle(e, index)}
                      onMouseenter={() => {
                        state.visibles[index] = true
                        state.isHoverHnadle = true
                      }}
                      onMouseleave={() => {
                        state.isHoverHnadle = false
                        if (!state.isMove) {
                          state.visibles[index] = false
                        }
                      }}
                      // style={handleStyle.value}
                      style={style}
                      class={`${prefix}-slider-handle`}
                      role="slider"
                      tabindex="0"
                      aria-disabled={disabled}
                      aria-valuenow={item}
                      aria-valuemax={max}
                      aria-valuemin={min}
                    ></span>
                  </Tooltip>
                )
              })}
            </div>
            {showBoundary.value && (
              <div class={`${prefix}-slider-boundary`}>
                <div class={`${prefix}-slider-boundary-min`}>0</div>
                <div class={`${prefix}-slider-boundary-max`}>100</div>
              </div>
            )}
          </div>
        </div>
      )
    }
  },
  props: sliderProps,
  emits: sliderEmits,
  name: prefix + '-slider'
})

export default Slider
