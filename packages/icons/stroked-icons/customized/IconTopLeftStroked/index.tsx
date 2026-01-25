import { defineComponent, type SVGAttributes } from 'vue'
import { warpperIcon } from '../../../icon'
const IconTopLeftStroked = defineComponent((props: SVGAttributes) => {
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
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V4h17a1 1 0 1 0 0-2H3Zm8 8a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V11a1 1 0 0 0-1-1H11Zm1 10v-8h8v8h-8Z"
        fill="currentColor"
      ></path>
    </svg>
  )
})
export default warpperIcon(IconTopLeftStroked, 'IconTopLeftStroked')
