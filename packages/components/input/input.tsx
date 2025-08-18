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

const Input = defineComponent(
  (props, ctx) => {
    const inputWrapperRef = ref<HTMLDivElement>()
    const inputSelfData = reactive({
      value: '',
      showClearIcon: false,
      focus: false
    })
    const inputWrapperClass = computed(() => {
      return [
        'tempui-input',
        'tempui-input-' + props.size,
        {
          'tempui-input-disabled': props.disabled,
          'tempui-input-clearable': props.showClear,
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

    const handleTargetInputChange = (e: Event) => {
      inputSelfData.value = (e.target as HTMLInputElement).value
      ctx.emit('update:modelValue', inputSelfData.value)
      ctx.emit('change', inputSelfData.value)
    }
    const handleTargetInput = (e: Event) => {
      const target = e.target as HTMLInputElement
      ctx.emit('input', target.value)
    }
    const handleTargetInputFocus = (e: Event) => {
      inputSelfData.focus = true
      ctx.emit('focus', e)
    }
    const handleTargetInputBlur = (e: Event) => {
      inputSelfData.focus = false
      ctx.emit('blur', e)
    }
    const handleMoveEnter = () => {
      if (inputSelfData.value && props.showClear) {
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

    const showPassword = ref(false)
    const triggerPasswordStatus = () => {
      showPassword.value = !showPassword.value
    }
    return () => {
      return (
        <div class={inputWrapperClass.value} ref={inputWrapperRef}>
          <input
            onChange={handleTargetInputChange}
            onInput={handleTargetInput}
            onFocus={handleTargetInputFocus}
            onBlur={handleTargetInputBlur}
            type={
              props.type === 'password' && showPassword.value
                ? 'text'
                : props.type
            }
            disabled={props.disabled}
            placeholder={props.placeholder}
            class={inputTargetClass.value}
            {...ctx.attrs}
          />
          {props.showClear && (
            <div class="tempui-input-clearable-icon">
              <Icon name="IconClear"></Icon>
            </div>
          )}
          {props.type === 'password' && (
            <div class="tempui-input-password-icon">
              <Icon
                name={
                  showPassword.value ? 'IconEyeOpened' : 'IconEyeClosedSolid'
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
    emits: ['update:modelValue', 'change', 'input', 'focus', 'blur']
  }
)

export default Input
