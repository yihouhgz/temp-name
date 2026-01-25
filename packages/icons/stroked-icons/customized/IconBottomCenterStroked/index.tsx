import { defineComponent, type SVGAttributes } from 'vue'
import { warpperIcon } from '../../../icon'
const IconBottomCenterStroked = defineComponent((props: SVGAttributes) => {
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
        d="M7 2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H7Zm1 10V4h8v8H8Zm-5 8a1 1 0 1 0 0 2h18a1 1 0 1 0 0-2H3Z"
        fill="currentColor"
      ></path>
    </svg>
  )
})
export default warpperIcon(IconBottomCenterStroked, 'IconBottomCenterStroked')
