import { defineComponent, useAttrs, computed } from 'vue'
import { prefix } from 'constants/config'
import { popoverProps, popoverEmits } from './type'
import Tooltip from '../tooltip'
import { isFunction } from '../_util/helps'
import './style/popover'
import type { ExtractPropTypes } from 'vue'
import ArrowHorizontalIcon from './arrow-horizontal-icon'
import ArrowVerticalIcon from './arrow-vertical-icon'

const Popover = defineComponent({
  setup(props, ctx) {
    const spacing = computed(() => {
      const { spacing, showArrow } = props
      if (showArrow && spacing !== 8) {
        return 8
      }
      return spacing
    })
    const allAttrs = useAttrs()
    const ContentWrapper = () => {
      if (isFunction(props.content)) {
        return (
          <div class={`${prefix}-popover`} {...allAttrs}>
            <div class={`${prefix}-popover-content`}>{props.content()}</div>
          </div>
        )
      }
      return (
        <div class={`${prefix}-popover`} {...allAttrs}>
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
    // const handleEscapeKeyDown = () => {}
    return () => {
      return (
        <Tooltip
          {...props}
          spacing={spacing.value}
          content={<ContentWrapper></ContentWrapper>}
          prefixCls={`${prefix}-popover`}
          class={{ [`${prefix}-popover-with-arrow`]: props.showArrow }}
          onClickOutSide={handleTooltipClickOutSide}
          onVisibleChange={handleTooltipVisibleChange}
          _arrow={{
            vertical: <ArrowVerticalIcon></ArrowVerticalIcon>,
            horzontal: <ArrowHorizontalIcon></ArrowHorizontalIcon>
          }}
        >
          {ctx.slots.default?.()}
        </Tooltip>
      )
    }
  },
  inheritAttrs: false,
  name: prefix + '-popover',
  props: popoverProps,
  emits: popoverEmits
})
export type PopoverProps = ExtractPropTypes<typeof popoverProps>
export default Popover
