import { defineComponent } from 'vue'
import { prefix } from 'constants/config'
import './style/notification'
import Notification from './notification'
import type { NotificationType, OptionsType } from './type'
import { reactive } from 'vue'

export type OptionsTypeProps = OptionsType & { type: NotificationType }
export type WrapperAdapter = {
  udpateNotification: (options: OptionsTypeProps) => void
}
type StateType = {
  topRight: OptionsTypeProps[]
}
const Wrapper = defineComponent({
  setup(props, ctx) {
    const state = reactive<StateType>({
      topRight: []
    })
    ctx.expose({
      udpateNotification: (options: OptionsTypeProps) => {
        console.log(options, 'udpateNotificationList')
        state.topRight.push(options)
      }
    })
    const renderTopRight = () => {
      return state.topRight.map((item) => {
        console.log(item, 'item')
        return <Notification {...item}></Notification>
      })
    }
    return () => {
      return (
        <div class={`${prefix}-notification-wrapper`}>
          <div class={`${prefix}-notification-list ${prefix}-notification-list-placement-topRight`}>
            {renderTopRight()}
          </div>
        </div>
      )
    }
  },
  name: `${prefix}-notification-wrapper`
})
export default Wrapper
