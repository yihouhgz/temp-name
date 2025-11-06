import { defineComponent, computed, ref, provide } from 'vue'
import { prefix } from 'constants/config'
import './style/layout'
import { commonProps } from './type'
import { isUndefined } from '../_util'
import { provideKey } from './utils'
const Layout = defineComponent({
  setup(props, ctx) {
    const layoutprovider = {
      emitSider() {
        exitSider.value = true
      }
    }
    const exitSider = ref(false)
    const hasSider = computed(() => {
      if (isUndefined(props.hasSider)) {
        return exitSider.value
      }
      return props.hasSider
    })
    const classNames = computed(() => {
      return [
        prefix + '-layout',
        {
          [prefix + '-layout-has-sider']: hasSider.value
        }
      ]
    })
    provide(provideKey, layoutprovider)
    return () => {
      return <section class={classNames.value}>{ctx.slots.default?.()}</section>
    }
  },
  name: prefix + '-layout',
  props: {
    ...commonProps
  }
})
export default Layout
