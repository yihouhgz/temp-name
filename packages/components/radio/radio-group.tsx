import { defineComponent, reactive, h } from 'vue'
import { prefix } from 'constants/config'
import { radioGroupEmits, radioGroupProps, type OptionsType, type RadioEvent } from './type'
import { useRadioProvider } from './radio-content'
import { computed } from 'vue'
import { watchEffect } from 'vue'
import { isArray, isString } from '../_util'
import Radio from './radio'

type RadioGroupStateType = {
  children: unknown[]
  wrapperRef: HTMLDivElement | null
  checkedValues: unknown
  radioIndex: number
  collectPropsChangeMap: Map<number, (record: Record<string, unknown>) => void>
  collectStopPropagationMap: Map<number, (record: Record<string, unknown>) => void>
  collectPreventDefaultMap: Map<number, (record: Record<string, unknown>) => void>
  collectCancelEventMap: Map<number, (checkedValue: unknown) => void>
}
const RadioGroup = defineComponent({
  setup(props, ctx) {
    const createElment = h
    const state = reactive<RadioGroupStateType>({
      children: [],
      wrapperRef: null,
      checkedValues: props.defaultValue,
      radioIndex: 0, //记录jsx的radio
      //收集child的change
      collectPropsChangeMap: new Map<number, (record: Record<string, unknown>) => void>(),
      //收集child的stopPropagation
      collectStopPropagationMap: new Map<number, (record: Record<string, unknown>) => void>(),
      ////收集child的preventDefault
      collectPreventDefaultMap: new Map<number, (record: Record<string, unknown>) => void>(),
      //收集child的cancelEvent
      collectCancelEventMap: new Map<number, (checkedValue: unknown) => void>()
    })
    useRadioProvider({
      setRadioIndex() {
        const number = state.radioIndex
        state.radioIndex++
        return number
      },
      setRadioChild(index: number, child: unknown) {
        state.children[index] = child
      },
      onChange(event: RadioEvent, value: unknown) {
        triggerGroupChange(event, value)
        triggerCancelEvent()
      },
      collectPropsChangeMap: state.collectPropsChangeMap,
      collectStopPropagationMap: state.collectStopPropagationMap,
      collectPreventDefaultMap: state.collectPreventDefaultMap,
      collectCancelEventMap: state.collectCancelEventMap
    })
    const wrapperClass = computed(() => {
      return [
        prefix + '-radio-group',
        prefix + '-radio-group-wrapper',
        props.type !== 'button' && prefix + `-radio-group-${props.direction}`,
        props.type === 'button' && prefix + `-radio-group-button`
      ]
    })
    const triggerCollectPropsChangeMap = () => {
      const gProps = { ...props }
      state.collectPropsChangeMap.forEach((collectPropsChange) => {
        collectPropsChange(gProps)
      })
    }
    watchEffect(() => {
      triggerCollectPropsChangeMap()
    })
    watchEffect(() => {
      const name = props.name || 'default'
      if (state.wrapperRef) {
        state.wrapperRef.querySelectorAll('input[type="radio"]').forEach((item) => {
          item.setAttribute('name', name)
        })
      }
    })
    const triggerCancelEvent = () => {
      const checkedValues = state.checkedValues
      state.collectCancelEventMap.forEach((collectCancelEvent) => {
        collectCancelEvent(checkedValues)
      })
    }
    const handleGroupChange = (e: RadioEvent, value: unknown) => {
      triggerGroupChange(e, value)
      triggerCancelEvent()
    }
    const triggerGroupChange = (event: RadioEvent, value: unknown) => {
      state.checkedValues = value
      ctx.emit('change', {
        ...event,
        target: {
          value: value
        }
      })
    }
    const render = () => {
      const { options, disabled, defaultValue, type, mode, buttonSize, value } = props
      if (isArray(options) && options.length) {
        return options.map((item) => {
          if (isString(item)) {
            item = {
              label: item,
              value: item
            } as unknown as OptionsType
          }
          const itemProps = {
            ...item,
            type,
            key: item.value,
            mode,
            buttonSize,
            disabled,
            defaultChecked: defaultValue === item.value || value === item.value,
            onChange: (e: RadioEvent) => {
              handleGroupChange(e, item.value)
            }
          }
          return createElment(Radio, itemProps, {
            default: () => item.label
          })
        })
      }
      return ctx.slots.default?.()
    }
    return () => {
      return (
        <div
          class={wrapperClass.value}
          role="list"
          ref={(el) => (state.wrapperRef = el as HTMLDivElement)}
        >
          {render()}
        </div>
      )
    }
  },
  name: prefix + '-radio-group',
  props: radioGroupProps,
  emits: radioGroupEmits
})

export default RadioGroup
