import { defineComponent, ref, computed } from 'vue'
// import type { ButtonInstance } from './type'
import { buttonPropsDefaults } from './type'
import { prefix } from 'constants/config'
import Wave from '../wave'
// import CameraIcon from '../icon/camera'
import LoadingIcon from '../icon/loading'
import './style/button'
import { generate } from 'theme/derive'
console.log(prefix, 'prefix', generate('#fff'))
console.log(buttonPropsDefaults, 'ButtonPropsType')
const Button = defineComponent(
  (props, ctx) => {
    console.log(props, 'props')
    const buttonRef = ref<HTMLButtonElement>()
    const handleClick = (event: MouseEvent) => {
      if (buttonRef.value) {
        buttonRef.value?.blur()
      }
      ctx.emit('click', event)
    }

    const iconRender = () => {
      if (props.loading) return <LoadingIcon />
      else {
        return ctx.slots.icon ? ctx.slots.icon() : <></>
      }
    }
    const defaultRender = () => {
      return (
        <span class="tempui-button-content">
          {iconRender()}
          <span>{ctx.slots.default?.()}</span>
        </span>
      )
    }

    const buttonClass = computed(() => [
      'tempui-button',
      `tempui-button-${props.type}`,
      `tempui-button-${props.size}`,
      {
        'is-disabled': props.disabled,
        'tempui-button-loading': props.loading && !props.disabled,
        'tempui-button-icon': ctx.slots.icon,
        'tempui-button-block': props.block
      }
    ])

    return () => {
      return (
        <Wave disabled={props.disabled} target={buttonRef.value as HTMLElement}>
          <button
            ref={buttonRef}
            class={buttonClass.value}
            onClick={handleClick}
            disabled={props.disabled}
            {...ctx.attrs}
          >
            {defaultRender()}
          </button>
        </Wave>
      )
    }
  },
  {
    name: `${prefix}-button`,
    props: buttonPropsDefaults,
    emits: ['click']
  }
)

export default Button
