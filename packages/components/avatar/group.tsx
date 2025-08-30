import { defineComponent } from 'vue'
import { prefix } from 'constants/config'
const AvatarGroup = defineComponent({
  setup() {
    return () => {
      return <div>Avatar</div>
    }
  },
  name: prefix + '-avatar-group'
})
export default AvatarGroup
