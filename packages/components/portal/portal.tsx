import { defineComponent, computed, Teleport, useAttrs } from 'vue'
import { prefix } from 'constants/config'
import { portalProps } from './type'
import './style/portal'
const Portal = defineComponent(
  (props, ctx) => {
    const style = computed(() => {
      return {
        zIndex: 1006
      }
    })
    const allAttrs = useAttrs()
    const targetElement = computed(() => {
      const el = document.body
      const dom = props.getPopupContainer(props.triggerElementRef || el)
      if (dom) return dom
      return el
    })
    return () => {
      return (
        <Teleport to={targetElement.value}>
          <div class={`${prefix}-portal`} style={style.value} {...allAttrs}>
            {ctx.slots.default?.()}
          </div>
        </Teleport>
      )
    }
  },
  { name: prefix + '-portal', props: portalProps, inheritAttrs: false }
)
export default Portal
