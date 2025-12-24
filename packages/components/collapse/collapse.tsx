import { prefix } from 'constants/config'
import { defineComponent, reactive } from 'vue'
import './style/collapse'
import { useCollapseProvide } from './content'

const Collapse = defineComponent({
  setup(props, ctx) {
    const state = reactive({
      activeKey: []
    })
    const provideContent = {
      change: (activeKey: string, e: Event) => {
        console.log(state, 'state')
        ctx.emit('change', activeKey, e)
      }
    }
    useCollapseProvide(provideContent)
    return () => {
      return <div class={prefix + '-collapse'}>{ctx.slots.default?.()}</div>
    }
  },
  name: prefix + '-collapse'
})
export default Collapse
