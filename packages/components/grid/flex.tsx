import { defineComponent } from 'vue'
import { rowProps } from './row'
import Row from './row'
import { prefix } from 'constants/config'
import { omitKeys } from '../_util/helps'

const flexProps: Omit<typeof rowProps, 'type'> = omitKeys(rowProps, 'type')
const Flex = defineComponent(
  (props, ctx) => {
    return () => {
      return (
        <Row {...props} {...ctx.attrs} type="flex">
          {ctx.slots.default?.()}
        </Row>
      )
    }
  },
  { props: flexProps, name: prefix + '-flex' }
)
export default Flex
