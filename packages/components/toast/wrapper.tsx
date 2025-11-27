import { defineComponent, reactive } from 'vue'
import { ToastType, wrapperPorpos, type OptionsTypeBase } from './type'
import { prefix } from 'constants/config'
import Toast from './toast'
import './style/toast'
import { isFunction, useRandomId } from '../_util'
import type { Direction } from './implement'
import type { StyleValue } from 'vue'

type WrapperStateType = {
  toastPool: Array<OptionsTypeBase>
  zIndex: number
  style: object
  absorptionCloseCallbacks: { [key: string]: () => void }
  stack: boolean
  isHover: boolean
  height: { height: number; id: string | number }[]
}
const Wrapper = defineComponent({
  setup(props, ctx) {
    let id = props.id
    if (!id) id = useRandomId()
    const wrapperId = 'toast-wrapper-' + id
    const state = reactive<WrapperStateType>({
      toastPool: [],
      zIndex: props.zIndex,
      style: {},
      absorptionCloseCallbacks: {},
      stack: false,
      isHover: false,
      height: []
    })

    const handleCloseToast = (data: { id: string }) => {
      const { id } = data
      const index = state.toastPool.findIndex((item) => item.id === id)
      const toast = state.toastPool[index]
      if (isFunction(toast.onClose)) toast.onClose()
      state.toastPool.splice(index, 1)
    }
    ctx.expose({
      add(options: OptionsTypeBase) {
        if (options.stack !== state.stack) {
          state.stack = options.stack
        }
        state.toastPool.push(options)
      },
      update(options: OptionsTypeBase) {
        const { id } = options
        const index = state.toastPool.findIndex((item) => item.id === id)
        state.toastPool[index] = options
        if (options.stack !== state.stack) {
          state.stack = options.stack
        }
      },
      remove(toastId: string | number) {
        const data = state.toastPool.find((item) => item.id === toastId)
        if (data) {
          state.absorptionCloseCallbacks[data.id]?.()
        }
      },
      destroyAll() {
        for (const item in state.absorptionCloseCallbacks) {
          state.absorptionCloseCallbacks[item]?.()
        }
      },
      setZIndex(index: number) {
        state.zIndex = index
      },
      setStyle(style: Direction) {
        const tStyle: { [key: string]: string } = {}
        for (const key in style) {
          tStyle[key] = style[key] + 'px'
        }
        state.style = tStyle
      }
    })
    //吸收Toast组件的关闭方法
    const handleAbsorptionCloseCallback = (data: { key: string; close: () => void }) => {
      const { key, close } = data
      state.absorptionCloseCallbacks[key] = close
    }
    const handleMouseenter = () => {
      state.isHover = true
    }
    const handleMouseleave = () => {
      state.isHover = false
    }
    const handleToastMouseenter = (data: OptionsTypeBase) => {
      props?.onStop(data)
    }
    const handleToastonMouseenter = (data: OptionsTypeBase) => {
      props?.onStart(data)
    }
    const handleHeightChange = ({ height, id }: { height: number; id: string | number }) => {
      const index = state.height.findIndex((item) => item.id === id)
      if (index >= 0) {
        state.height[index] = { height, id }
      } else {
        state.height.push({ height, id })
      }
    }
    return () => {
      const renderToast = (item: OptionsTypeBase, index: number) => {
        const style: StyleValue = {}
        if (state.stack && !state.isHover) {
          const length = state.toastPool.length - 1
          const z = (length - index) * 10
          style.transform = `translate3d(0px, 0px, -${z}px)`
        }
        return (
          <Toast
            onHeightChange={(height: number) => handleHeightChange({ height, id: item.id })}
            style={style}
            onCloseCallback_={handleAbsorptionCloseCallback}
            key={item.id}
            content={item.content}
            id={item.id}
            type={item.type as ToastType}
            onClose={handleCloseToast}
            icon={item.icon}
            showClose={item.showClose}
            textMaxWidth={item.textMaxWidth}
            theme={item.theme}
            onMouseenter={() => handleToastMouseenter(item)}
            onMouseleave={() => handleToastonMouseenter(item)}
          ></Toast>
        )
      }
      const getHeightStyle = (id: string | number) => {
        const innerHeightStyle: StyleValue = { height: '0px' }
        if (state.stack && state.isHover) {
          const data = state.height.find((t) => t.id === id)
          if (data) {
            innerHeightStyle.height = `${data.height}px`
          }
        }
        return innerHeightStyle
      }
      return (
        <div
          onMouseenter={handleMouseenter}
          onMouseleave={handleMouseleave}
          class={[
            prefix + '-toast-wrapper',
            { [prefix + '-toast-wrapper-hover']: state.isHover && state.stack }
          ]}
          id={wrapperId}
          style={{ zIndex: state.zIndex, ...state.style }}
        >
          <div class={`${prefix}-toast-wrapper-inner`}>
            {state.toastPool.map((item, index) => {
              if (state.stack) {
                return (
                  <div
                    class={`${prefix}-toast-zero-height-wrapper`}
                    key={item.id}
                    style={getHeightStyle(item.id)}
                  >
                    {renderToast(item, index)}
                  </div>
                )
              }
              return renderToast(item, index)
            })}
          </div>
        </div>
      )
    }
  },
  props: wrapperPorpos,
  name: prefix + '-toast-wrapper'
})
export default Wrapper
