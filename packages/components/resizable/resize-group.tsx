import { defineComponent, computed, h } from 'vue'
import { prefix } from 'constants/config'
import './style/resizable.ts'
import { resizableGroupProps } from './type'
import type { VNode } from 'vue'
import ResizeItem from './resize-item'
import ResizeHandler from './resize-handler'

const ResizeGroup = defineComponent({
  setup(props, ctx) {
    const wrapperClassNames = computed(() => {
      return [`${prefix}-resizable-group`, `${prefix}-resizable-group-${props.direction}`]
    })
    const render = () => {
      const vnodes = ctx.slots.default?.()
      let itemCount = 0,
        handleCount = 0
      for (const vnode of vnodes ?? []) {
        console.log(vnode, 'll')
        if (vnode.type === ResizeItem) {
          console.log(vnode, '1111')
          itemCount++
        }
        if (vnode.type === ResizeHandler) {
          console.log(vnode, '2222')
          handleCount++
        }
      }
      return vnodes?.map((item: VNode) => {
        if (item.type === ResizeItem) {
          return <ResizeItem>{item.children}</ResizeItem>
        }
        if (item.type === ResizeHandler) {
          return <ResizeHandler>{item.children}</ResizeHandler>
        }
      })
    }
    return () => {
      return <div class={wrapperClassNames.value}>{render()}</div>
    }
  },
  name: `${prefix}-resize-group`,
  props: resizableGroupProps
})
export default ResizeGroup
