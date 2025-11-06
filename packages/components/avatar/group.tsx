import { defineComponent, h, getCurrentInstance, ref } from 'vue'
import { prefix } from 'constants/config'
import consola from '../_util/console'
import { groupProps } from './type'
import { hasPropsOrSlots, isObject, renderElementForPropsOrSlot } from '../_util'
import Avatar from './avatar'
import './style/group'
import type { StyleValue } from 'vue'
import { useEventListener } from '../_util'
import { computed } from 'vue'
const AvatarGroup = defineComponent({
  setup(props, ctx) {
    const avatarGroupRef = ref()
    const showHover = ref(false)
    const vm = getCurrentInstance()
    if (props.spread) {
      useEventListener(avatarGroupRef, 'mouseenter', () => {
        showHover.value = true
      })
      useEventListener(avatarGroupRef, 'mouseleave', () => (showHover.value = false))
    }
    const defaultRenderSlot = () => {
      const vnodes = ctx.slots.default?.() || []
      const childrenName = Avatar.name
      let maxZIndex = Math.max(props.maxCount + 1, 100)
      let showWraning = false
      const visibleNodes =
        vnodes.length >= props.maxCount ? vnodes.slice(0, props.maxCount) : vnodes
      const avatarNodes = visibleNodes?.map((item) => {
        if (!isObject(item) || (item.type as { name: string }).name !== childrenName) {
          showWraning = true
          return null
        } else {
          const avatarStyle: StyleValue = { zIndex: maxZIndex-- }
          return h(
            Avatar,
            {
              ...item.props,
              shape: props.shape,
              size: props.size,
              style: avatarStyle
            },
            {
              ...(item.children as object)
            }
          )
        }
      })
      if (showWraning) consola.warn('AvatarGroup only accepts Avatar as children.')
      if (props.overlapFrom === 'end') {
        return [...avatarNodes]?.reverse()
      }
      if (vnodes?.length > props.maxCount) {
        let renderMoreSlot = null
        if (hasPropsOrSlots('renderMore', vm)) {
          renderMoreSlot = renderElementForPropsOrSlot('renderMore', vm)
        } else {
          renderMoreSlot = h(
            Avatar,
            {
              color: 'grey',
              shape: props.shape,
              size: props.size,
              style: { zIndex: maxZIndex-- }
            },
            {
              default: () => '+' + (vnodes.length - props.maxCount)
            }
          )
        }
        return [...avatarNodes.slice(0, props.maxCount), renderMoreSlot]
      }
      return avatarNodes
    }
    const classNames = computed(() => [
      prefix + '-avatar-group',
      {
        [prefix + '-avatar-group-hover']: showHover.value
      }
    ])
    return () => {
      return (
        <div class={classNames.value} ref={avatarGroupRef}>
          {defaultRenderSlot()}
        </div>
      )
    }
  },
  name: prefix + '-avatar-group',
  props: groupProps
})
export default AvatarGroup
