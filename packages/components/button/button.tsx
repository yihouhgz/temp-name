import { defineComponent, ref } from 'vue'
// import type { ButtonInstance } from './type'
import { buttonProps } from './type'
// import { prefix } from 'constants/config'
import Wave from '../wave'
import './style/button.scss'

const Button = defineComponent(
  (props, ctx) => {
    const number = ref(0)
    const handleClick = () => {
      number.value++
    }
    const defaultRender = () => {
      return (
        <div>
          {ctx.slots.default?.()}
          {number.value}
        </div>
      )
    }
    return () => {
      return (
        <Wave disabled={false}>
          <button class="temp-button" onClick={handleClick}>
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
