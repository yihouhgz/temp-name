import { defineComponent, inject, ref } from 'vue'
import { prefix } from 'constants/config'
import { provideKey, type provideType } from './utils'
import { isFunction } from '../_util'
import { siderProps, siderEmits } from './type'
import { useEventListener } from '../_util'
import { breakpoint } from './responsive'
const Sider = defineComponent({
  setup(props, ctx) {
    const lastTriggered = ref<boolean | null>(null)
    const parentData = inject<provideType>(provideKey)
    if (isFunction(parentData?.emitSider)) parentData.emitSider()

    useEventListener(window, 'resize', () => {
      const { innerWidth } = window
      const screen = props.breakpoint
      const shouldTrigger = innerWidth > breakpoint[screen as keyof typeof breakpoint]
      if (lastTriggered.value !== shouldTrigger) {
        lastTriggered.value = shouldTrigger
        ctx.emit('breakpoint', screen, shouldTrigger)
      }
    })
    return () => {
      return (
        <aside class={prefix + '-layout-sider'} {...ctx.attrs}>
          {ctx.slots.default?.()}
        </aside>
      )
    }
  },
  props: siderProps,
  emits: siderEmits,
  name: prefix + '-layout-sider'
})
export default Sider
