import { defineComponent, computed, getCurrentInstance } from 'vue'
import { prefix } from 'constants/config'
import { emptyProps } from './type'
import './style/empty'
import Typography from '../typography'
import { renderElementForPropsOrSlot } from '../_util'
const Empty = defineComponent({
  setup(props, ctx) {
    const instance = getCurrentInstance()
    const wrapperClass = computed(() => {
      return [`${prefix}-empty`, `${prefix}-empty-${props.layout}`]
    })
    const isDark = true
    return () => {
      const children = ctx.slots.default?.()
      return (
        <div class={wrapperClass.value}>
          <div class={`${prefix}-empty-image`} style={props.imageStyle}>
            {renderElementForPropsOrSlot(isDark ? 'darkImage' : 'image', instance)}
          </div>
          <div class={`${prefix}-empty-content`}>
            <Typography.Title class={`${prefix}-empty-title`} heading={4}>
              {renderElementForPropsOrSlot('title', instance)}
            </Typography.Title>
            <div class={`${prefix}-empty-description`}>
              {renderElementForPropsOrSlot('description', instance)}
            </div>
            {children && children.length && <div class={`${prefix}-empty-footer`}>{children}</div>}
          </div>
        </div>
      )
    }
  },
  props: emptyProps,
  name: prefix + '-empty'
})
export default Empty
