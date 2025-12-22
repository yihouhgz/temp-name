import { prefix } from 'constants/config'
import { defineComponent, getCurrentInstance } from 'vue'
import Collapsible from '../collapsible'
import { collapsePanelProps, collapsePanelEmits } from './type'
import { renderElementForPropsOrSlot, useRandomId } from '../_util'

const CollapsePanel = defineComponent({
  setup(props, ctx) {
    const instance = getCurrentInstance()
    const id = useRandomId(7)
    return () => {
      return (
        <div class={prefix + '-collapse-item'}>
          <div
            role="button"
            tabindex="0"
            aria-disabled="true"
            aria-expanded="false"
            aria-owns={id}
            class={prefix + '-collapse-header'}
          >
            <span>{renderElementForPropsOrSlot('header', instance)}</span>
            <span class={`${prefix}-collapse-header-right`}></span>
          </div>
          <Collapsible>
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
