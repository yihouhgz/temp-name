import { defineComponent } from 'vue'
import { prefix } from 'constants/config'
import { dropdownProps, dropdownEmits } from './type'
import Tooltip from '../tooltip'
import { getCurrentInstance } from 'vue'
import { renderElementForPropsOrSlot } from '../_util'
import { omit } from 'lodash'
import './style/dropdown'
const Dropdown = defineComponent({
  setup(props, ctx) {
    const instance = getCurrentInstance()
    return () => {
      const popoverProps = omit(props, ...['showTick', 'render', 'menu'])
      return (
        <Tooltip
          showArrow={false}
          prefixCls={prefix + '-dropdown'}
          content={
            <div class={prefix + '-dropdown'}>
              {renderElementForPropsOrSlot('render', instance)}
            </div>
          }
          {...popoverProps}
          onClickOutSide={(e) => ctx.emit('clickOutSide', e)}
          onVisibleChange={(visible) => ctx.emit('visibleChange', visible)}
          onEscKeyDown={(e) => ctx.emit('escKeyDown', e)}
        >
          {ctx.slots.default?.()}
        </Tooltip>
      )
    }
  },
  props: dropdownProps,
  emits: dropdownEmits,
  name: prefix + '-dropdown'
})
export default Dropdown
