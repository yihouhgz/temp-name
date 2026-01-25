import { defineComponent, type SVGAttributes } from 'vue'
import { warpperIcon } from '../../../icon'
const IconInnerSectionStroked = defineComponent((props: SVGAttributes) => {
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
        d="M5 2a1 1 0 0 0-1 1v18a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H5Zm1 18V4h3v16H6Zm8-18a1 1 0 0 0-1 1v18a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-5Zm1 18V4h3v16h-3Z"
        fill="currentColor"
      ></path>
    </svg>
  )
})
export default warpperIcon(IconInnerSectionStroked, 'IconInnerSectionStroked')
