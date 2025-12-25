import { defineComponent, getCurrentInstance, reactive, type VNode } from 'vue'
import { prefix } from 'constants/config'
import { subProps, subEmits } from './type'
import Collapsible from '../collapsible'
import { renderElementForPropsOrSlot } from '../_util'
import { IconChevronDown } from '../icon'
import { useNavigationInject } from './content'
import Dropdown from '../dropdown'
import { useSubProvide } from './sub-content'
import NavItem, { type NavItemProps } from './item'
import { h } from 'vue'

const NavSub = defineComponent({
  setup(props, ctx) {
    const instance = getCurrentInstance()
    const state = reactive({
      isOpen: props.isOpen
    })
    const subContent = reactive({
      subItems: true
    })
    useSubProvide(subContent)
    const navigationContext = useNavigationInject()
    const handleClick = () => {
      if (navigationContext?.isCollapsed) {
        return
      }
      state.isOpen = !state.isOpen
    }
    const rightIcon = () => {
      let icon = (
        <IconChevronDown
          class={`${prefix}-navigation-item-icon-rotate-${state.isOpen ? 180 : 0}`}
        ></IconChevronDown>
      )
      if (navigationContext) {
        const temp = navigationContext.getExpandIcon()
        if (temp) icon = temp as VNode
      }
      return icon
    }
    return () => {
      const isCollapsed = !!navigationContext?.isCollapsed
      const inner = (
        <li
          class={[
            prefix + '-navigation-sub-wrap',
            prefix + '-navigation-item',
            prefix + '-navigation-item-sub'
          ]}
          tabindex="-1"
          aria-disabled="false"
          aria-expanded="false"
        >
          <div
            role="menuitem"
            tabindex="0"
            aria-expanded="false"
            class={prefix + '-navigation-sub-title'}
            onClick={handleClick}
          >
            <div class={prefix + '-navigation-item-inner'}>
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
              >
                {rightIcon()}
              </i>
            </div>
          </div>
          <Collapsible isOpen={state.isOpen}>
            <ul
              class={[prefix + '-navigation-sub', state.isOpen && prefix + '-navigation-sub-open']}
            >
              {ctx.slots.default?.()}
            </ul>
          </Collapsible>
        </li>
      )
      if (isCollapsed) {
        const render = () => {
          const children = ctx.slots.default?.() || []
          const Item = Dropdown.Item
          const deepRender = (nodes: VNode[]) => {
            const result: VNode[] = []
            for (const node of nodes) {
              if (node.type === NavItem) {
                const p = node.props as NavItemProps
                const n = h(
                  Item,
                  {},
                  {
                    default: () => p.text
                  }
                )
                result.push(n)
              }
            }
            return result
          }
          console.log(children)
          return <Dropdown.Menu>{deepRender(children)}</Dropdown.Menu>
        }
        return (
          <Dropdown trigger="click" render={render()} position="right">
            {inner}
          </Dropdown>
        )
      }
      return inner
    }
  },
  props: subProps,
  emits: subEmits,
  name: prefix + '-nav-sub'
})
export default NavSub
