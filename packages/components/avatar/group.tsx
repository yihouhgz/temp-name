import { defineComponent } from 'vue'
import { prefix } from 'constants/config'
import consola from '../_util/console'
import { groupProps } from './type'
import { isObject } from '../_util'
import Avatar from './avatar'
const AvatarGroup = defineComponent({
  setup(props, ctx) {
    const defaultRenderSlot = () => {
      const vnodes = ctx.slots.default?.()
      let showWarning = false
      const childrenName = Avatar.name
      for (const vnode of vnodes ?? []) {
        if (!isObject(vnode) || (vnode.type as { name: string }).name !== childrenName) {
          showWarning = true
          break
        }
      }
      if (showWarning) {
        consola.warn('AvatarGroup only accepts Avatar as children.')
      }
      return vnodes
    }
    return () => {
      return (
        <div>
          <div>{defaultRenderSlot()}</div>
        </div>
      )
    }
  },
  name: prefix + '-avatar-group',
  props: groupProps
})
export default AvatarGroup
