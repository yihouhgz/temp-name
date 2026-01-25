import { defineComponent, type SVGAttributes } from 'vue'
import { warpperIcon } from '../../../icon'
const IconDesktop = defineComponent((props: SVGAttributes) => {
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
        d="M2.5 14.5v-9c0-1.1.9-2 2-2h15a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2Z"
        stroke="currentColor"
        stroke-width="3"
      ></path>
      <path d="M7.5 21.5h9" stroke="currentColor" stroke-width="3" stroke-linecap="round"></path>
      <path d="M12 15.5v5" stroke="currentColor" stroke-width="4"></path>
    </svg>
  )
})
export default warpperIcon(IconDesktop, 'IconDesktop')
