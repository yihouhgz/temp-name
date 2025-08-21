import { defineComponent, computed, Teleport, type StyleValue, ref } from 'vue'
import { prefix } from 'constants/config'
import { portalProps } from './type'
import { isNumber } from '../_util'
import './style/portal'
const Portal = defineComponent(
  (props, ctx) => {
    const innerRef = ref<HTMLElement>()
    const style = computed(() => {
      return {
        zIndex: 1006
      }
    })
    const innerStyle = computed<StyleValue>(() => {
      const targetElementRect = props.targetElementRect as DOMRect
      const innerElement = innerRef.value
      if (
        targetElementRect &&
        isNumber(targetElementRect.width) &&
        innerElement
      ) {
        const innerRect = innerElement.getBoundingClientRect()
        console.log(innerRect, 'innerRect')
        const top = targetElementRect.y - innerRect.height - 6
        const left =
          targetElementRect.x -
          innerRect.width / 2 +
          targetElementRect.width / 2
        return {
          zIndex: 1006,
          position: 'absolute',
          top: top + 'px',
          left: left + 'px'
        }
      }
      return {
        zIndex: 1006,
        position: 'absolute',
        top: 0 + 'px',
        left: 0 + 'px'
      }
    })
    return () => {
      return (
        <Teleport to={props.getPopupContainer(document.body)}>
          <div class="tempui-portal" style={style.value}>
            <div
              ref={innerRef}
              class="tempui-portal-inner"
              tabindex={-1}
              style={innerStyle.value}
            >
              {ctx.slots.default?.()}
            </div>
          </div>
        </Teleport>
      )
    }
  },
  { name: prefix + '-portal', props: portalProps }
)
export default Portal
