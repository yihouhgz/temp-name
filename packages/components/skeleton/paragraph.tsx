import { defineComponent } from 'vue'
import { prefix } from 'constants/config'
import './style/skeleton'
import { paragraphProps } from './type'
import { useInjectSkeleton } from './content'

const SkeletonParagraph = defineComponent({
  setup(props) {
    const skeleton = useInjectSkeleton(null)
    console.log(skeleton)
    return () => {
      return (
        <ul
          class={[
            prefix + '-skeleton-paragraph',
            { [`${prefix}-skeleton-paragraph-active`]: skeleton?.active }
          ]}
        >
          {Array.from({ length: Number(props.rows) }).map((_, index) => {
            return <li key={index}></li>
          })}
        </ul>
      )
    }
  },
  name: prefix + '-skeleton-paragraph',
  props: paragraphProps
})
export default SkeletonParagraph
