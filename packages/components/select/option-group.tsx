import { defineComponent } from 'vue'
import { prefix } from 'constants/config'
import './style/select-option-group'

const SelectOptionGroup = defineComponent({
  setup(props, ctx) {
    return () => {
      return (
        <>
          <div class={prefix + '-select-option-group'}>{props.label}</div>
          {ctx.slots.default?.()}
        </>
      )
    }
  },
  props: {
    label: {
      type: String,
      required: true
    }
  },
  name: prefix + '-select-option-group'
})
export default SelectOptionGroup
