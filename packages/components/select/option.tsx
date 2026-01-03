import { defineComponent, computed, ref, onMounted } from 'vue'
import type { ExtractPropTypes } from 'vue'
import { prefix } from 'constants/config'
import { useEventListener } from '../_util'
import { IconTick } from '../icon'
import './style/select-option'

const SelectOption = defineComponent({
  setup(props, ctx) {
    const optionRef = ref()
    const optionClassName = computed(() => [
      prefix + '-select-option',
      {
        [prefix + '-select-option-selected']: props._selected,
        [prefix + '-select-option-focused']: props._focused,
        [prefix + '-select-option-disabled']: props.disabled
      }
    ])

    onMounted(() => {
      useEventListener(optionRef.value, 'mouseenter', (e) => {
        ctx.emit('focus_', e)
      })
    })
    const handleClickOption = () => {
      ctx.emit('click', { ...props })
    }
    return () => {
      return (
        <div
          onClick={handleClickOption}
          class={optionClassName.value}
          {...ctx.attrs}
          ref={optionRef}
        >
          <div class={prefix + '-select-option-prefix'}>
            {props._selected && <IconTick></IconTick>}
          </div>
          <div class={prefix + '-select-option-text'}>
            {props.label ? props.label : ctx.slots.default?.()}
          </div>
        </div>
      )
    }
  },
  name: prefix + '-select-option',
  props: {
    value: {
      type: [String, Number],
      required: true
    },
    label: {
      type: String,
      required: false,
      default: ''
    },
    _focused: {
      type: Boolean,
      default: false,
      required: false
    },
    _selected: {
      type: Boolean,
      default: false,
      required: false
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  emits: ['click', 'focus_']
})
export type SelectOptionProps = ExtractPropTypes<typeof SelectOption>
export default SelectOption
