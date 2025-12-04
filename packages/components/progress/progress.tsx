import { defineComponent, computed, reactive } from 'vue'
import { prefix } from 'constants/config'
import { progressProps, type StrokeArray } from './type'
import './style/progress'
import { isArray } from '../_util'
import type { StyleValue } from 'vue'

const Progress = defineComponent({
  setup(props) {
    const state = reactive({
      percent: props.percent
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
              prefix + '-progress-' + props.direction,
              {
                [prefix + '-progress-small']: props.size === 'small'
              }
            ]
      ]
    })
    const getRangeColor = (backgroundColor: StrokeArray) => {
      for (let i = 0; i < backgroundColor.length; i++) {
        if (state.percent < backgroundColor[i + 1]?.percent) {
          return backgroundColor[i].color
        }
      }
      return backgroundColor[backgroundColor.length - 1].color
    }
    const renderLine = () => {
      const { stroke } = props
      let backgroundColor = stroke
      if (isArray(backgroundColor)) {
        backgroundColor = getRangeColor(backgroundColor)
      }
      const innerStyle: StyleValue = {}
      if (backgroundColor) {
        innerStyle.backgroundColor = backgroundColor
      }
      if (props.direction === 'horizontal') {
        innerStyle.width = state.percent + '%'
      } else {
        innerStyle.height = state.percent + '%'
      }
      return (
        <>
          <div class={prefix + '-progress-track'} aria-hidden="true">
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
            <div class={prefix + `-progress-inner-${props.direction}-text`}>{state.percent}%</div>
          )}
        </>
      )
    }
    const renderCircle = () => {
      const { width, size, strokeWidth } = props
      const svgSize = size === 'small' ? (width !== 24 ? width : 24) : width
      return (
        <svg
          class={prefix + '-progress-circle-ring'}
          width={svgSize}
          height={svgSize}
          aria-hidden="true"
        >
          <circle
            class={prefix + '-progress-circle-ring-track'}
            stroke-width={strokeWidth}
            stroke-linecap="round"
            aria-hidden="true"
            r={48}
            cx={50}
            cy={50}
            fill="transparent"
          ></circle>
          <circle
            class={prefix + '-progress-circle-ring-inner'}
            stroke-width={strokeWidth}
            stroke-linecap="round"
            aria-hidden="true"
            r={48}
            cx={50}
            cy={50}
            fill="transparent"
          ></circle>
        </svg>
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
