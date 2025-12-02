import { prefix } from 'constants/config'
import { defineComponent, computed, h } from 'vue'
import { checkboxGroupEmits, checkboxGroupProps, type OptionsType } from './type'
import Checkbox from './checkbox'
import { reactive } from 'vue'
import { isArray, isString } from '../_util'
import { watchEffect } from 'vue'
import { useCheckboxProvider } from './checkbox-content'
import { onMounted } from 'vue'

type CheckboxGroupStateType = {
  children: unknown[]
  wrapperRef: HTMLDivElement | null
  checkedValues: unknown[]
  checkboxIndex: number
  collectPropsChangeMap: Map<number, (record: Record<string, unknown>) => void>
}

const CheckboxGroup = defineComponent({
  setup(props, ctx) {
    const state = reactive<CheckboxGroupStateType>({
      children: [],
      wrapperRef: null,
      checkedValues: props.defaultValue || props.modelValue || [],
      checkboxIndex: 0, //记录jsx的checkbox
      collectPropsChangeMap: new Map<number, (record: Record<string, unknown>) => void>()
    })
    useCheckboxProvider({
      setCheckboxIndex() {
        const number = state.checkboxIndex
        state.checkboxIndex++
        return number
      },
      setCheckboxChild(index: number, child: unknown) {
        state.children[index] = child
      },
      onChnage(checked: boolean, index: number, value: unknown) {
        if (checked) {
          state.checkedValues.push(value)
        } else {
          state.checkedValues = state.checkedValues.filter((item) => item !== value)
        }
        emitsChange(state.checkedValues)
      },
      collectPropsChangeMap: state.collectPropsChangeMap
    })
    const createElment = h
    const wrapperClass = computed(() => {
      return [
        prefix + '-checkbox-group',
        prefix + '-checkbox-group-wrapper',
        prefix + `-checkbox-group-${props.direction}`
      ]
    })
    const triggerChangeProps = () => {
      state.collectPropsChangeMap.forEach((fn) => {
        fn(props)
      })
    }
    onMounted(() => {
      triggerChangeProps()
    })
    watchEffect(() => {
      const name = props.name || 'default'
      if (state.wrapperRef) {
        state.wrapperRef.querySelectorAll('input[type="checkbox"]').forEach((item) => {
          item.setAttribute('name', name)
        })
      }
    })

    const emitsChange = (checkedValues: unknown[]) => {
      checkedValues = [...checkedValues]
      ctx.emit('update:modelValue', checkedValues)
      ctx.emit('change', checkedValues)
    }
    const handleChildChange = (checked: boolean, value: unknown) => {
      if (checked) {
        state.checkedValues.push(value)
      } else {
        state.checkedValues = state.checkedValues.filter((item) => item !== value)
      }
      emitsChange(state.checkedValues)
    }

    const render = () => {
      const { defaultValue, disabled, options, type } = props
      if (isArray(options) && options.length > 0) {
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
            defaultChecked: defaultValue.includes(item.value),
            onChange: (checked: boolean) => handleChildChange(checked, item.value)
          }
          if (disabled) itemProps.disabled = disabled
          return createElment(Checkbox, itemProps, {
            default: () => item.label
          })
        })
      }
      // jsx
      const vNodes = ctx.slots.default?.()
      // let childIndex = 0
      // return vNodes?.map((item) => {
      //   if (item.type === Checkbox) {
      //     const itemProps = item.props || {}
      //     if (disabled) itemProps.disabled = disabled
      //     return createElment(item, {
      //       ...itemProps,
      //       type,
      //       defaultChecked: defaultValue.includes(itemProps.value),
      //       onChange: (checked: boolean) => handleChildChange(checked, itemProps.value),
      //       ref: (node) => {
      //         state.children[childIndex++] = node
      //       }
      //     })
      //   }
      //   return item
      // })
      return vNodes
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
  name: prefix + '-checkbox-group',
  props: checkboxGroupProps,
  emits: checkboxGroupEmits
})
export default CheckboxGroup
