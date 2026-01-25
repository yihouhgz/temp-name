import { defineComponent, type SVGAttributes } from 'vue'
import { warpperIcon } from '../../../icon'
const IconCreditCard = defineComponent((props: SVGAttributes) => {
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
        d="M4 4a3 3 0 0 0-3 3v2h22V7a3 3 0 0 0-3-3H4Zm19 7H1v7a3 3 0 0 0 3 3h16a3 3 0 0 0 3-3v-7ZM4 15a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-1Z"
        fill="currentColor"
      ></path>
    </svg>
  )
})
export default warpperIcon(IconCreditCard, 'IconCreditCard')
