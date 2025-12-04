import { defineComponent, computed } from 'vue'
import { prefix } from 'constants/config'
import { avatarProps } from './type'
import './style/skeleton'
import { useInjectSkeleton } from './content'

const SkeletonAvatar = defineComponent({
  setup(props) {
    const skeleton = useInjectSkeleton(null)
    const classNames = computed(() => {
      return [
        prefix + '-skeleton-avatar',
        prefix + '-skeleton-avatar-' + props.shape,
        prefix + '-skeleton-avatar-' + props.size,
        {
          [`${prefix}-skeleton-avatar-active`]: skeleton?.active
        }
      ]
    })
    return () => {
      return <div class={classNames.value}></div>
    }
  },
  props: avatarProps,
  name: prefix + '-skeleton-avatar'
})
export default SkeletonAvatar
