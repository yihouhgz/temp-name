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
      const autoAdjustOverflow = props.autoAdjustOverflow
      const triggerElementRef = props.triggerElementRef
      if (targetElementRect && isNumber(targetElementRect.width) && innerElement) {
        const innerRect = innerElement.getBoundingClientRect()
        console.log(innerRect, 'innerRect1')
        const top = targetElementRect.y - innerRect.height - 6
        const left = targetElementRect.x - innerRect.width / 2 + targetElementRect.width / 2
        const postion: StyleValue = {
          zIndex: 1006,
          position: 'absolute',
          top: top + 'px',
          left: left + 'px'
        }
        if (autoAdjustOverflow) {
          const bodyRect = document.body.getBoundingClientRect()
          //如果 target top < inner height + 8px(边距)
          if (targetElementRect.y < innerRect.height + 8) {
            postion.top = triggerElementRef.offsetTop - 8 + 'px'
          } else if (
            -bodyRect.y - targetElementRect.y - targetElementRect.height <
            innerRect.height + 8
          ) {
            console.log(
              '-bodyRect.y - targetElementRect.y - targetElementRect.height',
              -bodyRect.y - targetElementRect.y - targetElementRect.height,
              innerRect.height,
              8
            )
            postion.top = triggerElementRef.offsetTop + targetElementRect.height + 8 + 'px'
          }
        }
        return postion
      }
      return {
        zIndex: 1006,
        position: 'absolute',
        top: 0 + 'px',
        left: 0 + 'px'
      }
    })
    console.log(innerStyle.value)
    console.log(props.innerStyle, 'props.innerStyle')
    return () => {
      return (
        <Teleport to={props.getPopupContainer(document.body)}>
          <div class="tempui-portal" style={style.value}>
            <div ref={innerRef} class="tempui-portal-inner" tabindex={-1} style={innerStyle.value}>
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
