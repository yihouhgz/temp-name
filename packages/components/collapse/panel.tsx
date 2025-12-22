import { prefix } from 'constants/config'
import { defineComponent } from 'vue'
import Collapsible from '../collapsible'
import { collapseProps, collapseEmits } from './type'
import { useRandomId } from '../_util'

const CollapsePanel = defineComponent({
  setup(props, ctx) {
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
          ></div>
          <Collapsible>
            <div class={prefix + '-collapse-content'} aria-hidden="false" id={id}>
              <div class={prefix + '-collapse-content-wrapper'}>{ctx.slots.default?.()}</div>
            </div>
          </Collapsible>
        </div>
      )
    }
  },
  collapseProps,
  collapseEmits,
  name: prefix + '-collapse-panel'
})
export default CollapsePanel
