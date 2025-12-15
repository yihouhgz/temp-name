import { defineComponent } from 'vue'
import { prefix } from 'constants/config'
import './style/notification'
import Notification from './notification'
import type { NotificationType, OptionsType, Position, ConfigOptiosnType } from './type'
import { reactive } from 'vue'
import { useProvideNotification } from './content'
import { strings } from './constants'
import type { StyleValue } from 'vue'
import { isNumber, isUndefined } from '../_util'

export type OptionsTypeProps = OptionsType & { type: NotificationType; id: string | number }
export type WrapperAdapter = {
  udpateNotification: (options: OptionsTypeProps) => void
  updateConfig: (config: ConfigOptiosnType) => void
  close(id: string | number): void
}
type StateType = {
  config: ConfigOptiosnType
  topRight: OptionsTypeProps[]
  optionsList: OptionsTypeProps[]
  closeMap: Map<string | number, () => void>
  setTimeOutMap: Map<
    string | number,
    {
      triggerSetTimeout: () => void
      clear: () => void
    }
  >
}
const Wrapper = defineComponent({
  setup(props, ctx) {
    const state = reactive<StateType>({
      config: {},
      topRight: [],
      optionsList: [],
      closeMap: new Map(),
      setTimeOutMap: new Map()
    })
    useProvideNotification({
      closeMap: state.closeMap,
      setTimeOutMap: state.setTimeOutMap
    })
    ctx.expose({
      updateConfig(config: ConfigOptiosnType) {
        state.config = config
      },
      close(id: string) {
        state.closeMap.get(id)?.()
        state.closeMap.delete(id)
        state.setTimeOutMap.get(id)?.clear()
        state.setTimeOutMap.delete(id)
      },
      udpateNotification: (options: OptionsTypeProps) => {
        const index = state.optionsList.findIndex((item) => item.id === options.id)
        if (index === -1) {
          state.optionsList.push(options)
        } else {
          const closeData = state.setTimeOutMap.get(options.id)
          if (closeData) {
            closeData.clear()
            closeData.triggerSetTimeout()
            state.setTimeOutMap.delete(options.id)
          }
          state.optionsList[index] = {
            ...options
          }
        }
      }
    })
    const handleRemoveNotification = (data: OptionsTypeProps) => {
      const closeId = data.id
      state.optionsList = state.optionsList.filter((t) => t.id !== closeId)
      state.closeMap.delete(String(closeId))
      state.setTimeOutMap.get(String(closeId))?.clear()
      state.setTimeOutMap.delete(String(closeId))
      data.onClose?.()
    }
    const renderNotification = () => {
      const keys = Object.keys(strings.position) as Position[]
      const templates: unknown[] = []
      keys.forEach((key) => {
        const list = state.optionsList.filter((t) => t.position === key)
        const childs = list.map((item) => {
          const { id, ...rest } = item
          return (
            <Notification
              key={id}
              closeId={id}
              {...rest}
              onClose={() => handleRemoveNotification(item)}
              onCloseClick={() => item.onCloseClick?.(id)}
              onClick={(e) => item.onClick?.(e)}
            ></Notification>
          )
        })
        let nodes = null
        if (childs.length) {
          const style: StyleValue & { [key: string]: unknown } = {}
          const { bottom, top, right, left } = state.config
          Object.entries({ bottom, top, right, left }).forEach(([key, value]) => {
            if (!isUndefined(value)) {
              if (isNumber(value)) value = `${value}px`
              style[key] = value
            }
          })
          nodes = (
            <div
              style={style}
              class={`${prefix}-notification-list ${prefix}-notification-list-placement-${key}`}
            >
              {childs}
            </div>
          )
        }
        templates.push(nodes)
      })
      return templates
    }
    return () => {
      return <div class={`${prefix}-notification-wrapper`}>{renderNotification()}</div>
    }
  },
  name: `${prefix}-notification-wrapper`
})
export default Wrapper
