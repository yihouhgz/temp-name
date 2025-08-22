import { defineComponent } from 'vue'
import { prefix } from 'constants/config'
import { popoverProps } from './type'
import Tooltip from '../tooltip'
import { isFunction } from '../_util/helps'
import './style/popover'

const Popover = defineComponent(
  (props, ctx) => {
    const ContentWrapper = () => {
      if (isFunction(props.content)) {
        return (
          <div class={`tempui-popover`}>
            <div class="tempui-popover-content">{props.content()}</div>
          </div>
        )
      }
      return (
        <div class="tempui-popover">
          <div class="tempui-popover-content">{props.content}</div>
        </div>
      )
    }
    return () => {
      return (
        <Tooltip
          {...props}
          content={<ContentWrapper></ContentWrapper>}
          wrapper="tempui-popover-wrapper"
          clickToHide={false}
        >
          {ctx.slots.default?.()}
        </Tooltip>
      )
    }
  },
  { name: prefix + '-popover', props: popoverProps }
)

export default Popover
