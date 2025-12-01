import { defineComponent, computed, reactive, getCurrentInstance } from 'vue'
import { prefix } from 'constants/config'
import { checkboxEmits, checkboxProps } from './type'
import './styles/checkout'
import {
  hasPropsOrSlots,
  renderElementForPropsOrSlot,
  useRandomIdWithPrefix,
  isBoolean
} from '../_util'
import { IconCheckboxTick, IconCheckboxIndeterminate } from '../icon'
import { useCheckboxInject } from './checkbox-content'

type CheckboxStateType = {
  checked: boolean
  inputRef: HTMLInputElement | null
  focused: boolean
}
const Checkbox = defineComponent({
  setup(props, ctx) {
    const state = reactive<CheckboxStateType>({
      checked: props.defaultChecked || !!props.checked,
      inputRef: null,
      focused: false
    })
    const instance = getCurrentInstance()
    useCheckboxInject()
    const wrapperClass = computed(() => {
      return [
        'tempui-checkbox',
        state.checked ? `${prefix}-checkbox-checked` : `${prefix}-checkbox-unchecked`,
        props.disabled ? `${prefix}-checkbox-disabled` : '',
        ['card', 'pureCard'].includes(props.type)
          ? [
              prefix + '-checkbox-cardType',
              props.type === 'pureCard' ? `${prefix}-checkbox-cardType-pureCard` : '',
              state.checked && props.disabled ? `${prefix}-checkbox-cardType-checked-disabled` : '',
              state.checked
                ? `${prefix}-checkbox-cardType-checked`
                : `${prefix}-checkbox-cardType-unchecked`,
              !state.checked && props.disabled
                ? `${prefix}-checkbox-cardType-unchecked-disabled`
                : ''
            ]
          : '',
        state.focused ? `${prefix}-checkbox-focus` : ''
      ]
    })
    const addonId = computed(() => {
      return props.addonId || useRandomIdWithPrefix('addon', 8)
    })
    const extraId = computed(() => {
      return useRandomIdWithPrefix('extra', 8)
    })
    const emitsChange = (value: boolean) => {
      const emits = ctx.emit
      emits('update:modelValue', value)
      emits('change', value)
    }
    const handleClick = (event: MouseEvent) => {
      if (props.disabled) {
        return
      }
      ctx.emit('click', event)
      //受控模式
      if (isBoolean(props.checked)) {
        emitsChange(!state.checked)
      } else {
        state.checked = !state.checked
        emitsChange(state.checked)
      }
    }
    const handleCheckboxFocus = () => {
      state.focused = true
    }
    const handleCheckboxBlur = () => {
      state.focused = false
    }
    ctx.expose({
      focus() {
        state.inputRef?.focus()
      },
      blur() {
        state.inputRef?.blur()
      }
    })
    return () => {
      return (
        <div class={wrapperClass.value} onClick={handleClick}>
          <span
            class={`${prefix}-checkbox-inner ${state.checked ? `${prefix}-checkbox-inner-checked` : ''}`}
          >
            <input
              ref={(node) => (state.inputRef = node as HTMLInputElement)}
              onFocus={handleCheckboxFocus}
              onBlur={handleCheckboxBlur}
              class={`${prefix}-checkbox-input`}
              type="checkbox"
              aria-label={props.ariaLabel}
              aria-checked={state.checked}
              aria-labelledby={addonId.value}
              {...(props.extra ? { 'aria-describedby': extraId.value } : {})}
            />
            <span class={`${prefix}-checkbox-inner-display`}>
              {state.checked &&
                (props.indeterminate ? (
                  <IconCheckboxIndeterminate aria-label="checkbox_indeterminate" />
                ) : (
                  <IconCheckboxTick aria-label="checkbox_tick" />
                ))}
            </span>
          </span>
          <div class={`${prefix}-checkbox-content`}>
            <span class={`${prefix}-checkbox-addon`} id={addonId.value}>
              {ctx.slots.default?.()}
            </span>
            {hasPropsOrSlots('extra', instance) ? (
              <div class={`${prefix}-checkbox-extra`} id={extraId.value}>
                {renderElementForPropsOrSlot('extra', instance)}
              </div>
            ) : null}
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
