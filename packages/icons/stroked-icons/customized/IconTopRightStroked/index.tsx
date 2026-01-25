import { defineComponent, type SVGAttributes } from 'vue'
import { warpperIcon } from '../../../icon'
const IconTopRightStroked = defineComponent((props: SVGAttributes) => {
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
        d="M3 2a1 1 0 0 0 0 2h17v17a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1H3Zm0 8a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V11a1 1 0 0 0-1-1H3Zm1 10v-8h8v8H4Z"
        fill="currentColor"
      ></path>
    </svg>
  )
})
export default warpperIcon(IconTopRightStroked, 'IconTopRightStroked')
