import { defineComponent, type SVGAttributes } from 'vue'
import { warpperIcon } from '../../../icon'
const IconVolume1 = defineComponent((props: SVGAttributes) => {
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
        d="M12 3a1 1 0 0 0-1.62-.78L4.65 7H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2.65l5.73 4.78A1 1 0 0 0 12 21V3Zm4.07 5.45a1.5 1.5 0 1 0-2.14 2.1 1.99 1.99 0 0 1 0 2.8 1.5 1.5 0 0 0 2.14 2.1 4.99 4.99 0 0 0 0-7Z"
        fill="currentColor"
      ></path>
    </svg>
  )
})
export default warpperIcon(IconVolume1, 'IconVolume1')
