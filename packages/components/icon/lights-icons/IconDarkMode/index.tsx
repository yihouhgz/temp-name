import { defineComponent, type SVGAttributes } from 'vue'
import { warpperIcon } from '../../icon'
const IconDarkMode = defineComponent((props: SVGAttributes) => {
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
      <circle cx="12" cy="12" r="11" fill="#324350"></circle>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M18 15.95a7.29 7.29 0 0 1-7.41-11.12A7.3 7.3 0 1 0 18 15.95Z"
        fill="#FBCD2C"
      ></path>
    </svg>
  )
})
export default warpperIcon(IconDarkMode, 'IconDarkMode')
