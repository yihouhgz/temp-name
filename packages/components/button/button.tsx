import { defineComponent, ref } from 'vue'
// import type { ButtonInstance } from './type'
import { buttonProps } from './type'
// import { prefix } from 'constants/config'
import Wave from '../wave'
import CameraIcon from '../icon/camera'
import './style/button'
import { generate, getRgbStr, getPresetColors } from 'theme/derive'
generate('#fff')
const Button = defineComponent(
  (props, ctx) => {
    const buttonRef = ref<HTMLButtonElement>()
    const handleClick = (event: MouseEvent) => {
      if (buttonRef.value) {
        buttonRef.value?.blur()
      }
      console.log('click')
      ctx.emit('click', event)
    }
    const defaultRender = () => {
      return (
        <div style="display: flex;align-items: center;">
          <CameraIcon style="margin-right: 8px;" />
          <span>{ctx.slots.default?.()}</span>
        </div>
      )
    }

    const buttonClass = [
      'tempui-button',
      `tempui-button-${props.type}`,
      `tempui-button-${props.size}`,
      {
        'is-disabled': props.disabled,
        'tempui-button-loading': props.loading
      }
    ]

    return () => {
      return (
        <Wave disabled={false}>
          <button
            ref={buttonRef}
            class={buttonClass}
            onClick={handleClick}
            disabled={props.disabled}
          >
            {defaultRender()}
          </button>
        </Wave>
      )
    }
  },
  {
    name: 'nl-button',
    props: buttonProps
  }
)

export default Button
