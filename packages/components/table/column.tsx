import { defineComponent } from 'vue'
import { prefix } from 'constants/config'
import { columnEmits, columnProps } from './type'

const Column = defineComponent({
  setup() {
    return () => null
  },
  emits: columnEmits,
  props: columnProps,
  name: prefix + '-column'
})
export default Column
