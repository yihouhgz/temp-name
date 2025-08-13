import { defineComponent, onUnmounted, watchEffect, Fragment } from 'vue'
import { prefix } from 'constants/config'
import { getTargetWaveColor, getWaveEffectColor } from './utils'
import './style/wave'

const Wave = defineComponent(
  (props, { slots }) => {
    if (props.disabled) return () => <Fragment>{slots.default?.()}</Fragment>
    else {
      const showEffect = () => {
        const holder = document.createElement('div')
        holder.style.position = 'absolute'
        holder.style.left = '0px'
        holder.style.top = '0px'
        holder.style.pointerEvents = 'none'

        const width = props.target?.offsetWidth
        const height = props.target?.offsetHeight
        holder.style.width = `${width}px`
        holder.style.height = `${height}px`
        // 计算波纹颜色
        const targetWaveColor = getTargetWaveColor(props.target)
        const waveEffectColor = getWaveEffectColor(targetWaveColor)

        // 创建波纹元素
        const wave = document.createElement('div')
        wave.style.position = 'absolute'
        wave.style.pointerEvents = 'none'
        wave.style.backgroundColor = waveEffectColor
        wave.style.borderRadius = '6px'
        wave.style.opacity = '0'
        wave.style.transform = 'scale(1)'
        wave.style.transition = 'transform 0.4s , opacity 0.4s'
        wave.style.willChange = 'transform, opacity'

        // 设置波纹的初始位置
        const rect = props.target.getBoundingClientRect()
        wave.style.width = `${rect.width}px`
        wave.style.height = `${rect.height}px`
        wave.style.left = `${0}px`
        wave.style.top = `${0}px`

        holder.appendChild(wave)
        props.target?.insertBefore(holder, props.target?.firstChild)
        wave.className = 'wave-effect'

        // 动画结束后移除元素
        wave.addEventListener(
          'animationend',
          () => {
            holder.remove()
          },
          { once: true }
        )
      }

      const handleClick = () => {
        showEffect()
      }

      watchEffect(() => {
        if (props.target) props.target.addEventListener('click', handleClick)
      })

      onUnmounted(() => {
        if (props.target) {
          props.target.removeEventListener('click', handleClick)
        }
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
