import { defineComponent, type ExtractPropTypes } from 'vue'
import { prefix } from 'constants/config'
import { popoverProps, popoverEmits } from './type'
import Tooltip from '../tooltip'
import { isFunction } from '../_util/helps'
import './style/popover'
import { computed } from 'vue'

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
    const handleTooltipClickOutSide = (e: Event) => {
      ctx.emit('clickOutSide', e)
    }
    const handleTooltipVisibleChange = (visible: boolean) => {
      ctx.emit('visibleChange', visible)
    }
    const wrapperClassNames = computed(() => {
      return [`${prefix}-popover-wrapper`, props.showArrow ? `${prefix}-popover-with-arrow` : '']
        .filter(Boolean)
        .join(' ')
    })
    return () => {
      return (
        <Tooltip
          {...props}
          content={<ContentWrapper></ContentWrapper>}
          wrapper={wrapperClassNames.value}
          clickToHide={props.clickToHide}
          onClickOutSide={handleTooltipClickOutSide}
          onVisibleChange={handleTooltipVisibleChange}
        >
          {ctx.slots.default?.()}
        </Tooltip>
      )
    }
  },
  name: prefix + '-popover',
  props: popoverProps,
  emits: popoverEmits
})
export type PopoverProps = ExtractPropTypes<typeof popoverProps>
export default Popover
