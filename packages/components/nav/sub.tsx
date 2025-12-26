import { defineComponent, getCurrentInstance, reactive, type VNode } from 'vue'
import { prefix } from 'constants/config'
import { subProps, subEmits } from './type'
import Collapsible from '../collapsible'
import { isArray, renderElementForPropsOrSlot, useRandomId } from '../_util'
import { IconChevronDown } from '../icon'
import { useNavigationInject } from './content'
import Dropdown from '../dropdown'
import { useSubProvide } from './sub-content'
import NavItem, { type NavItemProps } from './item'
import { h } from 'vue'
import { computed } from 'vue'
import { nextTick } from 'vue'

const NavSub = defineComponent({
  setup(props, ctx) {
    console.log('NavSub', props.itemKey)
    const instance = getCurrentInstance()
    const state = reactive({
      isOpen: props.isOpen,
      reCalcKey: useRandomId(5)
    })
    const subContent = reactive({
      subItems: true
    })
    useSubProvide(subContent)
    const navigationContext = useNavigationInject()
    if (navigationContext) {
      state.isOpen = navigationContext.isDefaultOpen(props.itemKey)
      navigationContext.reCalcKey.set(props.itemKey, () => {
        state.reCalcKey = useRandomId(5)
      })
      navigationContext.closeCollapsibleMap.set(props.itemKey, {
        close: () => {
          state.isOpen = false
        },
        open: (isOpen) => {
          state.isOpen = isOpen
        },
        getCurrent: () => state.isOpen,
        before: state.isOpen
      })
    }
    const handleClick = () => {
      if (navigationContext?.isCollapsed) {
        return
      }
      state.isOpen = !state.isOpen
      nextTick(() => {
        if (navigationContext) {
          // navigationContext.updateReCalcKey()
        }
      })
    }
    const wrapperClass = computed(() => {
      return [
        prefix + '-navigation-sub-wrap',
        prefix + '-navigation-item',
        prefix + '-navigation-item-sub'
      ]
    })
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
      const getItem = (text?: unknown, icon: unknown = true, right: unknown = true) => {
        return [
          <i class={[`${prefix}-navigation-item-icon`, `${prefix}-navigation-item-icon-info`]}>
            {icon && renderElementForPropsOrSlot('icon', instance)}
          </i>,
          <span class={`${prefix}-navigation-item-text`}>
            {text ? text : renderElementForPropsOrSlot('text', instance)}
          </span>,
          <i
            class={[
              `${prefix}-navigation-item-icon`,
              `${prefix}-navigation-item-icon-toggle-right`
            ]}
          >
            {right && rightIcon()}
          </i>
        ]
      }
      let innerItem = (
        <div
          role="menuitem"
          tabindex="0"
          aria-expanded="false"
          class={prefix + '-navigation-sub-title'}
          onClick={handleClick}
        >
          <div class={prefix + '-navigation-item-inner'}>{getItem()}</div>
        </div>
      )
      const inner = () => {
        return (
          <li class={wrapperClass.value} tabindex="-1" aria-disabled="false" aria-expanded="false">
            {innerItem}
            <Collapsible isOpen={state.isOpen} reCalcKey={state.reCalcKey} keepDOM>
              <ul
                class={[
                  prefix + '-navigation-sub',
                  state.isOpen && prefix + '-navigation-sub-open'
                ]}
              >
                {ctx.slots.default?.()}
              </ul>
            </Collapsible>
          </li>
        )
      }
      if (isCollapsed) {
        const render = () => {
          const children = ctx.slots.default?.() || []
          const Item = Dropdown.Item
          const classNames = wrapperClass.value.filter(
            (item) => item !== prefix + '-navigation-sub-wrap'
          )
          const deepRender = (nodes: VNode[]) => {
            const result: VNode[] = []
            for (const node of nodes) {
              if (node.type === NavItem) {
                const p = node.props as NavItemProps
                const n = <Item class={classNames}>{getItem(p.text, false, false)}</Item>
                result.push(n)
              } else {
                if (typeof node.type === 'symbol') {
                  if (node.children && isArray(node.children)) {
                    const n = deepRender(node.children as VNode[]) as unknown as VNode
                    result.push(n)
                  } else {
                    result.push(node)
                  }
                } else {
                  result.push(h(Item, {}, { default: () => node }))
                }
              }
            }
            return result
          }
          return <Dropdown.Menu>{deepRender(children)}</Dropdown.Menu>
        }
        let p = {}
        if (navigationContext) {
          const {
            getPopupContainer,
            subDropdownProps,
            subNavCloseDelay,
            subNavMotion,
            subNavOpenDelay
          } = navigationContext.getProps()

          p = {
            ...subDropdownProps,
            getPopupContainer,
            mouseEnterDelay: subNavOpenDelay,
            tooltipHideDelay: subNavCloseDelay,
            motion: subNavMotion
          }
        }
        innerItem = (
          <Dropdown position="right" {...p} trigger="click" render={render()}>
            {innerItem}
          </Dropdown>
        )
      }
      return inner()
    }
  },
  props: subProps,
  emits: subEmits,
  name: prefix + '-nav-sub'
})
export default NavSub
