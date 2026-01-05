import { defineComponent, type SVGAttributes } from 'vue'
import { warpperIcon } from '../../icon'
const IconBadge = defineComponent((props: SVGAttributes) => {
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
        d="M21 11.5A6.5 6.5 0 0 1 12.5 3H5a3 3 0 0 0-3 3v13a3 3 0 0 0 3 3h13a3 3 0 0 0 3-3v-7.5Z"
        fill="#DDE3E8"
      ></path>
      <circle cx="18.5" cy="5.5" r="4.5" fill="#FF7D95"></circle>
    </svg>
  )
})
export default warpperIcon(IconBadge, 'IconBadge')
