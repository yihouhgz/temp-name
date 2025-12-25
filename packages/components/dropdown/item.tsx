import { defineComponent, getCurrentInstance, computed } from 'vue'
import { prefix } from 'constants/config'
import { itemProps, itemEmits } from './type'
import { hasPropsOrSlots, renderElementForPropsOrSlot } from '../_util'
import { reactive } from 'vue'

const DropdownItem = defineComponent({
  setup(props, ctx) {
    const state = reactive({
      active: props.active
    })
    const instance = getCurrentInstance()
    const getIcon = () => {
      if (hasPropsOrSlots('icon', instance)) {
        return renderElementForPropsOrSlot('icon', instance)
      }
      return null
    }
    const wrapperClass = computed(() => {
      return [
        prefix + '-dropdown-item',
        {
          [prefix + '-dropdown-item-' + props.type]: props.type,
          [prefix + '-dropdown-item-active']: state.active,
          [prefix + '-dropdown-item-disabled']: props.disabled
        }
      ]
    })
    const handleClick = (e: MouseEvent) => {
      if (props.disabled) {
        return
      }
      ctx.emit('click', e)
    }
    const handleMouseEnter = (e: MouseEvent) => {
      ctx.emit('mouseEnter', e)
    }
    const handleMouseLeave = (e: MouseEvent) => {
      ctx.emit('mouseLeave', e)
    }
    const handleContextMenu = (e: MouseEvent) => {
      ctx.emit('contextMenu', e)
    }
    return () => {
      return (
        <li
          class={wrapperClass.value}
          onClick={handleClick}
          onMouseenter={handleMouseEnter}
          onMouseleave={handleMouseLeave}
          onContextmenu={handleContextMenu}
          role="menuitem"
          tabindex={0}
        >
          {[getIcon(), ctx.slots.default?.()]}
        </li>
      )
    }
  },
  props: itemProps,
  emits: itemEmits,
  name: prefix + '-dropdown-item'
})
export default DropdownItem
