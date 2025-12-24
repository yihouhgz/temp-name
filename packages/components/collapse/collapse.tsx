import { prefix } from 'constants/config'
import { defineComponent, reactive } from 'vue'
import './style/collapse'
import { useCollapseProvide } from './content'
import { collapseProps, collapseEmits } from './type'
import { isArray, isUndefined, renderElementForPropsOrSlot } from '../_util'
import { watchEffect } from 'vue'
import { getCurrentInstance } from 'vue'
import type { VueNode } from '../_util/type'

type CollapseState = {
  activeKey: string[]
  closeMap: Map<string, () => void>
}
const Collapse = defineComponent({
  setup(props, ctx) {
    const instance = getCurrentInstance()
    const getActiveKeyValue = (activeKey: unknown) => {
      if (isArray(activeKey)) return activeKey
      if (activeKey) return [activeKey]
      return []
    }
    const state = reactive<CollapseState>({
      activeKey: getActiveKeyValue(props.defaultActiveKey),
      closeMap: new Map()
    })
    watchEffect(() => {
      const { activeKey } = props
      if (activeKey) {
        state.activeKey = getActiveKeyValue(activeKey)
      }
    })
    const provideContent = {
      change: (activeKey: string, e: Event) => {
        if (props.accordion) {
          state.activeKey = []
          state.closeMap.forEach((closeFn, key) => {
            if (activeKey !== key) closeFn()
          })
        }
        if (isUndefined(props.activeKey)) {
          state.activeKey.push(activeKey)
          ctx.emit('change', state.activeKey, e)
        } else {
          ctx.emit('change', [...state.activeKey, activeKey], e)
        }
      },
      getProps() {
        return props
      },
      includes(key: string) {
        return state.activeKey.includes(key)
      },
      getCollapseIcon() {
        return renderElementForPropsOrSlot('collapseIcon', instance) as VueNode
      },
      getExpandIcon() {
        return renderElementForPropsOrSlot('expandIcon', instance) as VueNode
      },
      closeMap: state.closeMap
    }
    useCollapseProvide(provideContent)
    return () => {
      return <div class={prefix + '-collapse'}>{ctx.slots.default?.()}</div>
    }
  },
  props: collapseProps,
  emits: collapseEmits,
  name: prefix + '-collapse'
})
export default Collapse
