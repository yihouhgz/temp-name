import { defineComponent } from 'vue'
import { prefix } from 'constants/config'
import './style/skeleton'
import { useInjectSkeleton } from './content'

const SkeletonButton = defineComponent({
  setup() {
    const skeleton = useInjectSkeleton(null)
    return () => {
      return (
        <div
          class={[
            prefix + '-skeleton-button',
            { [`${prefix}-skeleton-button-active`]: skeleton?.active }
          ]}
        ></div>
      )
    }
  },
  name: prefix + '-skeleton-button'
})
export default SkeletonButton
