import { defineComponent } from 'vue'
import { prefix } from 'constants/config'
import './style/tabs'
import { useRandomId } from '../_util'
import { tabsProps, tabsEmits } from './type'
import TabPane from './pane'
const Tabs = defineComponent({
  setup(props, ctx) {
    const dataUUID = useRandomId(10)
    const isJsx = () => !props.tabList.length
    return () => {
      let tablist = props.tabList || []
      const paneTamplate = ctx.slots.default?.()
      if (isJsx()) {
        //收集TabPane props
        if (paneTamplate && paneTamplate.length) {
          tablist = paneTamplate.map((child) => {
            if (child.type === TabPane) {
              return {
                tab: child.props?.tab,
                itemKey: child.props?.itemKey
              }
            }
          })
        }
      }
      return (
        <div class={[prefix + '-tabs']}>
          <div
            role="tablist"
            aria-orientation="horizontal"
            data-uuid={dataUUID}
            class={[prefix + '-tabs-bar']}
          >
            {tablist.map((item, index) => {
              return (
                <div
                  role="tab"
                  id={prefix + 'Tab' + index}
                  data-tabkey={prefix + 'Tab' + index}
                  aria-controls={prefix + 'TabPanel' + index}
                  aria-disabled="false"
                  aria-selected="false"
                  tabindex={-1}
                  class={[]}
                ></div>
              )
            })}
          </div>
          <div class={[prefix + '-tabs-content']}>
            {/* <div
              role="tabpanel"
              id={prefix + 'TabPanel1'}
              aria-labelledby={prefix + 'Tab1'}
              aria-hidden="true"
              tabindex="0"
              class={[prefix + '-tabs-panel']}
            >
              <div></div>
            </div> */}
            {paneTamplate}
          </div>
        </div>
      )
    }
  },
  props: tabsProps,
  emits: tabsEmits,
  name: prefix + '-tabs'
})
export default Tabs
