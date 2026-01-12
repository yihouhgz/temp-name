import { defineComponent, type SVGAttributes } from 'vue'
import { warpperIcon } from '../../../icon'
const IconPause = defineComponent((props: SVGAttributes) => {
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
        d="M4.5 4.75a2.75 2.75 0 0 1 5.5 0v14.5a2.75 2.75 0 1 1-5.5 0V4.75Z"
        fill="currentColor"
      ></path>
      <path
        d="M14 4.75a2.75 2.75 0 1 1 5.5 0v14.5a2.75 2.75 0 1 1-5.5 0V4.75Z"
        fill="currentColor"
      ></path>
    </svg>
  )
})
export default warpperIcon(IconPause, 'IconPause')
