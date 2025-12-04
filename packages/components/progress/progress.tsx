import { defineComponent, computed } from 'vue'
import { prefix } from 'constants/config'
import { progressProps } from './type'

const Progress = defineComponent({
  setup() {
    const classNames = computed(() => {
      return [prefix + '-progress']
    })
    return () => {
      return <div class={classNames.value}></div>
    }
  },
  props: progressProps,
  name: prefix + '-progress'
})
export default Progress
