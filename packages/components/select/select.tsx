import { defineComponent, computed } from 'vue'
import { prefix } from 'constants/config'
import './style/select'
import Popover from '../popover'

const Select = defineComponent({
  setup(props, ctx) {
    const wrapperClass = computed(() => {
      return [`${prefix}-select`]
    })
    return () => (
      <Popover
        position="bottom"
        autoAdjustOverflow={true}
        trigger="click"
        content={<div>options</div>}
      >
        <div class={wrapperClass.value} {...ctx.attrs}>
          select
        </div>
      </Popover>
    )
  },
  name: prefix + '-select'
})

export default Select
