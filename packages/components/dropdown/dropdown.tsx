import { defineComponent } from 'vue'
import { prefix } from 'constants/config'
import { dropdownProps, dropdownEmits } from './type'
import Popover from '../popover'
import { getCurrentInstance } from 'vue'
import { renderElementForPropsOrSlot } from '../_util'
import { omit } from 'lodash'
const Dropdown = defineComponent({
  setup(props, ctx) {
    const instance = getCurrentInstance()
    return () => {
      const popoverProps = omit(props, ...['showTick', 'render', 'menu'])
      return (
        <Popover content={<>{renderElementForPropsOrSlot('render', instance)}</>} {...popoverProps}>
          {ctx.slots.default?.()}
        </Popover>
      )
    }
  },
  props: dropdownProps,
  emits: dropdownEmits,
  name: prefix + '-dropdown'
})
export default Dropdown
