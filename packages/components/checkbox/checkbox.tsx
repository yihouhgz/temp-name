import { defineComponent, computed, reactive } from 'vue'
import { prefix } from 'constants/config'
import { checkboxEmits, checkboxProps } from './type'
import './styles/checkout'
import { useRandomIdWithPrefix } from '../_util'
import { IconCheckboxTick } from '../icon'

type CheckboxStateType = {
  checked: boolean
}
const Checkbox = defineComponent({
  setup(props, ctx) {
    const state = reactive<CheckboxStateType>({
      checked: true
    })
    const wrapperClass = computed(() => {
      return [
        'tempui-checkbox',
        state.checked ? `${prefix}-checkbox-checked` : `${prefix}-checkbox-unchecked`
      ]
    })
    const addonId = computed(() => {
      return props.addonId || useRandomIdWithPrefix('addon', 8)
    })
    return () => {
      return (
        <div class={wrapperClass.value}>
          <span class={`${prefix}-checkbox-inner`}>
            <input
              class={`${prefix}-checkbox-input`}
              type="checkbox"
              aria-label={props.ariaLabel}
              aria-checked={state.checked}
              aria-labelledby={addonId.value}
            />
            <span class={`${prefix}-checkbox-inner-display`}>
              {state.checked && <IconCheckboxTick aria-label="checkbox_tick" />}
            </span>
          </span>
          <div class={`${prefix}-checkbox-content`}>
            <span class={`${prefix}checkbox-addon`} id={addonId.value}>
              {ctx.slots.default?.()}
            </span>
          </div>
        </div>
      )
    }
  },
  props: checkboxProps,
  emits: checkboxEmits,
  name: prefix + '-checkbox'
})
export default Checkbox
