import { defineComponent, type ExtractPropTypes } from 'vue'
import { prefix } from 'constants/config'
import { popoverProps } from './type'
import Tooltip from '../tooltip'
import { isFunction } from '../_util/helps'
import './style/popover'

const Popover = defineComponent({
  setup(props, ctx) {
    const ContentWrapper = () => {
      if (isFunction(props.content)) {
        return (
          <div class={`${prefix}-popover`}>
            <div class={`${prefix}-popover-content`}>{props.content()}</div>
          </div>
        )
      }
      return (
        <div class={`${prefix}-popover`}>
          <div class={`${prefix}-popover-content`}>{props.content}</div>
        </div>
      )
    }
    return () => {
      return (
        <Tooltip
          {...props}
          content={<ContentWrapper></ContentWrapper>}
          wrapper={`${prefix}-popover-wrapper`}
          clickToHide={false}
        >
          {ctx.slots.default?.()}
        </Tooltip>
      )
    }
  },
  name: prefix + '-popover',
  props: popoverProps
})
export type PopoverProps = ExtractPropTypes<typeof popoverProps>
export default Popover
