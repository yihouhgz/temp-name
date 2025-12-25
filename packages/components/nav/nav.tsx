import { defineComponent, isVNode, getCurrentInstance, reactive } from 'vue'
import { prefix } from 'constants/config'
import { navProps, navEmits } from './type'
import NavHeader from './header'
import NavFooter from './footer'
import NavItem from './item'
import NavSub from './sub'
import {
  isFunction,
  isString,
  isObject,
  isArray,
  consolaWrapper,
  hasPropsOrSlots,
  renderElementForPropsOrSlot
} from '../_util'
import type { VNode } from 'vue'
import type { Item, Sub } from './type'
import './style/nav'
import { useNavigationProvide, type NavigationProvideContent } from './content'

const Nav = defineComponent({
  setup(props, ctx) {
    const instance = getCurrentInstance()
    const navigationProvideContent = reactive<NavigationProvideContent>({
      getPopupContainer: props.getPopupContainer,
      clickItem: (itemKey, domEvent, isOpen) => {
        ctx.emit('click', { itemKey, domEvent, isOpen })
      },
      getExpandIcon: () => {
        if (hasPropsOrSlots('expandIcon', instance)) {
          return renderElementForPropsOrSlot('expandIcon', instance)
        }
        return null
      },
      isCollapsed: !!props.isCollapsed,
      collapsedChange(isCollapsed) {
        navigationProvideContent.isCollapsed = isCollapsed
        console.log('isCollapsed', isCollapsed)
        ctx.emit('collapseChange', isCollapsed)
      }
    })
    useNavigationProvide(navigationProvideContent)
    const deepRenderItems = (items: string[] | Item[] | Sub[]) => {
      if (!isArray(items)) {
        consolaWrapper.error('nav items must be an array')
        return []
      }
      const result = []
      for (const item of items) {
        if (isString(item)) {
          const option = {
            itemKey: item,
            text: item
          }
          result.push(<NavItem {...option}></NavItem>)
        } else if (isObject(item)) {
          if ((item as unknown as Sub).items) {
            const option = item as Sub
            result.push(
              <NavSub {...option}>{option.items.length && deepRenderItems(option.items)}</NavSub>
            )
          } else {
            const option = item as unknown as Item
            result.push(<NavItem {...option}></NavItem>)
          }
        } else {
          result.push(item)
        }
      }
      return result
    }
    return () => {
      let header = props.header
      let footer = props.footer
      const items: VNode[] = []
      const isJsx = !props.items
      if (isJsx) {
        const children = ctx.slots.default?.() || []
        for (const child of children) {
          if (child.type === NavHeader) {
            header = child
          } else if (child.type === NavFooter) {
            footer = child
          } else {
            items.push(child)
          }
        }
        console.log(children, ';;')
      }
      const getHeader = () => {
        if (isJsx) {
          return header
        }
        if (isVNode(props.header) || isString(props.header)) return props.header
        if (isFunction(props.header)) return props.header()
        return <NavHeader {...(props.header ? props.header : {})}></NavHeader>
      }
      const getFooter = () => {
        if (isJsx) return footer
        if (isVNode(props.footer) || isString(props.footer)) return props.footer
        if (isFunction(props.footer)) return props.footer()
        return <NavFooter {...(props.footer ? props.footer : {})}></NavFooter>
      }
      const getItems = () => {
        if (isJsx) {
          return items
        }
        return deepRenderItems(props.items)
      }
      const { isCollapsed } = navigationProvideContent
      return (
        <div
          class={[
            prefix + '-navigation',
            isCollapsed && prefix + '-navigation-collapsed',
            prefix + '-navigation-' + props.mode
          ]}
        >
          <div class={[prefix + '-navigation-inner']}>
            <div class={[prefix + '-navigation-header-list-outer']}>
              {getHeader()}
              <div class={prefix + '-navigation-list-wrapper'} style={props.bodyStyle}>
                <ul aria-orientation={props.mode} class={[prefix + '-navigation-list']}>
                  {getItems()}
                </ul>
              </div>
            </div>
            {getFooter()}
          </div>
        </div>
      )
    }
  },
  props: navProps,
  emits: navEmits,
  name: prefix + '-nav'
})
export default Nav
