import { defineComponent, getCurrentInstance, computed, type ExtractPublicPropTypes } from 'vue'
import { prefix } from 'constants/config'
import { itemProps, itemEmits } from './type'
import { hasPropsOrSlots, renderElementForPropsOrSlot } from '../_util'
import { useNavigationInject } from './content'
import Tooltip from '../tooltip'
import { useSubInject } from './sub-content'

const NavItem = defineComponent({
  setup(props) {
    const instance = getCurrentInstance()
    const navigationContext = useNavigationInject()
    const subContent = useSubInject({ subItems: false })
    const isOpen = computed(() => {
      return navigationContext?.selectedKeys?.includes?.(props.itemKey)
    })
    const wrapperClass = computed(() => {
      return [
        `${prefix}-navigation-item`,
        `${prefix}-navigation-item-normal`,
        {
          [`${prefix}-navigation-item-selected`]: isOpen.value
        }
      ]
    })
    const handleClickItem = (e: MouseEvent) => {
      navigationContext?.clickItem?.(props.itemKey, e, !isOpen?.value)
    }
    const iconRender = () => {
      if (hasPropsOrSlots('icon', instance)) {
        return (
          <i class={[`${prefix}-navigation-item-icon`, `${prefix}-navigation-item-icon-info`]}>
            {renderElementForPropsOrSlot('icon', instance)}
          </i>
        )
      }
      return (
        <i class={[`${prefix}-navigation-item-icon`, `${prefix}-navigation-item-icon-info`]}></i>
      )
    }
    return () => {
      const isCollapsed = !!navigationContext?.isCollapsed
      const inner = (
        <li
          role="menuitem"
          tabindex="0"
          aria-disabled="false"
          class={wrapperClass.value}
          onClick={handleClickItem}
        >
          {iconRender()}
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
        let p = {}
        if (navigationContext) {
          const { tooltipHideDelay, tooltipShowDelay } = navigationContext.getProps()
          p = {
            mouseEnterDelay: tooltipShowDelay,
            tooltipHideDelay: tooltipHideDelay
          }
        }
        return (
          <Tooltip
            {...p}
            position="right"
            content={<>{renderElementForPropsOrSlot('text', instance)}</>}
          >
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
