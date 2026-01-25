import { defineComponent, type SVGAttributes } from 'vue'
import { warpperIcon } from '../../../icon'
const IconServer = defineComponent((props: SVGAttributes) => {
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
        d="M2 4c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Zm6 2.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0ZM2 15c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-5Zm6 2.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z"
        fill="currentColor"
      ></path>
    </svg>
  )
})
export default warpperIcon(IconServer, 'IconServer')
