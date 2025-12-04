import { defineComponent } from 'vue'
import { prefix } from 'constants/config'
import './style/skeleton'
import { useInjectSkeleton } from './content'

const SkeletonTitle = defineComponent({
  setup() {
    const skeleton = useInjectSkeleton(null)
    return () => {
      return (
        <div
          class={[
            prefix + '-skeleton-title',
            { [`${prefix}-skeleton-title-active`]: skeleton?.active }
          ]}
        ></div>
      )
    }
  },
  name: prefix + '-skeleton-title'
})
export default SkeletonTitle
