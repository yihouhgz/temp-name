import { defineComponent, computed } from 'vue'
import { prefix } from 'constants/config'
import { paragraphProps } from './type'
import Text from './text'
const Paragraph = defineComponent({
  setup(props, ctx) {
    const component = computed(() => {
      return props.component
    })
    const classNames = computed(() => {
      return [
        prefix + '-typography-paragraph',
        props.spacing === 'extended' && `${prefix}-typography-extended`
      ]
    })
    return () => {
      return (
        <Text {...props} class={classNames.value} component={component.value}>
          {ctx.slots.default?.()}
        </Text>
      )
    }
  },
  name: prefix + '-paragraph',
  props: paragraphProps
})
export default Paragraph
