import { prefix } from 'constants/config'
import { defineComponent, computed, reactive, getCurrentInstance, watch, ref } from 'vue'
import './style/switch'
import { switchProps, switchEmits } from './type'
import Spin from '../spin'
import { hasPropsOrSlots, isBoolean, renderElementForPropsOrSlot } from '../_util'
import consola from '../_util/console'

const Switch = defineComponent({
  setup(props, ctx) {
    const inputRef = ref()
    const state = reactive({
      checked: props.defaultChecked || !!props.checked,
      focus: false
    })
    watch(
      () => props.checked,
      (val) => {
        state.checked = !!val
      }
    )
    const wrapperClassNames = computed(() => {
      return [
        `${prefix}-switch`,
        {
          [`${prefix}-switch-focus`]: state.focus,
          [`${prefix}-switch-checked`]: state.checked,
          [`${prefix}-switch-disabled`]: props.disabled,
          [`${prefix}-switch-loading`]: props.loading,
          [`${prefix}-switch-${props.size}`]: props.size
        }
      ]
    })
    const getSpinSize = computed(() => {
      switch (props.size) {
        case 'small':
          return 'small'
        case 'large':
          return 'large'
        default:
          return 'middle'
      }
    })

    const handleSwitchFocus = () => {
      if (inputRef.value?.matches(':focus-visible')) {
        state.focus = true
      }
    }
    const handleSwitchBlur = () => {
      state.focus = false
    }
    const handleClickSwitch = (e: MouseEvent) => {
      if (props.disabled || props.loading) return
      ctx.emit('click', e)
      //受控模式
      if (isBoolean(props.checked)) {
        ctx.emit('change', !state.checked)
      } else {
        state.checked = !state.checked
        handleUpdateModelValue(state.checked)
        ctx.emit('change', state.checked)
      }
    }
    const handleUpdateModelValue = (value: boolean) => {
      ctx.emit('update:modelValue', value)
    }
    // v-model
    if (props.modelValue !== undefined && props.checked !== undefined) {
      consola.warn('Switch components modelValue and checked cannot be passed in simultaneously.')
    }
    const vm = getCurrentInstance()
    const renderCheckedText = () => {
      return (
        <div class={`${prefix}-switch-checked-text`}>
          {renderElementForPropsOrSlot('checkedText', vm)}
        </div>
      )
    }
    const renderUncheckedText = () => {
      return (
        <div class={`${prefix}-switch-unchecked-text`}>
          {renderElementForPropsOrSlot('uncheckedText', vm)}
        </div>
      )
    }
    const renderTextSlot = () => {
      if (hasPropsOrSlots('checkedText', vm) || hasPropsOrSlots('uncheckedText', vm)) {
        return state.checked ? renderCheckedText() : renderUncheckedText()
      }
      return null
    }
    const renderCheckedKnob = () => {
      const template = <div class={`${prefix}-switch-knob`}></div>
      if (hasPropsOrSlots('checkedKnob', vm) || hasPropsOrSlots('uncheckedKnob', vm)) {
        const warpper = (vnode: unknown) => {
          if (vnode) return <div class={`${prefix}-switch-knob`}>{vnode}</div>
          return template
        }
        return state.checked
          ? warpper(renderElementForPropsOrSlot('checkedKnob', vm))
          : warpper(renderElementForPropsOrSlot('uncheckedKnob', vm))
      }
      return template
    }
    return () => (
      <div
        class={wrapperClassNames.value}
        onClick={handleClickSwitch}
        onMouseenter={(e) => ctx.emit('mouseEnter', e)}
        onMouseleave={(e) => ctx.emit('mouseLeave', e)}
      >
        {props.loading ? (
          <Spin size={getSpinSize.value} class={`${prefix}-switch-loading-spin`}></Spin>
        ) : (
          renderCheckedKnob()
        )}
        {props.size !== 'small' && renderTextSlot()}
        <input
          ref={(node) => (inputRef.value = node)}
          class={`${prefix}-switch-native-control`}
          type="checkbox"
          checked
          onFocus={handleSwitchFocus}
          onBlur={handleSwitchBlur}
        />
      </div>
    )
  },
  name: prefix + '-switch',
  props: switchProps,
  emits: switchEmits
})

export default Switch
