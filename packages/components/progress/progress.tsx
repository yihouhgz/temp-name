import { defineComponent, computed, reactive, watchEffect } from 'vue'
import { prefix } from 'constants/config'
import { progressProps, type StrokeArray, DEFAULT_COLOR } from './type'
import './style/progress'
import { isArray, isUndefined } from '../_util'
import type { StyleValue } from 'vue'
import { getGeneratedColor } from './color'

const Progress = defineComponent({
  setup(props) {
    const state = reactive({
      percent: props.percent
    })
    watchEffect(() => {
      state.percent = props.percent
      if (props.percent > 100) {
        state.percent = 100
      }
      if (props.percent < 0) {
        state.percent = 0
      }
    })
    const classNames = computed(() => {
      return [
        prefix + '-progress',
        props.type === 'line'
          ? [
              prefix + '-progress-' + props.direction,
              {
                [prefix + '-progress-large']: props.size === 'large'
              }
            ]
          : [
              prefix + '-progress-circle',
              {
                [prefix + '-progress-small']: props.size === 'small'
              }
            ]
      ]
    })
    const getRangeColor = (backgroundColor: StrokeArray) => {
      backgroundColor.sort((a, b) => a.percent - b.percent)
      if (backgroundColor[0].percent > state.percent) {
        return DEFAULT_COLOR
      }
      for (let i = 0; i < backgroundColor.length; i++) {
        if (state.percent < backgroundColor[i + 1]?.percent) {
          return backgroundColor[i].color
        }
      }
      return backgroundColor[backgroundColor.length - 1].color
    }
    const getPercentValue = () => {
      const { format } = props
      let percentValue = state.percent
      if (state.percent > 100) {
        percentValue = 100
      }
      if (state.percent < 0) {
        percentValue = 0
      }
      return format(percentValue)
    }
    const renderLine = () => {
      const { stroke } = props
      let backgroundColor = stroke
      if (isArray(backgroundColor)) {
        backgroundColor = getRangeColor(backgroundColor)
      }
      const innerStyle: StyleValue = {}
      if (backgroundColor) {
        innerStyle.backgroundColor = getGeneratedColor(backgroundColor)
      }
      if (props.direction === 'horizontal') {
        innerStyle.width = state.percent + '%'
      } else {
        innerStyle.height = state.percent + '%'
      }
      return (
        <>
          <div
            class={prefix + '-progress-track'}
            aria-hidden="true"
            style={{ backgroundColor: props.orbitStroke }}
          >
            <div
              aria-hidden="true"
              class={[
                prefix + '-progress-track-inner',
                `${prefix}-progress-track-inner-${props.direction}`
              ]}
              style={innerStyle}
            ></div>
          </div>
          {props.showInfo && (
            <div class={prefix + `-progress-inner-${props.direction}-text`}>
              {getPercentValue()}
            </div>
          )}
        </>
      )
    }
    const renderCircle = () => {
      const { width, size, strokeWidth, stroke } = props
      let backgroundColor = stroke
      if (isArray(backgroundColor)) {
        backgroundColor = getRangeColor(backgroundColor)
      }
      const innerStyle: StyleValue = {}
      if (backgroundColor) {
        innerStyle.stroke = getGeneratedColor(backgroundColor)
      }
      const svgSize =
        size === 'small' ? (isUndefined(width) ? 24 : width) : isUndefined(width) ? 72 : width
      const cx = svgSize / 2
      const cy = svgSize / 2
      const radius = (svgSize - strokeWidth) / 2
      const circumference = radius * 2 * Math.PI
      const strokeDashoffset = (1 - state.percent / 100) * circumference
      const strokeDasharray = `${circumference} ${circumference}`
      const showInfo = props.showInfo && size != 'small'
      return (
        <>
          <svg
            class={prefix + '-progress-circle-ring'}
            width={svgSize}
            height={svgSize}
            aria-hidden="true"
          >
            <circle
              class={prefix + '-progress-circle-ring-track'}
              stroke-width={strokeWidth}
              stroke-linecap={props.strokeLinecap}
              aria-hidden="true"
              r={radius}
              cx={cx}
              cy={cy}
              stroke-dashoffset="0"
              stroke-dasharray={strokeDasharray}
              fill="transparent"
              stroke={props.orbitStroke}
            ></circle>
            <circle
              class={prefix + '-progress-circle-ring-inner'}
              stroke-width={strokeWidth}
              stroke-linecap={props.strokeLinecap}
              aria-hidden="true"
              r={radius}
              cx={cx}
              cy={cy}
              fill="transparent"
              style={innerStyle}
              stroke-dashoffset={strokeDashoffset}
              stroke-dasharray={strokeDasharray}
            ></circle>
          </svg>
          {showInfo && <div class={prefix + `-progress-circle-text`}>{getPercentValue()}</div>}
        </>
      )
    }
    const inner = () => {
      if (props.type === 'line') {
        return renderLine()
      }
      return renderCircle()
    }
    return () => {
      return (
        <div
          class={classNames.value}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={state.percent}
        >
          {inner()}
        </div>
      )
    }
  },
  props: progressProps,
  name: prefix + '-progress'
})
export default Progress
