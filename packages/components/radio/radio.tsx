import { defineComponent, computed, reactive, getCurrentInstance } from 'vue'
import { prefix } from 'constants/config'
import { radioPorps, radioEmits } from './type'
import { hasPropsOrSlots, renderElementForPropsOrSlot, useRandomIdWithPrefix } from '../_util'
import { IconRadio } from '../icon'
import './style/radio'

type RadioStateType = {
  checked: boolean
  focused: boolean
  inputRef: HTMLInputElement | null
}

const Radio = defineComponent({
  setup(props, ctx) {
    const state = reactive<RadioStateType>({
      checked: props.defaultChecked || !!props.checked,
      focused: false,
      inputRef: null
    })
    const instance = getCurrentInstance()
    const wrapperClass = computed(() => {
      return [
        prefix + '-radio',
        prefix + `-radio-${state.checked ? 'checked' : 'unchecked'}`,
        props.disabled && prefix + '-radio-disabled'
      ]
    })
    const addonId = computed(() => {
      return props.addonId || useRandomIdWithPrefix('addon', 8)
    })
    const renderIcon = () => {
      if (state.checked) {
        return <IconRadio />
      }
      return null
    }
    const handleClick = (event: MouseEvent) => {
      event.stopPropagation()
      event.preventDefault()
      console.log(state.checked)
      state.checked = !state.checked
    }
    ctx.expose({
      focus: () => {
        state.focused = true
        state.inputRef?.focus({
          preventScroll: props.preventScroll
        })
      },
      blur: () => {
        state.focused = false
        state.inputRef?.blur()
      }
    })
    return () => {
      return (
        <label class={wrapperClass.value} onClick={handleClick}>
          <span
            class={[
              prefix + '-radio-inner',
              prefix + `-radio-inner-${state.checked ? 'checked' : 'unchecked'}`
            ]}
          >
            <input
              type="radio"
              name={props.name}
              aria-label={props['aria-label']}
              aria-labelledby={addonId.value}
              class={prefix + '-radio-inner-input'}
              ref={(node) => (state.inputRef = node as HTMLInputElement)}
              onBlur={() => (state.focused = false)}
              onFocus={() => (state.focused = true)}
            />
            <span class={prefix + '-radio-inner-display'}>{renderIcon()}</span>
          </span>
          <div class={prefix + '-radio-content'}>
            <span class={prefix + '-radio-addon'} id={addonId.value}>
              {ctx.slots.default?.()}
            </span>
            {hasPropsOrSlots('extra', instance) ? (
              <span class={prefix + '-radio-extra'}>
                {renderElementForPropsOrSlot('extra', instance)}
              </span>
            ) : null}
          </div>
        </label>
      )
    }
  },
  name: `${prefix}-radio`,
  props: radioPorps,
  emits: radioEmits
})
export default Radio
