import { defineComponent, computed, Teleport, /*type StyleValue,*/ ref, useAttrs } from 'vue'
import { prefix } from 'constants/config'
import { portalProps } from './type'
// import { isNumber } from '../_util'
import './style/portal'
const Portal = defineComponent(
  (props, ctx) => {
    const innerRef = ref<HTMLElement>()
    const style = computed(() => {
      return {
        zIndex: 1006
      }
    })
    const allAttrs = useAttrs()
    return () => {
      return (
        <Teleport to={props.getPopupContainer(document.body)}>
          <div class={`${prefix}-portal`} style={style.value} {...allAttrs}>
            <div
              ref={innerRef}
              class={`${prefix}-portal-inner`}
              tabindex={-1}
              style={props.innerStyle}
            >
              {ctx.slots.default?.()}
            </div>
          </div>
        </Teleport>
      )
    }
  },
  { name: prefix + '-portal', props: portalProps, inheritAttrs: false }
)
export default Portal
