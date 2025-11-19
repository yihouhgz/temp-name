import { defineComponent } from 'vue'
import { prefix } from 'constants/config'
import { paragraphProps } from './type'
import Text from './text'

const Paragraph = defineComponent({
  setup(props, ctx) {
    return () => {
      return <Text>{ctx.slots.default?.()}</Text>
    }
  },
  name: prefix + '-paragraph',
  props: paragraphProps
})
export default Paragraph
