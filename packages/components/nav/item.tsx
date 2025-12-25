import { defineComponent, getCurrentInstance, type ExtractPublicPropTypes } from 'vue'
import { prefix } from 'constants/config'
import { itemProps, itemEmits } from './type'
import { renderElementForPropsOrSlot } from '../_util'
import { useNavigationInject } from './content'
import Tooltip from '../tooltip'
import { useSubInject } from './sub-content'

const NavItem = defineComponent({
  setup() {
    const instance = getCurrentInstance()
    const navigationContext = useNavigationInject()
    const subContent = useSubInject({ subItems: false })
    return () => {
      const isCollapsed = !!navigationContext?.isCollapsed
      const inner = (
        <li
          role="menuitem"
          tabindex="0"
          aria-disabled="false"
          class={[`${prefix}-navigation-item`, `${prefix}-navigation-item-normal`]}
        >
          <i class={[`${prefix}-navigation-item-icon`, `${prefix}-navigation-item-icon-info`]}>
            {renderElementForPropsOrSlot('icon', instance)}
          </i>
          <span class={`${prefix}-navigation-item-text`}>
            {renderElementForPropsOrSlot('text', instance)}
          </span>
          <i
            class={[
              `${prefix}-navigation-item-icon`,
              `${prefix}-navigation-item-icon-toggle-right`
            ]}
          ></i>
        </li>
      )
      if (isCollapsed && !subContent?.subItems) {
        return (
          <Tooltip position="right" content={<>{renderElementForPropsOrSlot('text', instance)}</>}>
            {inner}
          </Tooltip>
        )
      }
      return inner
    }
  },
  props: itemProps,
  emits: itemEmits,
  name: prefix + '-nav-item'
})
export type NavItemProps = ExtractPublicPropTypes<typeof itemProps>
export default NavItem
