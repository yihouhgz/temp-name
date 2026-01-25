import { IconUploadError } from 'icons'
import Image from '../../image'
import type { ImageProps } from '../../image/image'
import { prefix } from 'constants/config'
const img = (props: ImageProps) => {
  return (
    <div class={`${prefix}-markdownRender-component-image`}>
      <Image {...props} fallback={<IconUploadError />} width={'100%'}></Image>
      <div class={`${prefix}-markdownRender-component-image-alt`}>{props.alt}</div>
    </div>
  )
}
export default img
