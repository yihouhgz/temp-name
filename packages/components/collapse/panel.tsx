import { prefix } from 'constants/config'
import { defineComponent, getCurrentInstance, reactive, type ExtractDefaultPropTypes } from 'vue'
import Collapsible from '../collapsible'
import { collapsePanelProps, collapsePanelEmits, collapseProps } from './type'
import { isUndefined, renderElementForPropsOrSlot, useRandomId } from '../_util'
import './style/collapse'
import { IconChevronDown, IconChevronUp } from '../icon'
import { useCollapseInject } from './content'
type CollapsePropsType = ExtractDefaultPropTypes<typeof collapseProps>
type CollapsePanelState = {
  isActive: boolean
  collapseProps: CollapsePropsType
  clickHeaderToExpand: boolean
  expandIconPosition: 'left' | 'right'
}
const CollapsePanel = defineComponent({
  setup(props, ctx) {
    const state = reactive<CollapsePanelState>({
      isActive: false,
      collapseProps: {} as CollapsePropsType,
      clickHeaderToExpand: true,
      expandIconPosition: 'right'
    })
    const id = useRandomId(7)
    const instance = getCurrentInstance()
    const context = useCollapseInject()
    if (context) {
      const { getProps, includes, closeMap } = context
      const pProps = getProps()
      state.collapseProps = pProps
      state.clickHeaderToExpand = pProps.clickHeaderToExpand
      state.expandIconPosition = pProps.expandIconPosition
      state.isActive = includes(props.itemKey)
      closeMap.set(props.itemKey, (flag?: boolean) => {
        if (isUndefined(flag)) {
          state.isActive = false
        } else {
          state.isActive = flag
        }
      })
    }
    const handleClick = (e: Event) => {
      if (props.disabled) {
        return
      }
      if (!state.collapseProps.activeKey) {
        state.isActive = !state.isActive
      }
      if (context) {
        context.change(props.itemKey, e)
      }
    }

    return () => {
      const clickHeaderToExpand = state.clickHeaderToExpand
      const icon = () => {
        let i = null
        if (props.showArrow) {
          if (!state.isActive) {
            const icon = context?.getCollapseIcon()
            i = icon ? icon : <IconChevronDown></IconChevronDown>
          } else {
            const icon = context?.getExpandIcon()
            i = icon ? icon : <IconChevronUp></IconChevronUp>
          }
        }
        return (
          <span
            aria-hidden="true"
            class={[
              prefix + '-collapse-header-icon',
              state.expandIconPosition === 'left' && prefix + '-collapse-header-left-icon'
            ]}
            {...(!clickHeaderToExpand ? { onClick: handleClick } : {})}
          >
            {i}
          </span>
        )
      }
      const collapsibleProps: Partial<
        Pick<CollapsePropsType, 'keepDOM' | 'lazyRender' | 'motion'>
      > = {}
      if (isUndefined(state.collapseProps.keepDOM)) {
        collapsibleProps.keepDOM = state.collapseProps.keepDOM
      }
      if (isUndefined(state.collapseProps.lazyRender)) {
        collapsibleProps.lazyRender = state.collapseProps.lazyRender
      }
      if (isUndefined(state.collapseProps.motion)) {
        collapsibleProps.motion = state.collapseProps.motion
      }
      return (
        <div class={prefix + '-collapse-item'}>
          <div
            role="button"
            tabindex="0"
            aria-expanded={state.isActive}
            aria-disabled={props.disabled}
            aria-owns={id}
            class={[
              prefix + '-collapse-header',
              props.disabled && prefix + '-collapse-header-disabled',
              state.expandIconPosition === 'left' && prefix + '-collapse-header-leftIcon'
            ]}
            {...(clickHeaderToExpand ? { onClick: handleClick } : {})}
          >
            {state.expandIconPosition === 'left' && icon()}
            <span>{renderElementForPropsOrSlot('header', instance)}</span>
            <span class={prefix + '-collapse-header-right'}>
              <span class={prefix + '-collapse-header-extra'}>
                {renderElementForPropsOrSlot('extra', instance)}
              </span>
              {state.expandIconPosition === 'right' && icon()}
            </span>
          </div>
          <Collapsible
            {...collapsibleProps}
            isOpen={state.isActive}
            reCalcKey={props.reCalcKey}
            onMotionStart={() => {
              ctx.emit('motionStart')
            }}
            onMotionEnd={() => {
              ctx.emit('motionEnd')
            }}
          >
            <div class={prefix + '-collapse-content'} aria-hidden="false" id={id}>
              <div class={prefix + '-collapse-content-wrapper'}>{ctx.slots.default?.()}</div>
            </div>
          </Collapsible>
        </div>
      )
    }
  },
  props: collapsePanelProps,
  emits: collapsePanelEmits,
  name: prefix + '-collapse-panel'
})
export default CollapsePanel
