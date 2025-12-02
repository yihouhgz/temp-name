import { defineComponent, computed, reactive, getCurrentInstance } from 'vue'
import { prefix } from 'constants/config'
import { radioPorps, radioEmits } from './type'
import {
  hasPropsOrSlots,
  isBoolean,
  renderElementForPropsOrSlot,
  useRandomIdWithPrefix
} from '../_util'
import { IconRadio } from '../icon'
import './style/radio'
import { watchEffect } from 'vue'
import { useRadioInject } from './radio-content'

type RadioStateType = {
  type: string
  buttonSize: string
  mode: string
  disabled: boolean
  checked: boolean
  focused: boolean
  inputRef: HTMLInputElement | null
  childIndex: number // group 子组件索引
  onRadioChange?: (event: Record<string, unknown>) => void // group 子组变化时调用
}

const Radio = defineComponent({
  setup(props, ctx) {
    const state = reactive<RadioStateType>({
      buttonSize: props.buttonSize,
      mode: props.mode,
      type: props.type,
      disabled: props.disabled,
      checked: !!props.defaultChecked || !!props.checked,
      focused: false,
      inputRef: null,
      childIndex: -1, // group 子组件索引
      onRadioChange: undefined // group 子组变化时调用
    })
    watchEffect(() => {
      state.checked = !!props.checked
    })
    const instance = getCurrentInstance()
    const changeRadioProps = (groupProps: Record<string, unknown>) => {
      const { type, disabled, defaultValue, buttonSize, mode } = groupProps as {
        type: string
        disabled: boolean
        defaultValue: unknown
        buttonSize: string
        mode: string
      }
      state.buttonSize = buttonSize
      state.mode = mode
      state.type = type
      state.disabled = disabled
      state.checked = defaultValue === props.value
    }
    const radioInject = useRadioInject(null)
    if (radioInject) {
      state.childIndex = radioInject.setRadioIndex()
      state.onRadioChange = radioInject.onChange
      radioInject.collectPropsChangeMap?.set(state.childIndex, changeRadioProps)
    }
    const wrapperClass = computed(() => {
      return [
        prefix + '-radio',
        prefix + `-radio-${state.checked ? 'checked' : 'unchecked'}`,
        props.disabled && prefix + '-radio-disabled',
        {
          [prefix + '-radio-focused']: state.focused
        }
      ]
    })
    const addonId = computed(() => {
      return props.addonId || useRandomIdWithPrefix('addon', 8)
    })
    const extraId = computed(() => {
      return useRandomIdWithPrefix('extra', 8)
    })
    const renderIcon = () => {
      if (state.checked) {
        return <IconRadio />
      }
      return null
    }
    const handleClick = (event: MouseEvent) => {
      if (props.disabled) {
        return
      }
      if (props.mode != 'advanced' && state.checked) {
        return
      }
      if (isBoolean(props.checked)) {
        handleChange(
          {
            stopPropagation: event.stopPropagation,
            preventDefault: event.preventDefault
          },
          !state.checked
        )
      } else {
        state.checked = !state.checked
        handleChange(
          {
            stopPropagation: event.stopPropagation,
            preventDefault: event.preventDefault
          },
          state.checked
        )
      }
    }
    const handleChange = (
      {
        stopPropagation,
        preventDefault
      }: {
        stopPropagation: () => void
        preventDefault: () => void
      },
      checked: boolean
    ) => {
      const event = {
        stopPropagation,
        preventDefault,
        target: {
          checked: checked
        }
      }
      ctx.emit('change', event)
    }
    const handleFocus = () => {
      if (state.inputRef?.matches(':focus-visible')) {
        state.focused = true
      }
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
      const isShowExtra = hasPropsOrSlots('extra', instance)
      return (
        <label
          class={wrapperClass.value}
          onClick={(e: MouseEvent) => handleClick(e)}
          onMouseenter={(e: MouseEvent) => ctx.emit('mouseEnter', e)}
          onMouseleave={(e: MouseEvent) => ctx.emit('mouseLeave', e)}
        >
          <span
            class={[
              prefix + '-radio-inner',
              prefix + `-radio-inner-${state.checked ? 'checked' : 'unchecked'}`
            ]}
          >
            <input
              onClick={(e: MouseEvent) => e.stopPropagation()}
              type="radio"
              name={props.name}
              aria-label={props['aria-label']}
              aria-labelledby={addonId.value}
              {...(isShowExtra ? { 'aria-describedby': extraId.value } : {})}
              class={prefix + '-radio-inner-input'}
              ref={(node) => (state.inputRef = node as HTMLInputElement)}
              onBlur={() => (state.focused = false)}
              onFocus={handleFocus}
            />
            <span class={prefix + '-radio-inner-display'}>{renderIcon()}</span>
          </span>
          <div class={prefix + '-radio-content'}>
            <span class={prefix + '-radio-addon'} id={addonId.value}>
              {ctx.slots.default?.()}
            </span>
            {isShowExtra ? (
              <span class={prefix + '-radio-extra'} id={extraId.value}>
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
