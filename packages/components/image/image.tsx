import { prefix } from 'constants/config'
import { defineComponent, type ExtractPropTypes } from 'vue'
import { imageProps, imageEmits } from './type'

const Image = defineComponent({
  setup(props, ctx) {
    const handleImgLoad = (e: Event) => {
      ctx.emit('load', e)
    }
    const handleImgError = (e: Event) => {
      ctx.emit('error', e)
    }
    return () => {
      const { src, alt, width, height, imgCls, imgStyle } = props
      const classNames = [prefix + '-image-img', prefix + '-image-img-perview', imgCls]
      return (
        <div class={prefix + '-image'}>
          <img
            onLoad={handleImgLoad}
            onError={handleImgError}
            class={classNames}
            style={imgStyle}
            src={src}
            data-src={src}
            alt={alt}
            width={width}
            height={height}
          ></img>
        </div>
      )
    }
  },
  props: imageProps,
  emits: imageEmits,
  name: prefix + '-image'
})
export default Image
export type ImageProps = ExtractPropTypes<typeof imageProps>
