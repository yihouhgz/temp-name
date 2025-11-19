import { defineComponent } from 'vue'
import { prefix } from 'constants/config'
import { titleProps } from './type'
import Text from './text'

const Title = defineComponent({
  setup(props, ctx) {
    return () => {
      return <Text>{ctx.slots.default?.()}</Text>
    }
  },
  name: prefix + '-title',
  props: titleProps
})
export default Title
