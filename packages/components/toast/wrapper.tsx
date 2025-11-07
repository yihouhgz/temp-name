import { defineComponent, reactive } from 'vue'
import { wrapperPorpos, type OptionsType, type ConfigType } from './type'
import { prefix } from 'constants/config'
import Toast from './toast'
import './style/toast'
import { isFunction, useRandomId } from '../_util'
import type { Direction } from './implement'

type OptionsTypeBase = OptionsType & { type: string; theme: ConfigType['theme'] }
type WrapperStateType = {
  toastPool: Array<OptionsTypeBase>
  zIndex: number
  style: object
  absorptionCloseCallbacks: { [key: string]: () => void }
  stack: boolean
  isHover: boolean
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
      isHover: false
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
    return () => {
      const renderToast = (item: OptionsTypeBase) => {
        return (
          <Toast
            onCloseCallback_={handleAbsorptionCloseCallback}
            key={item.id}
            content={item.content}
            id={item.id}
            type={item.type}
            onClose={handleCloseToast}
            icon={item.icon}
            showClose={item.showClose}
            textMaxWidth={item.textMaxWidth}
            theme={item.theme}
          ></Toast>
        )
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
            {state.toastPool.map((item) => {
              if (state.stack) {
                return (
                  <div class={`${prefix}-toast-zero-height-wrapper`} key={item.id}>
                    {renderToast(item)}
                  </div>
                )
              }
              return renderToast(item)
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
