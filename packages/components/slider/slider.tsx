import { prefix } from 'constants/config'
import { computed, defineComponent, nextTick, reactive, type StyleValue } from 'vue'
import './style/silder'
import Tooltip from '../tooltip'
import { sliderProps, sliderEmits } from './type'
import { isArray, isFunction, isUndefined } from '../_util'
import { watch } from 'vue'

type SliderState = {
  hover: boolean
  isMove: boolean
  value: number | number[]
  sliderRef: null | HTMLElement
  handleRefs: (HTMLElement | null)[]
  handleFocus: boolean[]
  offsetX: number
  offsetY: number
  visibles: boolean[]
  currentIndex: number
  isHoverHnadle: boolean
  rePosKey: number | string
}

const Slider = defineComponent({
  setup(props, ctx) {
    let keydownHandler: ((e: KeyboardEvent) => void) | null = null
    const state = reactive<SliderState>({
      hover: false,
      isMove: false,
      value: isUndefined(props.value) ? props.defaultValue : props.value,
      sliderRef: null,
      handleRefs: [],
      offsetX: 0,
      offsetY: 0,
      visibles: [false, false],
      currentIndex: -1,
      isHoverHnadle: false,
      rePosKey: Math.random(),
      handleFocus: []
    })
    watch(
      () => props.value,
      (v) => {
        if (!isUndefined(v)) {
          state.value = v
        }
      }
    )
    const showBoundary = computed(() => {
      const { showBoundary } = props
      return showBoundary && state.hover
    })
    const handleMouseEnter = () => {
      state.hover = true
    }
    const handleClickDownHandle = (e: MouseEvent, index: number) => {
      state.isMove = true
      if (state.handleRefs[index]) {
        const handleRect = state.handleRefs[index]!.getBoundingClientRect()
        state.offsetX = e.clientX - handleRect.left
        state.offsetY = e.clientY - handleRect.top
      }
      state.currentIndex = index
      state.visibles[index] = true
      const hander = (e: MouseEvent) => handleMouseMove(e, index)
      document.addEventListener('mousemove', hander)
      document.addEventListener(
        'mouseup',
        () => {
          state.isMove = false
          if (!state.isHoverHnadle) {
            state.visibles[index] = false
          }
          document.removeEventListener('mousemove', hander)
        },
        { once: true }
      )
    }
    const updateByClientPos = (index: number, clientX: number, clientY: number) => {
      if (!state.sliderRef || props.disabled) return
      const sliderRect = state.sliderRef.getBoundingClientRect()
      const handlePos = props.vertical
        ? clientY - state.offsetY - sliderRect.top
        : clientX - state.offsetX - sliderRect.left
      const trackSize = props.vertical
        ? sliderRect.height - (state.handleRefs[index]?.offsetHeight || 0)
        : sliderRect.width - (state.handleRefs[index]?.offsetWidth || 0)
      let positionRatio = trackSize > 0 ? Math.max(0, Math.min(1, handlePos / trackSize)) : 0
      if (props.vertical && props.verticalReverse) {
        positionRatio = 1 - positionRatio
      }
      const { min = 0, max = 100, step = 1 } = props
      const raw = min + positionRatio * (max - min)
      let newValue = raw
      if (step > 0) {
        newValue = Math.round((raw - min) / step) * step + min
      }
      newValue = Math.max(min, Math.min(max, newValue))
      if (isArray(state.value)) {
        if (index === 0 && newValue > state.value[1]) {
          newValue = state.value[1]
        } else if (index === 1 && newValue < state.value[0]) {
          newValue = state.value[0]
        }
      }
      if (props.range && isArray(state.value)) {
        state.value[index] = newValue
        ctx.emit('change', state.value)
      } else {
        state.value = newValue
        ctx.emit('change', newValue)
      }
      state.visibles[index] = true
      nextTick(() => {
        state.rePosKey = Math.random()
        ctx.emit('afterChange', state.value)
      })
    }
    const handleMouseMove = (e: MouseEvent, index: number) => {
      if (!state.isMove || !state.sliderRef) return
      updateByClientPos(index, e.clientX, e.clientY)
    }
    const handleTouchHandle = (e: TouchEvent, index: number) => {
      state.isMove = true
      const touch = e.touches[0] || e.changedTouches[0]
      if (state.handleRefs[index]) {
        const handleRect = state.handleRefs[index]!.getBoundingClientRect()
        state.offsetX = touch.clientX - handleRect.left
        state.offsetY = touch.clientY - handleRect.top
      }
      state.currentIndex = index
      state.visibles[index] = true
      const hander = (event: TouchEvent) => {
        const t = event.touches[0] || event.changedTouches[0]
        updateByClientPos(index, t.clientX, t.clientY)
        event.preventDefault()
      }
      document.addEventListener('touchmove', hander, { passive: false })
      document.addEventListener(
        'touchend',
        () => {
          state.isMove = false
          if (!state.isHoverHnadle) {
            state.visibles[index] = false
          }
          document.removeEventListener('touchmove', hander)
        },
        { once: true }
      )
    }
    const handleMouseLeave = () => {
      state.hover = false
    }
    const handleFocus = (index: number) => {
      state.currentIndex = index
      state.handleFocus[index] = true
      const { min = 0, max = 100, step = 1, vertical, verticalReverse } = props
      if (keydownHandler) {
        document.removeEventListener('keydown', keydownHandler)
        keydownHandler = null
      }
      keydownHandler = (event: KeyboardEvent) => {
        if (props.disabled) return
        const key = event.key
        let delta = 0
        if (key === 'ArrowRight' || key === 'ArrowUp') {
          delta = step
        } else if (key === 'ArrowLeft' || key === 'ArrowDown') {
          delta = -step
        } else {
          return
        }
        event.preventDefault()
        if (vertical && verticalReverse) {
          delta = -delta
        }
        const idx = state.currentIndex >= 0 ? state.currentIndex : index
        const currentVal = isArray(state.value) ? Number(state.value[idx]) : Number(state.value)
        let newValue = Math.min(max, Math.max(min, currentVal + delta))
        if (isArray(state.value)) {
          if (idx === 0) {
            newValue = Math.min(newValue, Number(state.value[1]))
            state.value[0] = newValue
          } else {
            newValue = Math.max(newValue, Number(state.value[0]))
            state.value[1] = newValue
          }
          ctx.emit('change', state.value)
        } else {
          state.value = newValue
          ctx.emit('change', newValue)
        }
        state.visibles[idx] = true
        nextTick(() => {
          state.rePosKey = Math.random()
          ctx.emit('afterChange', state.value)
        })
      }
      document.addEventListener('keydown', keydownHandler)
    }
    const handleBlur = (index: number) => {
      state.handleFocus[index] = false
      if (keydownHandler) {
        document.removeEventListener('keydown', keydownHandler)
        keydownHandler = null
      }
      if (!state.isMove) {
        state.visibles[index] = false
      }
    }

    const handleChangeByPonint = (e: MouseEvent) => {
      if (props.disabled || !state.sliderRef) return
      const { min = 0, max = 100 } = props
      let index = 0
      if (props.range && isArray(state.value)) {
        const rect = state.sliderRef.getBoundingClientRect()
        const pos = props.vertical ? e.clientY - rect.top : e.clientX - rect.left
        const size = props.vertical ? rect.height : rect.width
        let ratio = size > 0 ? Math.max(0, Math.min(1, pos / size)) : 0
        if (props.vertical && props.verticalReverse) {
          ratio = 1 - ratio
        }
        const clickValue = min + ratio * (max - min)
        const d0 = Math.abs(clickValue - Number(state.value[0]))
        const d1 = Math.abs(clickValue - Number(state.value[1]))
        index = d0 <= d1 ? 0 : 1
      }
      if (props.vertical) {
        state.offsetY = (state.handleRefs[index]?.offsetHeight || 0) / 2
        state.offsetX = 0
      } else {
        state.offsetX = (state.handleRefs[index]?.offsetWidth || 0) / 2
        state.offsetY = 0
      }
      state.currentIndex = index
      state.visibles[index] = true
      updateByClientPos(index, e.clientX, e.clientY)
    }

    const trackStyle = computed<StyleValue>(() => {
      const { range, included, vertical, min = 0, max = 100 } = props
      if (!included) {
        return {}
      }
      const key = vertical ? 'height' : 'width'
      const direction = vertical ? 'top' : 'left'
      const span = max - min || 1
      const style: StyleValue = { [direction]: 0, [key]: '0%' }
      if (!range && !isArray(state.value)) {
        const percent = Math.max(0, Math.min(100, ((Number(state.value) - min) / span) * 100))
        style[key] = percent + '%'
      }
      if (range && isArray(state.value)) {
        const [start, end] = state.value
        const startPercent = Math.max(0, Math.min(100, ((Number(start) - min) / span) * 100))
        const endPercent = Math.max(0, Math.min(100, ((Number(end) - min) / span) * 100))
        style[direction] = startPercent + '%'
        style[key] = Math.min(Math.max(endPercent - startPercent, 0), 100) + '%'
      }
      return style
    })
    const getTipFormatter = (item: number | string) => {
      const { tipFormatter } = props
      if (isFunction(tipFormatter)) {
        return tipFormatter(item)
      }
      return item
    }
    const renderMarksDot = (valids: [string, string][]) => {
      const { vertical, tooltipOnMark, min = 0, max = 100 } = props
      const direction = vertical ? 'top' : 'left'
      const span = max - min || 1
      return (
        <div class={`${prefix}-slider-dots`}>
          {valids.map(([key], value) => {
            const percent = Math.max(0, Math.min(100, ((Number(key) - min) / span) * 100))
            const style: StyleValue = { [direction]: `calc(${percent}% - 2px)` }
            let isActive = false
            if (isArray(state.value)) {
              const [min, max] = state.value
              isActive = Number(key) >= min && Number(key) <= max
            } else {
              isActive = Number(key) >= state.value
            }
            const t = (
              <span
                class={[`${prefix}-slider-dot`, isActive && `${prefix}-slider-dot-active`]}
                style={style}
              ></span>
            )
            if (tooltipOnMark) {
              return (
                <Tooltip content={<span>{value}</span>} position="top" trigger="hover">
                  {t}
                </Tooltip>
              )
            }
            return t
          })}
        </div>
      )
    }
    const renderMarksLabel = (valids: [string, string][]) => {
      const { verticalReverse, vertical, min = 0, max = 100 } = props
      const direction = vertical ? 'top' : 'left'
      const span = max - min || 1
      return (
        <div
          class={[`${prefix}-slider-marks`, verticalReverse && `${prefix}-slider-marks-reverse`]}
        >
          {valids.map(([key, value]) => {
            const percent = Math.max(0, Math.min(100, ((Number(key) - min) / span) * 100))
            const style: StyleValue = { [direction]: `${percent}%` }
            return (
              <span
                class={[
                  `${prefix}-slider-mark`,
                  verticalReverse && `${prefix}-slider-mark-reverse`
                ]}
                style={style}
              >
                {value}
              </span>
            )
          })}
        </div>
      )
    }
    return () => {
      const {
        max,
        min,
        disabled,
        tipFormatter,
        getAriaValueText,
        marks,
        vertical,
        verticalReverse,
        handleDot,
        range,
        railStyle,
        showMarkLabel,
        tooltipVisible
      } = props
      const values = isArray(state.value) ? state.value : [state.value]
      const handleDots = isArray(handleDot) ? handleDot : [handleDot]
      let marksValids: [string, string][] = []
      if (marks) {
        const lists = Object.entries(marks) as [string, string][]
        marksValids = lists
          .filter(([key]) => {
            return Number(key) >= min && Number(key) <= max
          })
          .sort((a, b) => {
            return Number(a[0]) - Number(b[0])
          })
      }
      const ariaLabel =
        isArray(state.value) && range
          ? {
              'aria-label': `Range: ${getTipFormatter(state.value[0])} to ${getTipFormatter(state.value[1])}`
            }
          : {}
      return (
        <div
          class={[`${prefix}-slider`, vertical && `${prefix}-slider-vertical`]}
          onMouseenter={handleMouseEnter}
          onMouseleave={handleMouseLeave}
          ref={(node) => (state.sliderRef = node as HTMLElement)}
        >
          <div
            {...ariaLabel}
            class={[
              `${prefix}-slider-wrapper`,
              {
                [`${prefix}-slider-vertical-wrapper`]: vertical,
                [`${prefix}-slider-reverse`]: verticalReverse,
                [`${prefix}-slider-disabled`]: disabled
              }
            ]}
          >
            <div
              class={`${prefix}-slider-rail`}
              style={railStyle}
              onClick={handleChangeByPonint}
            ></div>
            <div
              class={`${prefix}-slider-track`}
              style={trackStyle.value}
              onClick={handleChangeByPonint}
            ></div>
            {marksValids && renderMarksDot(marksValids)}
            <div>
              {values.map((item: number, index: number) => {
                const v = item
                const direction = vertical ? 'top' : 'left'
                const span = max - min || 1
                const percent = Math.max(0, Math.min(100, ((Number(item) - min) / span) * 100))
                const style: StyleValue = {
                  zIndex: 1,
                  [direction]: percent + '%'
                }
                const vText = getTipFormatter(isArray(v) ? v[index] : v)
                let handleDotStyle = null
                if (handleDots && handleDots.length) {
                  const dot = handleDots[index]
                  if (dot?.color) {
                    handleDotStyle = {
                      backgroundColor: dot.color
                    }
                  }
                  if (dot?.size) {
                    handleDotStyle = {
                      ...(handleDotStyle || {}),
                      width: dot.size,
                      height: dot.size
                    }
                  }
                }
                const handerDom = (
                  <span
                    ref={(node) => (state.handleRefs[index] = node as HTMLElement)}
                    onMousedown={(e) => handleClickDownHandle(e, index)}
                    onMouseup={(e) => ctx.emit('mouseUp', e)}
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
                    style={style}
                    class={`${prefix}-slider-handle`}
                    role="slider"
                    tabindex="0"
                    aria-disabled={disabled}
                    aria-valuenow={item}
                    {...(isFunction(getAriaValueText)
                      ? { 'aria-valuetext': getAriaValueText(item) }
                      : { 'aria-valuetext': props['aria-valuetext'] })}
                    aria-valuemax={max}
                    aria-valuemin={min}
                    aria-labelledby={props['aria-labelledby']}
                    aria-label={props['aria-label']}
                    aria-orientation={vertical ? 'vertical' : 'horizontal'}
                    onFocus={() => handleFocus(index)}
                    onBlur={() => handleBlur(index)}
                  >
                    {handleDotStyle && (
                      <div class={`${prefix}-slider-handle-dot`} style={handleDotStyle}></div>
                    )}
                  </span>
                )
                const visible = tooltipVisible ? tooltipVisible : state.visibles[index]
                return isFunction(tipFormatter) && !disabled ? (
                  <Tooltip
                    trigger="custom"
                    visible={visible}
                    key={index}
                    position="top"
                    content={<span>{vText}</span>}
                    rePosKey={state.rePosKey}
                    showArrow={props.showArrow}
                  >
                    {handerDom}
                  </Tooltip>
                ) : (
                  handerDom
                )
              })}
            </div>
            {marksValids && showMarkLabel && renderMarksLabel(marksValids)}
            {showBoundary.value && (
              <div class={`${prefix}-slider-boundary`}>
                <div class={`${prefix}-slider-boundary-min`}>{min}</div>
                <div class={`${prefix}-slider-boundary-max`}>{max}</div>
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
