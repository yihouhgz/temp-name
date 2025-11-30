import {
  defineComponent,
  computed,
  reactive,
  onMounted,
  effectScope,
  watchEffect,
  h,
  getCurrentInstance
} from 'vue'
import type { StyleValue } from 'vue'
import { prefix } from 'constants/config'
import { resizableProps, resizableEmits } from './type'
import type { Size } from './type'
import './style/resizable'
import { direction } from './constant'
import {
  hasPropsOrSlots,
  isArray,
  isBoolean,
  isNumber,
  isString,
  renderElementForPropsOrSlot,
  useEventListener
} from '../_util'
type DirectionKeys = (typeof direction)[number]
type StateType = {
  handlerRefNodes: Record<DirectionKeys, HTMLElement | null>
  current: {
    isDrag: boolean
    direction: DirectionKeys | null
  }
  size: Size
  wrapperRef: HTMLElement | null
  aspectRatio: number
}
const Resizable = defineComponent({
  setup(props, ctx) {
    const state = reactive<StateType>({
      handlerRefNodes: direction.reduce(
        (acc, cur) => {
          acc[cur] = null
          return acc
        },
        {} as Record<DirectionKeys, HTMLElement | null>
      ),
      current: {
        isDrag: false,
        direction: null
      },
      size: {
        width: 'auto',
        height: 'auto'
      },
      aspectRatio: 0, //lockAspectRatio true生效
      wrapperRef: null
    })
    watchEffect(() => {
      const { size, defaultSize } = props
      if (defaultSize.width || defaultSize.height) {
        state.size = {
          width: defaultSize.width!,
          height: defaultSize.height!
        }
      }
      if (size.width || size.height) {
        state.size = {
          width: size.width!,
          height: size.height!
        }
      }
    })
    watchEffect(() => {
      const { lockAspectRatio } = props
      const { wrapperRef } = state
      if (isBoolean(lockAspectRatio) && lockAspectRatio) {
        const rect = wrapperRef?.getBoundingClientRect()
        if (!rect) return
        state.aspectRatio = rect.width / rect.height
      } else if (isNumber(lockAspectRatio)) {
        state.aspectRatio = lockAspectRatio
      }
    })
    const wrapperClass = computed(() => {
      return [prefix + '-resizable']
    })
    const wrapperStyle = computed<StyleValue>(() => {
      const width = isNumber(state.size.width) ? state.size.width + 'px' : state.size.width
      const height = isNumber(state.size.height) ? state.size.height + 'px' : state.size.height
      const style: StyleValue = {
        width,
        height,
        userSelect: state.current.isDrag ? 'none' : 'auto'
      }
      const sizeList = ['maxWidth', 'maxHeight', 'minWidth', 'minHeight'] as const
      for (const value of sizeList) {
        const key = value
        if (props[key]) {
          style[value] = includeUnit(props[key].toString()) ? props[key] : props[key] + 'px'
        }
      }
      return style
    })

    const updateTargetSizeWrap = (e: MouseEvent, direction?: DirectionKeys) => {
      // 根据方向调整尺寸
      const dir = direction || state.current.direction!
      switch (dir) {
        case 'left':
          // 向左拖动，宽度减少 movementX
          updateTargetSize(
            'left',
            ['width'],
            {
              width: -e.movementX
            },
            e
          )
          break
        case 'right':
          // 向右拖动，宽度增加 movementX
          updateTargetSize(
            'right',
            ['width'],
            {
              width: e.movementX
            },
            e
          )
          break
        case 'top':
          // 向上拖动，高度减少 movementY
          updateTargetSize(
            'top',
            ['height'],
            {
              height: -e.movementY
            },
            e
          )
          break
        case 'bottom':
          // 向下拖动，高度增加 movementY
          updateTargetSize(
            'bottom',
            ['height'],
            {
              height: +e.movementY
            },
            e
          )
          break
        case 'bottomLeft':
          // 向左下拖动，宽度减少 movementX，高度增加 movementY
          updateTargetSize(
            'bottomLeft',
            ['width', 'height'],
            {
              width: -e.movementX,
              height: e.movementY
            },
            e
          )
          // updateTargetSize('bottomLeft', ['height'], e.movementY, e)
          break
        case 'bottomRight':
          // 向右下拖动，宽度增加 movementX，高度增加 movementY
          updateTargetSize(
            'bottomRight',
            ['width', 'height'],
            {
              width: e.movementX,
              height: e.movementY
            },
            e
          )
          // updateTargetSize('bottomRight', ['height'], e.movementY, e)
          break
        case 'topLeft':
          // 向左上拖动，宽度减少 movementX，高度减少 movementY
          updateTargetSize(
            'topLeft',
            ['width', 'height'],
            {
              width: -e.movementX,
              height: -e.movementY
            },
            e
          )
          // updateTargetSize('topLeft', ['height'], -e.movementY, e)
          break
        case 'topRight':
          // 向右上拖动，宽度增加 movementX，高度减少 movementY
          updateTargetSize(
            'topRight',
            ['width', 'height'],
            {
              width: e.movementX,
              height: -e.movementY
            },
            e
          )
          // updateTargetSize('topRight', ['height'], -e.movementY, e)
          break
      }
    }

    const eventHandleScope = effectScope()
    const initEventHandle = () => {
      eventHandleScope.run(() => {
        for (const key in state.handlerRefNodes) {
          const handler = state.handlerRefNodes[key as keyof typeof state.handlerRefNodes]
          useEventListener(handler, 'mousedown', (e) => {
            state.current.isDrag = true
            state.current.direction = key as DirectionKeys
            ctx.emit('resizeStart', e, state.current.direction!)
          })
        }
        useEventListener(window, 'mousemove', (e) => {
          if (state.current.isDrag) {
            updateTargetSizeWrap(e)
          }
        })
        useEventListener(window, 'mouseup', (e) => {
          if (state.current.isDrag) {
            ctx.emit('resizeEnd', e, state.current.direction!)
            state.current.isDrag = false
            state.current.direction = null
          }
        })
      })
    }
    const splitMultipleValues = (value: string): [number, string] => {
      const match = value.match(/^([\d.]+)(\D+)$/)
      return match ? [parseFloat(match[1]), match[2]] : [parseFloat(value), '']
    }
    const getCalcDeterminedValue = (rectValue: number, currentValue: number, offset: number) => {
      const determinedValue = currentValue / rectValue
      return determinedValue * offset + currentValue
    }
    const includeUnit = (value: string) => {
      const includeUnits = ['vw', 'vh', '%', 'px']
      for (const unit of includeUnits) {
        if (value.includes(unit)) {
          return true
        }
      }
    }
    const isOverflowElmentSize = (width: number, height: number) => {
      let sWidth = window.visualViewport?.width || 0
      let sHeight = window.visualViewport?.height || 0
      if (props.boundElement === 'parent') {
        const rect = state.wrapperRef?.parentElement?.getBoundingClientRect()
        sWidth = rect?.width || 0
        sHeight = rect?.height || 0
      }
      return width > sWidth || height > sHeight
    }
    const isOverflowSize = (width: number, height: number) => {
      const map = ['maxWidth', 'maxHeight', 'minWidth', 'minHeight'] as const
      for (const key of map) {
        if (!props[key]) return false
        if (isString(props[key]) && includeUnit(props[key])) {
          // vw/vh/%/px
          const [value, unit] = splitMultipleValues(props[key])
          if (unit === 'px') {
            if (key === 'maxWidth' && value < width) return true
            if (key === 'maxHeight' && value < height) return true
            if (key === 'minWidth' && value > width) return true
            if (key === 'minHeight' && value > height) return true
          }
          if (unit === '%') {
            const rect = state.wrapperRef?.parentElement?.getBoundingClientRect()
            const parentWidth = rect?.width || 0
            const parentHeight = rect?.height || 0
            if (key === 'maxWidth' && parentWidth * (value / 100) < width) return true
            if (key === 'maxHeight' && parentHeight * (value / 100) < height) return true
            if (key === 'minWidth' && parentWidth * (value / 100) > width) return true
            if (key === 'minHeight' && parentHeight * (value / 100) > height) return true
          }
          if (unit === 'vw') {
            const visualViewportWidth = window.visualViewport?.width || window.innerWidth
            if (visualViewportWidth && visualViewportWidth > 0) {
              if (key === 'maxWidth' && visualViewportWidth * (value / 100) < width) return true
              if (key === 'maxHeight' && visualViewportWidth * (value / 100) < height) return true
              if (key === 'minWidth' && visualViewportWidth * (value / 100) > width) return true
              if (key === 'minHeight' && visualViewportWidth * (value / 100) > height) return true
            }
          }
          if (unit === 'vh') {
            const visualViewportHeight = window.visualViewport?.height || window.innerHeight
            if (visualViewportHeight && visualViewportHeight > 0) {
              if (key === 'maxWidth' && visualViewportHeight * (value / 100) < width) return true
              if (key === 'maxHeight' && visualViewportHeight * (value / 100) < height) return true
              if (key === 'minWidth' && visualViewportHeight * (value / 100) > width) return true
              if (key === 'minHeight' && visualViewportHeight * (value / 100) > height) return true
            }
          }
        } else {
          const value = Number(props[key])
          if (key === 'maxHeight' && value < height) return true
          if (key === 'maxWidth' && value < width) return true
          if (key === 'minHeight' && value > height) return true
          if (key === 'minWidth' && value > width) return true
        }
      }
      return false
    }
    const quantizeAndSnap = ({
      key,
      delta, // 已做 scale/ratio 补偿后的逻辑偏移
      current //当前像素宽/高
    }: {
      key: 'width' | 'height'
      delta: number
      current: number
    }) => {
      const { snap, snapGap } = props
      const grid = isArray(props.grid) ? props.grid : [props.grid, props.grid]
      const step = key === 'width' ? (grid?.[0] ?? 1) : (grid?.[1] ?? 1)
      if (step > 1) {
        delta = Math.round(delta / step) * step
      }
      const targets = key === 'width' ? (snap?.x ?? []) : (snap?.y ?? [])
      if (isArray(targets) && targets.length) {
        const candidate = current + delta
        let nearest: number | undefined
        let minDist = Infinity
        for (const t of targets) {
          const d = Math.abs(candidate - t)
          if (d < minDist) {
            minDist = d
            nearest = t
          }
        }
        if (nearest != null && minDist <= (snapGap ?? 0)) {
          delta += nearest - candidate
        }
      }
      return delta
    }
    const updateTargetSize = (
      direction: DirectionKeys,
      keys: ('width' | 'height')[],
      offsets: Partial<Record<'width' | 'height', number>>,
      event: Event
    ) => {
      const result = []
      const rect = state.wrapperRef?.getBoundingClientRect()
      if (!rect) return
      for (const key of keys) {
        if (offsets[key]) {
          offsets[key] = (offsets[key] / props.scale) * props.ratio
          //todo 待实现
          quantizeAndSnap({
            key,
            delta: offsets[key],
            current: rect[key]
          })
        }
        const offset = offsets[key] || 0
        const originValue = state.size[key]
        if (isString(originValue)) {
          // vw/vh/%/auto
          if (originValue === 'auto') {
            state.size[key] = rect[key] + offset
          } else {
            const [value, unit] = splitMultipleValues(originValue)
            let setValue = 0
            const target = rect[key]
            switch (unit) {
              case 'vw':
                setValue = getCalcDeterminedValue(target, value, offset)
                break
              case 'vh':
                setValue = getCalcDeterminedValue(target, value, offset)
                break
              case '%':
                setValue = getCalcDeterminedValue(target, value, offset)
                break
            }
            // state.size[key] = (setValue + unit) as Size['height']
            result.push({
              key,
              value: setValue + unit,
              setValue: setValue,
              unit: unit,
              original: target + offset
            })
          }
        } else if (isNumber(offset) && isNumber(originValue)) {
          result.push({
            key,
            value: offset + originValue,
            setValue: offset + originValue,
            unit: undefined,
            original: offset + originValue
          })
        }
      }

      let width = rect.width
      let height = rect.height
      for (const item of result) {
        if (item.key === 'width') width = item.original
        else height = item.original
      }
      if (isOverflowElmentSize(width, height)) return
      if (isOverflowSize(width, height)) return

      for (const item of result) {
        if (props.lockAspectRatio) {
          const changeKey = item.key === 'width' ? 'height' : 'width'
          const original =
            changeKey === 'height'
              ? item.original / state.aspectRatio
              : item.original * state.aspectRatio
          if (isNumber(state.size[changeKey])) {
            state.size[changeKey] = original
          } else {
            const calcValue = getCalcDeterminedValue(original, rect[changeKey], 0)
            state.size[changeKey] = calcValue
          }
        }
        state.size[item.key] = item.value as Size['height' | 'width']
      }
      ctx.emit('change', state.size, event, direction)
    }
    onMounted(() => {
      initEventHandle()
    })
    const getEnable = (direction: DirectionKeys) => {
      const value = props.enable[direction]
      return value !== false
    }
    const instance = getCurrentInstance()
    const renderHander = (direction: DirectionKeys) => {
      let vnode = null
      if (props.handleNode[direction]) {
        vnode = h(props.handleNode[direction], {
          class: props.handleClass[direction],
          style: props.handleStyle[direction]
        })
      } else if (hasPropsOrSlots(direction, instance)) {
        vnode = renderElementForPropsOrSlot(direction, instance)
      }
      return vnode
    }

    const enableDirections = computed(() => {
      const template = []
      const { handlerRefNodes } = state
      const { enable } = props
      for (const node of direction) {
        const direction = node
        if (enable && getEnable(node)) {
          template.push(
            <div
              ref={(node) => (handlerRefNodes[direction] = node as HTMLElement)}
              class={prefix + '-resizable-handle ' + prefix + '-resizable-handle-' + direction}
            >
              {renderHander(direction)}
            </div>
          )
        }
      }
      return template
    })
    return () => {
      return (
        <div
          class={wrapperClass.value}
          style={wrapperStyle.value}
          ref={(node) => (state.wrapperRef = node as HTMLElement)}
        >
          {ctx.slots.default?.()}
          {enableDirections.value.length ? <div>{enableDirections.value}</div> : null}
        </div>
      )
    }
  },
  name: prefix + '-resizable',
  props: resizableProps,
  emits: resizableEmits
})
export default Resizable
