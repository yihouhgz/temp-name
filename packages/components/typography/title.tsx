import { defineComponent, computed } from 'vue'
import { prefix } from 'constants/config'
import { titleProps } from './type'
import Text from './text'

const Title = defineComponent({
  setup(props, ctx) {
    const component = computed(() => {
      if (!props.component) {
        return `h${props.heading}` as keyof HTMLElementTagNameMap
      }
      return props.component
    })
    const wrapperClass = computed(() => {
      return [`${prefix}-typography-h${props.heading}`]
    })
    return () => {
      return (
        <Text {...props} component={component.value} class={wrapperClass.value}>
          {ctx.slots.default?.()}
        </Text>
      )
    }
  },
  name: prefix + '-title',
  props: titleProps
})
export default Title
