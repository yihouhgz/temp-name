import { defineComponent, onUnmounted, watchEffect, Fragment } from 'vue'
import { prefix } from 'constants/config'
import { getTargetWaveColor } from './utils'
function validateNum(value: number) {
  return Number.isNaN(value) ? 0 : value
}

const Wave = defineComponent(
  (props, { slots }) => {
    if (props.disabled) return () => <Fragment>{slots.default?.()}</Fragment>
    else {
      const showEffect = () => {
        const holder = document.createElement('div')
        holder.style.position = 'absolute'
        holder.style.left = '0px'
        holder.style.top = '0px'

        const width = props.target?.offsetWidth
        const height = props.target?.offsetHeight
        holder.style.width = `${width}px`
        holder.style.height = `${height}px`
        const nodeStyle = getComputedStyle(props.target)
        const {
          borderTopLeftRadius,
          borderTopRightRadius,
          borderBottomLeftRadius,
          borderBottomRightRadius
        } = nodeStyle
        const borderRadius = [
          borderTopLeftRadius,
          borderTopRightRadius,
          borderBottomRightRadius,
          borderBottomLeftRadius
        ].map((radius) => validateNum(parseFloat(radius)))
        const waveStyle = {
          color: getTargetWaveColor(props.target),
          width: `${width}px`,
          height: `${height}px`,
          borderRadius: borderRadius.map((radius) => `${radius}px`).join(' ')
        }
        console.log(waveStyle)

        props.target?.insertBefore(holder, props.target?.firstChild)
      }
      const handleClick = (e: MouseEvent) => {
        console.log(e, 'handleClick')
        showEffect()
      }
      watchEffect(() => {
        if (props.target) props.target.addEventListener('click', handleClick)
      })
      onUnmounted(() => {
        props.target.removeEventListener('click', handleClick)
      })
      return () => {
        return <Fragment>{slots.default?.()}</Fragment>
      }
    }
  },
  {
    name: `${prefix}-wave`,
    props: {
      disabled: { type: Boolean, default: false, required: false },
      target: { type: HTMLElement, required: false }
    }
  }
)

export default Wave
