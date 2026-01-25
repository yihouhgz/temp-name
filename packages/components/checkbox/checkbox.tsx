import { defineComponent, computed, reactive, getCurrentInstance, watch } from 'vue'
import { prefix } from 'constants/config'
import { checkboxEmits, checkboxProps } from './type'
import './styles/checkout'
import {
  hasPropsOrSlots,
  renderElementForPropsOrSlot,
  useRandomIdWithPrefix,
  isBoolean,
  isArray
} from '../_util'
import { IconCheckboxTick, IconCheckboxIndeterminate } from 'icons'
import { useCheckboxInject } from './checkbox-content'

type CheckboxStateType = {
  checked: boolean
  inputRef: HTMLInputElement | null
  focused: boolean
  childIndex: number
  onCheckboxChange?: (checked: boolean, index: number, value: unknown) => void
  type: string
  disabled: boolean
  defaultChecked: boolean
}
const Checkbox = defineComponent({
  setup(props, ctx) {
    const state = reactive<CheckboxStateType>({
      checked: props.defaultChecked || !!props.checked,
      inputRef: null,
      focused: false,
      childIndex: 0,
      onCheckboxChange: undefined,
      type: props.type,
      disabled: props.disabled,
      defaultChecked: props.defaultChecked
    })
    const instance = getCurrentInstance()
    const changeCheckboxProps = (groupProps: Record<string, unknown>) => {
      const { type, disabled, defaultValue } = groupProps as {
        type: string
        disabled: boolean
        defaultValue: unknown
      }
      state.type = type
      if (!props.disabled) {
        state.disabled = disabled
      }
      if (isArray(defaultValue)) {
        state.checked = defaultValue.includes(props.value)
      }
    }
    const checkboxInject = useCheckboxInject(null)
    if (checkboxInject) {
      state.childIndex = checkboxInject.setCheckboxIndex()
      state.onCheckboxChange = checkboxInject.onChange
      checkboxInject.collectPropsChangeMap?.set(state.childIndex, changeCheckboxProps)
    }
    watch(
      () => props,
      () => {
        if (!checkboxInject) {
          state.checked = !!props.checked
          state.type = props.type
          state.disabled = props.disabled
        }
      }
    )
    const wrapperClass = computed(() => {
      return [
        'tempui-checkbox',
        state.checked ? `${prefix}-checkbox-checked` : `${prefix}-checkbox-unchecked`,
        state.disabled ? `${prefix}-checkbox-disabled` : '',
        ['card', 'pureCard'].includes(state.type)
          ? [
              prefix + '-checkbox-cardType',
              state.type === 'pureCard' ? `${prefix}-checkbox-cardType-pureCard` : '',
              state.checked && state.disabled ? `${prefix}-checkbox-cardType-checked-disabled` : '',
              state.checked
                ? `${prefix}-checkbox-cardType-checked`
                : `${prefix}-checkbox-cardType-unchecked`,
              !state.checked && state.disabled
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
      if (state.disabled) {
        return
      }
      ctx.emit('click', event)
      //受控模式
      if (isBoolean(props.checked)) {
        emitsChange(!state.checked)
      } else {
        state.checked = !state.checked
        emitsChange(state.checked)
        state.onCheckboxChange?.(state.checked, state.childIndex, props.value)
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
        state.inputRef?.focus({
          preventScroll: props.preventScroll
        })
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
              {...(hasPropsOrSlots('extra', instance) ? { 'aria-describedby': extraId.value } : {})}
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
