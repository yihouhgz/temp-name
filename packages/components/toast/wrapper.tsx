import { defineComponent, reactive, type VNodeRef } from 'vue'
import { wrapperPorpos, type OptionsType } from './type'
import { prefix } from 'constants/config'
import Toast from './toast'
import './style/toast'
import { useRandomId } from '../_util'
import type { Direction } from './implement'

type OptionsTypeBase = OptionsType & { type: string; ref: VNodeRef }
type WrapperStateType = {
  toastPool: Array<OptionsTypeBase>
  zIndex: number
  style: object
  absorptionCloseCallbacks: { [key: string]: () => void }
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
      absorptionCloseCallbacks: {}
    })

    const handleCloseToast = (data: { id: string }) => {
      const { id } = data
      state.toastPool = state.toastPool.filter((item) => item.id !== id)
    }
    ctx.expose({
      add(options: OptionsTypeBase) {
        state.toastPool.push(options)
      },
      remove(toastId: string | number) {
        const data = state.toastPool.find((item) => item.id === toastId)
        if (data) {
          state.absorptionCloseCallbacks[data.id]?.()
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
    return () => {
      return (
        <div
          class={prefix + '-toast-wrapper'}
          id={wrapperId}
          style={{ zIndex: state.zIndex, ...state.style }}
        >
          <div class={`${prefix}-toast-wrapper-inner ${prefix}-toast-wrapper-inner-hover`}>
            {state.toastPool.map((item) => {
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
                ></Toast>
              )
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
