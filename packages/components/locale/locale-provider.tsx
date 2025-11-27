import { defineComponent } from 'vue'
import { prefix } from 'constants/config'

const LocaleProvider = defineComponent({
  setup(props, { slots }) {
    return () => {
      return <>{slots.default?.()}</>
    }
  },
  name: prefix + '-locale-provider'
})

export default LocaleProvider
