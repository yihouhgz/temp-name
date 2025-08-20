import {
  defineComponent,
  computed,
  onMounted,
  ref,
  onBeforeUnmount,
  reactive
} from 'vue'
import { prefix } from 'constants/config'
import './style/input'
import { inputPropsDefaults } from './type'
import Icon from '../icon'
import consola from '../_util/console'

const Input = defineComponent(
  (props, ctx) => {
    const inputWrapperRef = ref<HTMLDivElement>()
    const inputRef = ref<HTMLInputElement>()
    const inputSelfData = reactive({
      value: props.value || props.defaultValue,
      showClearIcon: false,
      focus: false,
      showPassword: false
    })

    // style handle
    const inputWrapperClass = computed(() => {
      return [
        'tempui-input',
        'tempui-input-' + props.size,
        {
          'tempui-input-disabled': props.disabled,
          'tempui-input-clearable': props.showClear,
          'tempui-input-borderless': props.borderless,
          [`tempui-input-${props.validateStatus}`]:
            props.validateStatus !== 'default',
          'tempui-input-focus': inputSelfData.focus
        }
      ]
    })
    const inputTargetClass = computed(() => {
      return [
        'tempui-input-target',
        'tempui-input-target-' + props.size,
        {
          'tempui-input-target-disabled': props.disabled,
          'tempui-input-target-clearable': props.showClear
        }
      ]
    })

    // traget input event handle
    const handleTargetInputChange = (e: Event) => {
      inputSelfData.value = (e.target as HTMLInputElement).value
      const target = e.target as HTMLInputElement
      handleUpdateModelValue(target.value)
      ctx.emit('change', inputSelfData.value, e)
    }
    const handleTargetInputFocus = (e: FocusEvent) => {
      inputSelfData.focus = true
      ctx.emit('focus', e)
    }
    const handleTargetInputBlur = (e: FocusEvent) => {
      inputSelfData.focus = false
      ctx.emit('blur', e)
    }
    const handleControlInputCursorForFocus = () => {
      inputRef.value?.focus()
      requestAnimationFrame(() => {
        inputSelfData.focus = true
        const len = inputRef.value?.value.length
        if (len) inputRef.value?.setSelectionRange(len, len)
      })
    }

    // control the cleaning icon
    const showClearIconWapper = computed(() => {
      const flag = inputSelfData.focus || inputSelfData.showClearIcon
      if (inputValue.value && props.showClear && flag && !props.disabled)
        return true
      return false
    })
    const handleClearInput = (e: MouseEvent) => {
      inputSelfData.value = ''
      ctx.emit('clear', e)
      handleUpdateModelValue(inputSelfData.value)
      ctx.emit('change', inputSelfData.value, e)
      handleControlInputCursorForFocus()
    }
    const handleMoveEnter = () => {
      if (props.showClear) {
        inputSelfData.showClearIcon = true
      }
    }
    const handleMoveLeave = () => {
      inputSelfData.showClearIcon = false
    }
    onMounted(() => {
      if (props.showClear) {
        inputWrapperRef.value?.addEventListener('mousemove', handleMoveEnter)
        inputWrapperRef.value?.addEventListener('mouseleave', handleMoveLeave)
      }
    })
    onBeforeUnmount(() => {
      inputWrapperRef.value?.removeEventListener('mousemove', handleMoveEnter)
      inputWrapperRef.value?.removeEventListener('mouseleave', handleMoveLeave)
    })

    // password icon status trigger
    const triggerPasswordStatus = () => {
      handleControlInputCursorForFocus()
      inputSelfData.showPassword = !inputSelfData.showPassword
    }
    // v-model
    if (props.modelValue !== undefined && props.value !== undefined) {
      consola.warn(
        'Input components modelValue and value cannot be passed in simultaneously.'
      )
    }
    const inputValue = computed(() => {
      if (props.modelValue !== undefined) return props.modelValue
      if (props.value !== undefined && props.value === inputSelfData.value) {
        return props.value
      }
      // When the props value is different from its own value, the own value is adopted
      return inputSelfData.value
    })
    const handleUpdateModelValue = (value: string) => {
      ctx.emit('update:modelValue', value)
    }

    //expose input ref method
    ctx.expose({
      focus: () => inputRef.value?.focus(),
      blur: () => inputRef.value?.blur()
    })

    return () => {
      return (
        <div class={inputWrapperClass.value} ref={inputWrapperRef}>
          <input
            ref={inputRef}
            value={inputValue.value}
            onChange={handleTargetInputChange}
            onInput={handleTargetInputChange}
            onFocus={handleTargetInputFocus}
            onBlur={handleTargetInputBlur}
            type={
              props.type === 'password' && inputSelfData.showPassword
                ? 'text'
                : props.type
            }
            disabled={props.disabled}
            placeholder={props.placeholder}
            class={inputTargetClass.value}
            {...ctx.attrs}
          />
          {showClearIconWapper.value && (
            <div class="tempui-input-clearable-icon">
              <Icon
                disabled={props.disabled}
                name="IconClear"
                onClick={handleClearInput}
              ></Icon>
            </div>
          )}
          {props.type === 'password' && (
            <div class="tempui-input-password-icon">
              <Icon
                disabled={props.disabled}
                name={
                  inputSelfData.showPassword
                    ? 'IconEyeOpened'
                    : 'IconEyeClosedSolid'
                }
                onClick={triggerPasswordStatus}
              ></Icon>
            </div>
          )}
        </div>
      )
    }
  },
  {
    name: prefix + '-input',
    props: inputPropsDefaults,
    emits: ['update:modelValue', 'change', 'focus', 'blur', 'clear']
  }
)

export default Input
