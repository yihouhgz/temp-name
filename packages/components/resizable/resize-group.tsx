import { defineComponent, computed, h, reactive } from 'vue'
import { prefix } from 'constants/config'
import './style/resizable.ts'
import { resizableGroupProps } from './type'
import type { VNode, ComponentPublicInstance } from 'vue'
import ResizeItem from './resize-item'
import type { ResizeItemExpose } from './resize-item'
import ResizeHandler from './resize-handler'
import { isArray, isFunction, isString } from '../_util'

type ResizeGroupState = {
  children: ComponentResizeItem[]
}
type ComponentResizeItem = ComponentPublicInstance<ResizeItemExpose>

const ResizeGroup = defineComponent({
  setup(props, ctx) {
    const createElment = h
    const state = reactive<ResizeGroupState>({
      children: []
    })
    const wrapperClassNames = computed(() => {
      return [`${prefix}-resizable-group`, `${prefix}-resizable-group-${props.direction}`]
    })
    const handlerResizeStart = (index: number, event: Event) => {
      console.log(index, event)
    }
    const handlerResizeEnd = (index: number, event: Event) => {
      console.log(index, event)
    }
    const handlerResizeChange = (index: number, event: MouseEvent) => {
      const before = state.children[index - 1]
      const after = state.children[index + 1]
      // 定义方向映射关系
      const directionMap = {
        horizontal: {
          before: 'right',
          after: 'left'
        },
        vertical: {
          before: 'bottom',
          after: 'top'
        }
      } as const
      const directions = directionMap[props.direction]
      if (before && isFunction(before._updateTargetSizeWrap)) {
        before._updateTargetSizeWrap(event, directions.before)
      }
      if (after && isFunction(after._updateTargetSizeWrap)) {
        after._updateTargetSizeWrap(event, directions.after)
      }
    }
    const render = () => {
      const vnodes = ctx.slots.default?.()
      const renderChildrenDefault = (item: VNode) => {
        if (isString(item.children) || isArray(item.children)) return item.children
        return (item.children as { default: () => unknown }).default?.()
      }
      return vnodes?.map((item: VNode, index: number) => {
        if (item.type === ResizeItem) {
          return createElment(
            item,
            {
              ...item.props,
              ref: (el) => (state.children[index] = el as ComponentPublicInstance<ResizeItemExpose>)
            },
            { default: () => renderChildrenDefault(item) }
          )
        }
        if (item.type === ResizeHandler) {
          return createElment(
            item,
            {
              direction: props.direction,
              ref: (el) =>
                (state.children[index] = el as ComponentPublicInstance<ResizeItemExpose>),
              onResizeStart: (e: MouseEvent) => handlerResizeStart(index, e),
              onResizeEnd: (e: MouseEvent) => handlerResizeEnd(index, e),
              onChange: (_: unknown, e: MouseEvent) => handlerResizeChange(index, e)
            },
            { default: () => renderChildrenDefault(item) }
          )
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
