import { defineComponent, type SVGAttributes } from 'vue'
import { warpperIcon } from '../../../icon'
const IconDownCircleStroked = defineComponent((props: SVGAttributes) => {
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
        d="M3 12a9 9 0 1 1 18 0 9 9 0 0 1-18 0Zm9-11a11 11 0 1 0 0 22 11 11 0 0 0 0-22Zm-3.18 9.3a1 1 0 1 0-1.42 1.4l3.9 3.9a1 1 0 0 0 1.4 0l3.9-3.9a1 1 0 0 0-1.42-1.4L12 13.46 8.82 10.3Z"
        fill="currentColor"
      ></path>
    </svg>
  )
})
export default warpperIcon(IconDownCircleStroked, 'IconDownCircleStroked')
