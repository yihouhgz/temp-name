import { defineComponent } from 'vue'
import { prefix } from 'constants/config'
import { numeralProps } from './type'
import Text from './text'

const Numeral = defineComponent({
  setup(props, ctx) {
    return () => {
      return <Text>{ctx.slots.default?.()}</Text>
    }
  },
  name: prefix + '-numeral',
  props: numeralProps
})
export default Numeral
