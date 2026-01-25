import { defineComponent, type SVGAttributes } from 'vue'
import { warpperIcon } from '../../../icon'
const IconButtonStroked = defineComponent((props: SVGAttributes) => {
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
        d="M2 6a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h20a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H2Zm1 10V8h18v8H3Zm4-5a1 1 0 1 0 0 2h10a1 1 0 1 0 0-2H7Z"
        fill="currentColor"
      ></path>
    </svg>
  )
})
export default warpperIcon(IconButtonStroked, 'IconButtonStroked')
