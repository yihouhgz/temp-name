import { defineComponent, computed } from 'vue'
import { prefix } from 'constants/config'
import { feefbackProps } from './type'
import SideSheet from '../side-sheet'
import { sideSheetProps } from '../side-sheet/type'

const Feedback = defineComponent({
  setup(props) {
    const sideSheetPropsRest = computed(() => {
      const result: Record<string, unknown> = {}
      const allProps: Record<string, unknown> = { ...props }
      for (const key in props) {
        if (Object.hasOwnProperty.call(sideSheetProps, key)) {
          result[key] = allProps[key]
        }
      }
      return result
    })
    const wrapperClass = computed(() => {
      return [prefix + '-feedback', prefix + '-feedback-' + props.type]
    })
    return () => {
      return (
        <SideSheet class={wrapperClass.value} visible={props.visible} {...sideSheetPropsRest.value}>
          <div></div>
        </SideSheet>
      )
    }
  },
  props: { ...feefbackProps, ...sideSheetProps },
  name: prefix + '-feedback'
})
export default Feedback
