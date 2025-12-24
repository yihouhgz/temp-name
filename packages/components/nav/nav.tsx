import { defineComponent, isVNode } from 'vue'
import { prefix } from 'constants/config'
import { navProps, navEmits } from './type'
import NavHeader from './header'
import NavFooter from './footer'
import { isFunction, isObject, isString } from '../_util'
import type { VNode } from 'vue'

const Nav = defineComponent({
  setup(props, ctx) {
    const deepRenderItems = (items: string[] | Item[] | Sub[]) => {}
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
      return (
        <div class={[prefix + '-navigation', prefix + '-navigation-' + props.mode]}>
          <div class={[prefix + '-navigation-inner']}>
            <div class={[prefix + '-navigation-header-list-outer']}>
              {getHeader()}
              <div class={prefix + '-navigation-list-wrapper'} style={props.bodyStyle}>
                {getItems()}
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
