import { defineComponent, type SVGAttributes } from 'vue'
import { warpperIcon } from '../../../icon'
const IconTransparentStroked = defineComponent((props: SVGAttributes) => {
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
        d="M2 2h4v4H2V2Zm8 4H6v4H2v4h4v4H2v4h4v-4h4v4h4v-4h4v4h4v-4h-4v-4h4v-4h-4V6h4V2h-4v4h-4V2h-4v4Zm0 4V6h4v4h-4Zm0 4H6v-4h4v4Zm4 0v4h-4v-4h4Zm0 0v-4h4v4h-4Z"
        fill="currentColor"
      ></path>
    </svg>
  )
})
export default warpperIcon(IconTransparentStroked, 'IconTransparentStroked')
