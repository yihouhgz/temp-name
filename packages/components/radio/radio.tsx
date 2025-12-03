import { defineComponent, computed, reactive, getCurrentInstance } from 'vue'
import { prefix } from 'constants/config'
import { radioPorps, radioEmits, type RadioEvent } from './type'
import {
  hasPropsOrSlots,
  isBoolean,
  renderElementForPropsOrSlot,
  useRandomIdWithPrefix
} from '../_util'
import { IconRadio } from '../icon'
import './style/radio'
import { watch } from 'vue'
import { useRadioInject } from './radio-content'
import { onMounted } from 'vue'

type RadioStateType = {
  type: string
  buttonSize: string
  mode: string
  disabled: boolean
  checked: boolean
  focused: boolean
  inputRef: HTMLInputElement | null
  childIndex: number // group 子组件索引
  onRadioChange?: (event: RadioEvent, value: unknown) => void // group 子组变化时调用
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
    watch(
      () => props.checked,
      () => (state.checked = !!props.checked)
    )
    const instance = getCurrentInstance()
    const changeRadioProps = (groupProps: Record<string, unknown>) => {
      const { type, disabled, defaultValue, buttonSize, mode, value } = groupProps as {
        type: string
        disabled: boolean
        defaultValue: unknown
        buttonSize: string
        mode: string
        value: string
      }
      state.buttonSize = buttonSize
      state.mode = mode
      state.type = type
      state.disabled = disabled
      state.checked = defaultValue === props.value || value === props.value
    }
    const radioInject = useRadioInject(null)
    if (radioInject) {
      state.childIndex = radioInject.setRadioIndex()
      state.onRadioChange = radioInject.onChange
      radioInject.collectCancelEventMap?.set(state.childIndex, (checkedValue) => {
        state.checked = checkedValue === props.value
      })
      radioInject.collectPropsChangeMap?.set(state.childIndex, changeRadioProps)
    }
    const wrapperClass = computed(() => {
      return [
        prefix + '-radio',
        prefix + `-radio-${state.checked ? 'checked' : 'unchecked'}`,
        state.disabled && prefix + '-radio-disabled',
        {
          [prefix + '-radio-focused']: state.focused
        },
        {
          [prefix + '-radio-button']: state.type === 'button',
          [prefix + '-radio-button-group']: state.type === 'button',
          [prefix + '-radio-button-' + state.buttonSize]: state.type === 'button'
        }
      ]
    })
    onMounted(() => {
      if (props.autoFocus) {
        state.focused = true
        state.inputRef?.focus()
      }
    })
    const addonId = computed(() => {
      return props.addonId || useRandomIdWithPrefix('addon', 8)
    })
    const extraId = computed(() => {
      return useRandomIdWithPrefix('extra', 8)
    })
    const renderIcon = () => {
      if (state.checked && state.type !== 'button') {
        return <IconRadio />
      }
      return null
    }
    const handleClick = (event: MouseEvent) => {
      if (state.disabled) {
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
      if (state.onRadioChange) {
        state.onRadioChange(event, props.value)
      }
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
          onMouseenter={(e: MouseEvent) => ctx.emit('mouseEnter', e)}
          onMouseleave={(e: MouseEvent) => ctx.emit('mouseLeave', e)}
        >
          <span
            class={[
              prefix + '-radio-inner',
              prefix + `-radio-inner-${state.checked ? 'checked' : 'unchecked'}`,
              state.type === 'button' && prefix + '-radio-inner-button'
            ]}
          >
            <input
              onClick={(e: MouseEvent) => handleClick(e)}
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
            <span class={state.type !== 'button' && prefix + '-radio-inner-display'}>
              {renderIcon()}
            </span>
          </span>
          <div class={prefix + '-radio-content'}>
            <span
              class={[
                prefix + '-radio-addon',
                state.type === 'button' && prefix + '-radio-addon-button',
                state.type === 'button' && state.checked && prefix + '-radio-addon-button-checked',
                state.type === 'button' && prefix + '-radio-addon-button-' + state.buttonSize,
                state.type === 'button' &&
                  state.disabled &&
                  prefix + '-radio-addon-button-disabled',
                props.addonClassName
              ]}
              style={props.addonStyle}
              id={addonId.value}
            >
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
