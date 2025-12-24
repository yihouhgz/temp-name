import { prefix } from 'constants/config'
import { defineComponent, getCurrentInstance, reactive } from 'vue'
import Collapsible from '../collapsible'
import { collapsePanelProps, collapsePanelEmits } from './type'
import { renderElementForPropsOrSlot, useRandomId } from '../_util'
import './style/collapse'
import { IconChevronDown, IconChevronUp } from '../icon'
import { useCollapseInject } from './content'

const CollapsePanel = defineComponent({
  setup(props, ctx) {
    const id = useRandomId(7)
    const instance = getCurrentInstance()
    const context = useCollapseInject()
    console.log(context)
    const state = reactive({
      isActive: false
    })
    const handleClick = () => {
      if (props.disabled) {
        return
      }
      state.isActive = !state.isActive
    }

    return () => {
      const icon = () => {
        if (props.showArrow) {
          return state.isActive ? (
            <IconChevronUp></IconChevronUp>
          ) : (
            <IconChevronDown></IconChevronDown>
          )
        }
        return null
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
              props.disabled && prefix + '-collapse-header-disabled'
            ]}
            onClick={handleClick}
          >
            <span>{renderElementForPropsOrSlot('header', instance)}</span>
            <span class={prefix + '-collapse-header-right'}>
              <span class={prefix + '-collapse-header-extra'}>
                {renderElementForPropsOrSlot('extra', instance)}
              </span>
              <span aria-hidden="true" class={prefix + '-collapse-header-icon'}>
                {icon()}
              </span>
            </span>
          </div>
          <Collapsible
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
