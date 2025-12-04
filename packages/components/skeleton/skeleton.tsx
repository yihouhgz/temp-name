import { prefix } from 'constants/config'
import { defineComponent, getCurrentInstance } from 'vue'
import { skeletonProps } from './type'
import { renderElementForPropsOrSlot } from '../_util'
import './style/skeleton'
import { useProvideSkeleton } from './content'

const Skeleton = defineComponent({
  setup(props, ctx) {
    const instance = getCurrentInstance()
    useProvideSkeleton({ active: props.active })
    return () => {
      const showSkeleton = props.loading
      if (showSkeleton) {
        return (
          <div class={[prefix + '-skeleton', props.className]} style={props.style} {...ctx.attrs}>
            {renderElementForPropsOrSlot('placeholder', instance)}
          </div>
        )
      }
      return ctx.slots.default?.()
    }
  },
  inheritAttrs: false,
  props: skeletonProps,
  name: prefix + '-skeleton'
})
export default Skeleton
