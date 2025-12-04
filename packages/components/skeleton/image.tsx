import { defineComponent } from 'vue'
import { prefix } from 'constants/config'
import './style/skeleton'
import { useInjectSkeleton } from './content'

const SkeletonImage = defineComponent({
  setup() {
    const skeleton = useInjectSkeleton(null)
    return () => {
      return (
        <div
          class={[
            prefix + '-skeleton-image',
            { [`${prefix}-skeleton-image-active`]: skeleton?.active }
          ]}
        ></div>
      )
    }
  },
  name: prefix + '-skeleton-image'
})
export default SkeletonImage
