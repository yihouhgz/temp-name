import { defineComponent, computed, h, reactive } from 'vue'
import { prefix } from 'constants/config'
import './style/resizable.ts'
import { resizableGroupProps } from './type'
import type { VNode, ComponentPublicInstance } from 'vue'
import ResizeItem from './resize-item'
import ResizeHandler from './resize-handler'
import { consolaWrapper, isArray, isString, onElementResize } from '../_util'
import { onMounted } from 'vue'
import { provideResizeContent, type ResizeContent } from './resize-content'
import { getPixelSize, getOffset, getItemDirection } from './utils'

type ResizeGroupState = {
  itemChildren: ComponentResizeItem[]
  handerChildren: ComponentResizeItem[]
  allChildren: ComponentResizeItem[]
  wrapperRef: HTMLDivElement | null
  parentRect: { width: number; height: number } | null
  totalMinus: number
  isResizing: boolean
  itemMinusMap: Map<number, number>
  itemPercentMap: Map<number, number>
  originalPosition: {
    x: number
    y: number
    lastItemSize: number
    nextItemSize: number
    lastOffset: number
    nextOffset: number
  }
  mouseType: 'mouse' | 'touch'
}
type ComponentResizeItem = ComponentPublicInstance<typeof ResizeItem>

const ResizeGroup = defineComponent({
  setup(props, ctx) {
    const createElment = h
    const state = reactive<ResizeGroupState>({
      itemChildren: [],
      handerChildren: [],
      allChildren: [],
      wrapperRef: null,
      parentRect: null,
      totalMinus: 0,
      isResizing: false,
      itemMinusMap: new Map(),
      itemPercentMap: new Map(),
      originalPosition: {
        x: 0,
        y: 0,
        lastItemSize: 0,
        nextItemSize: 0,
        lastOffset: 0,
        nextOffset: 0
      },
      mouseType: 'mouse'
    })
    const resizeContent: ResizeContent = {
      changeItem: new Set(),
      resizeStartItem: new Set(),
      resizeEndItem: new Set(),
      itemProps: new Set()
    }
    provideResizeContent<ResizeContent>(resizeContent)
    const wrapperClassNames = computed(() => {
      return [`${prefix}-resizable-group`, `${prefix}-resizable-group-${props.direction}`]
    })
    onMounted(() => {
      onElementResize(state.wrapperRef, () => {
        state.parentRect = getParentSize()
      })
      state.parentRect = getParentSize()
      handleInitSize()
    })
    const handleInitSize = () => {
      const { direction } = props
      const parentRect = state.parentRect
      const parentSize =
        direction === 'horizontal' ? parentRect?.width || 0 : parentRect?.height || 0
      const handlerSizes: number[] = []
      const itemPercentMap = new Map()
      state.totalMinus = 0
      for (const item of state.handerChildren) {
        const handlerSize =
          direction === 'horizontal'
            ? item.$el.getBoundingClientRect().width
            : item.$el.getBoundingClientRect().height
        state.totalMinus += handlerSize
        handlerSizes.push(handlerSize)
      }

      let totalSizePercent = 0
      const undefineLoc: Map<
        number,
        {
          value: number
          child: ComponentResizeItem
        }
      > = new Map()
      let undefinedTotal = 0
      const itemMinusMap = new Map()
      const itemLength = state.itemChildren.length
      for (let i = 0; i < state.itemChildren.length; i++) {
        if (i === 0) {
          itemMinusMap.set(i, handlerSizes[i] / 2)
        } else if (i === itemLength - 1) {
          itemMinusMap.set(i, handlerSizes[i - 1] / 2)
        } else {
          itemMinusMap.set(i, handlerSizes[i - 1] / 2 + handlerSizes[i] / 2)
        }
        const child = state.itemChildren[i]
        const minSize = child.min,
          maxSize = child.max
        const minSizePercent = minSize ? (getPixelSize(minSize, parentSize) / parentSize) * 100 : 0,
          maxSizePercent = maxSize ? (getPixelSize(maxSize, parentSize) / parentSize) * 100 : 100
        if (minSizePercent > maxSizePercent) {
          consolaWrapper.warn('ResizableItem min size bigger than max size')
        }

        const defaultSize = child.defaultSize
        if (defaultSize) {
          let itemSizePercent: number
          if (isString(defaultSize)) {
            if (defaultSize.endsWith('%')) {
              itemSizePercent = parseFloat(defaultSize.slice(0, -1))
              itemPercentMap.set(i, itemSizePercent)
            } else if (defaultSize.endsWith('px')) {
              itemSizePercent = (parseFloat(defaultSize.slice(0, -2)) / parentSize) * 100
              itemPercentMap.set(i, itemSizePercent)
            } else {
              // 仅由数字组成，表示按比例分配剩下空间
              undefineLoc.set(i, {
                value: parseFloat(defaultSize),
                child: child
              })
              undefinedTotal += parseFloat(defaultSize)
              continue
            }
          } else {
            undefineLoc.set(i, {
              value: defaultSize,
              child: child
            })
            undefinedTotal += defaultSize
            continue
          }
          totalSizePercent += itemSizePercent

          if (direction === 'horizontal') {
            child.$el.style.width = `calc(${itemSizePercent}% - ${itemMinusMap.get(i)}px)`
          } else {
            child.$el.style.height = `calc(${itemSizePercent}% - ${itemMinusMap.get(i)}px)`
          }

          if (itemSizePercent < minSizePercent) {
            consolaWrapper.warn('ResizableGroup item size smaller than min size')
          }
          if (itemSizePercent > maxSizePercent) {
            consolaWrapper.warn('ResizableGroup item size bigger than max size')
          }
        } else {
          undefineLoc.set(i, {
            value: 1,
            child: child
          })
          undefinedTotal += 1
        }
      }
      let undefineSizePercent = 100 - totalSizePercent
      if (totalSizePercent > 100) {
        consolaWrapper.warn('ResizableGroup total Size bigger than 100%')
        undefineSizePercent = 10 // 如果总和超过100%，则保留10%的空间均分给未定义的item
      }
      if (undefineLoc.size > 0) {
        undefineLoc.forEach((item, key) => {
          const child = item.child
          const value = item.value
          const percent = (value / undefinedTotal) * undefineSizePercent
          itemPercentMap.set(key, percent)
          if (direction === 'horizontal') {
            child.$el.style.width = `calc(${percent}% - ${itemMinusMap.get(key)}px)`
          } else {
            child.$el.style.height = `calc(${percent}% - ${itemMinusMap.get(key)}px)`
          }
        })
      }
      state.itemMinusMap = itemMinusMap
      state.itemPercentMap = itemPercentMap
    }
    const handlerResizeStart = (index: number, itemIndex: number, event: Event) => {
      const [lastDirection, nextDirection] = getItemDirection(props.direction)
      let i = 0
      let j = 0
      resizeContent.resizeStartItem.forEach((fn) => {
        if (i++ == itemIndex) {
          fn(event, lastDirection)
        }
      })
      resizeContent.resizeStartItem.forEach((fn) => {
        if (j++ == itemIndex + 1) {
          fn(event, nextDirection)
        }
      })
      state.isResizing = true
      const { clientX, clientY } = event as MouseEvent
      const lastItem = state.allChildren[index - 1]?.$el,
        nextItem = state.allChildren[index + 1]?.$el

      if (!lastItem || !nextItem) return

      const lastStyle = window.getComputedStyle(lastItem)
      const nextStyle = window.getComputedStyle(nextItem)

      const lastOffset =
        getOffset(lastStyle, props.direction) + state.itemMinusMap.get(itemIndex - 1)!
      const nextOffset = getOffset(nextStyle, props.direction) + state.itemMinusMap.get(itemIndex)!

      const lastItemSize =
          (props.direction === 'horizontal' ? lastItem.offsetWidth : lastItem.offsetHeight) +
          state.itemMinusMap.get(itemIndex - 1)!,
        nextItemSize =
          (props.direction === 'horizontal' ? nextItem.offsetWidth : nextItem.offsetHeight) +
          state.itemMinusMap.get(itemIndex)!

      state.originalPosition = {
        x: clientX,
        y: clientY,
        lastItemSize,
        nextItemSize,
        lastOffset,
        nextOffset
      }
    }
    const handlerResizeEnd = (index: number, itemIndex: number, event: Event) => {
      const [lastDirection, nextDirection] = getItemDirection(props.direction)
      let i = 0
      let j = 0
      resizeContent.resizeEndItem.forEach((fn) => {
        if (i++ == itemIndex) {
          fn(event, lastDirection)
        }
      })
      resizeContent.resizeEndItem.forEach((fn) => {
        if (j++ == itemIndex + 1) {
          fn(event, nextDirection)
        }
      })
      state.isResizing = false
    }
    const handlerResizeChange = (index: number, itemIndex: number, event: MouseEvent) => {
      if (!state.isResizing) return
      //itemIndex是 nextItem的index
      //index是节点的inxde
      const { direction } = props
      const lastItem = state.allChildren[index - 1]?.$el
      const nextItem = state.allChildren[index + 1]?.$el
      if (!lastItem || !nextItem) return
      const lastItemProps = state.allChildren[index - 1]
      const nextItemProps = state.allChildren[index + 1]
      const {
        x: initX,
        y: initY,
        lastItemSize,
        nextItemSize,
        lastOffset,
        nextOffset
      } = state.originalPosition

      const { clientX, clientY } =
        state.mouseType === 'mouse' ? event : (event as unknown as TouchEvent).targetTouches[0]
      const parentRect = state.parentRect
      const parentSize =
        direction === 'horizontal' ? parentRect?.width || 0 : parentRect?.height || 0
      const delta = direction === 'horizontal' ? clientX - initX : clientY - initY
      let lastNewSize = lastItemSize + delta
      let nextNewSize = nextItemSize - delta

      const lastFlag = isOverflow(
          lastNewSize,
          lastItemProps.min,
          lastItemProps.max,
          parentSize,
          lastOffset
        ),
        nextFlag = isOverflow(
          nextNewSize,
          nextItemProps.min,
          nextItemProps.max,
          parentSize,
          nextOffset
        )

      if (lastFlag) {
        lastNewSize = adjustNewSize(
          lastNewSize,
          lastItemProps.min,
          lastItemProps.max,
          parentSize,
          lastOffset
        )
        nextNewSize = lastItemSize + nextItemSize - lastNewSize
      }

      if (nextFlag) {
        nextNewSize = adjustNewSize(
          nextNewSize,
          nextItemProps.min,
          nextItemProps.max,
          parentSize,
          nextOffset
        )
        lastNewSize = lastItemSize + nextItemSize - nextNewSize
      }

      const lastItemPercent = state.itemPercentMap.get(itemIndex - 1)!,
        nextItemPercent = state.itemPercentMap.get(itemIndex)!

      const lastNewPercent = (lastNewSize / parentSize) * 100
      const nextNewPercent = lastItemPercent + nextItemPercent - lastNewPercent // 消除浮点误差
      state.itemPercentMap.set(itemIndex - 1, lastNewPercent)
      state.itemPercentMap.set(itemIndex, nextNewPercent)

      if (direction === 'horizontal') {
        lastItem.style.width = `calc(${lastNewPercent}% - ${state.itemMinusMap.get(itemIndex - 1)}px)`
        nextItem.style.width = `calc(${nextNewPercent}% - ${state.itemMinusMap.get(itemIndex)}px)`
      } else if (direction === 'vertical') {
        lastItem.style.height = `calc(${lastNewPercent}% - ${state.itemMinusMap.get(itemIndex - 1)}px)`
        nextItem.style.height = `calc(${nextNewPercent}% - ${state.itemMinusMap.get(itemIndex)}px)`
      }

      const [lastDirection, nextDirection] = getItemDirection(props.direction)
      const lastRect = lastItem.getBoundingClientRect()
      const lastSize = {
        width: lastRect.width,
        height: lastRect.height
      }
      const nextRect = nextItem.getBoundingClientRect()
      const nextSize = {
        width: nextRect.width,
        height: nextRect.height
      }
      let lastIndex = 0,
        nextIndex = 0
      resizeContent.changeItem.forEach((fn) => {
        if (lastIndex++ == itemIndex) {
          fn(lastSize, event, lastDirection)
        }
      })
      resizeContent.changeItem.forEach((fn) => {
        if (nextIndex++ == itemIndex + 1) {
          fn(nextSize, event, nextDirection)
        }
      })
    }

    const isOverflow = (
      newSize: number,
      min: string,
      max: string,
      parentSize: number,
      offset: number = 0
    ) => {
      min = min ?? '0%'
      max = max ?? '100%'
      const minSize = getPixelSize(min, parentSize)
      const maxSize = getPixelSize(max, parentSize)
      if (newSize < minSize + offset || newSize > maxSize) {
        return true
      }
      return false
    }
    const adjustNewSize = (
      newSize: number,
      min: string,
      max: string,
      parentSize: number,
      offset: number = 0
    ) => {
      min = min ?? '0%'
      max = max ?? '100%'
      const minSize = getPixelSize(min, parentSize)
      const maxSize = getPixelSize(max, parentSize)
      if (newSize < minSize + offset) {
        return minSize + offset
      }
      if (newSize > maxSize) {
        return maxSize
      }
      return newSize
    }
    const getParentSize = () => {
      if (!state.wrapperRef) return null
      const rect = state.wrapperRef.getBoundingClientRect()
      return {
        width: rect.width,
        height: rect.height
      }
    }
    const saveHanderRef = (el: unknown, index: number, allIndex: number) => {
      state.handerChildren[index] = el as ComponentResizeItem
      state.allChildren[allIndex] = el as ComponentResizeItem
    }
    const saveItemRef = (el: unknown, index: number, allIndex: number) => {
      state.itemChildren[index] = el as ComponentResizeItem
      state.allChildren[allIndex] = el as ComponentResizeItem
    }
    const render = () => {
      const vnodes = ctx.slots.default?.()
      const renderChildrenDefault = (item: VNode) => {
        if (isString(item.children) || isArray(item.children)) return item.children
        return (item.children as { default: () => unknown }).default?.()
      }
      let handlrIndex = 0
      let itemIndex = 0
      return vnodes?.map((item: VNode, index: number) => {
        const tempItemIndex = itemIndex
        const tempHandlrIndex = handlrIndex
        let template = null
        if (item.type === ResizeItem) {
          template = createElment(
            item,
            {
              ...item.props,
              ref: (node: unknown) => saveItemRef(node, tempItemIndex, index)
            },
            { default: () => renderChildrenDefault(item) }
          )
          itemIndex++
        }
        if (item.type === ResizeHandler) {
          template = createElment(
            item,
            {
              direction: props.direction,
              ref: (node: unknown) => saveHanderRef(node, tempHandlrIndex, index),
              onResizeStart: (e: MouseEvent) => handlerResizeStart(index, tempItemIndex, e),
              onResizeEnd: (e: MouseEvent) => handlerResizeEnd(index, tempItemIndex, e),
              onChange: (_: unknown, e: MouseEvent) => handlerResizeChange(index, tempItemIndex, e)
            },
            { default: () => renderChildrenDefault(item) }
          )
          handlrIndex++
        }
        return template
      })
    }
    return () => {
      return (
        <div
          class={wrapperClassNames.value}
          ref={(node) => (state.wrapperRef = node as HTMLDivElement)}
        >
          {render()}
        </div>
      )
    }
  },
  name: `${prefix}-resize-group`,
  props: resizableGroupProps
})
export default ResizeGroup
