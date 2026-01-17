import { defineComponent, type SVGAttributes } from 'vue'
import { warpperIcon } from '../../../icon'
const IconMinusStroked = defineComponent((props: SVGAttributes) => {
  return () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      focusable="false"
      aria-hidden="true"
      {...props}
    >
      <path d="M3 13a1 1 0 1 1 0-2h18a1 1 0 1 1 0 2H3Z" fill="currentColor"></path>
    </svg>
  )
})
export default warpperIcon(IconMinusStroked, 'IconMinusStroked')
