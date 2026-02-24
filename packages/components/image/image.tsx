import { prefix } from 'constants/config'
import {
  defineComponent,
  reactive,
  getCurrentInstance,
  type ExtractPropTypes,
  computed,
  useAttrs
} from 'vue'
import { imageProps, imageEmits } from './type'
import { hasPropsOrSlots, isObject, renderElementForPropsOrSlot } from '../_util'
import { IconUploadError } from 'icons'
import './style/image'
import ImagePreview from '../image-preview'

const Image = defineComponent({
  setup(props, ctx) {
    const state = reactive({
      loading: false,
      isError: false, // load error
      isLoad: false, // load done
      showVisible: false
    })
    const instance = getCurrentInstance()

    const getPerviewoOption = () => {
      const { preview } = props
      if (isObject(preview)) {
        return preview
      } else {
        return {
          src: props.src
        }
      }
    }
    const handleClick = (e: MouseEvent) => {
      ctx.emit('click', e)
      const { preview } = props
      if (preview) {
        const option = getPerviewoOption()
        console.log(option)
        state.showVisible = true
      }
    }
    const handleImgLoad = (e: Event) => {
      ctx.emit('load', e)
      state.isLoad = true
      state.loading = false
    }
    const handleImgError = (e: Event) => {
      ctx.emit('error', e)
      state.isError = true
      state.loading = false
    }
    const isShowPlaceholder = computed(() => {
      return state.loading && !state.isLoad && hasPropsOrSlots('placeholder', instance)
    })
    const isShowOverlay = computed(() => {
      return state.isError || isShowPlaceholder.value
    })
    const handleImagePreviewClose = () => {
      state.showVisible = false
    }
    const attrs = useAttrs()
    return () => {
      const { src, alt, width, height, imgCls, imgStyle, preview } = props
      const isPreview = !!preview
      const classNames = [
        prefix + '-image-img',
        isPreview && prefix + '-image-img-perview',
        state.isError && prefix + '-image-img-error',
        imgCls
      ]
      return (
        <div class={prefix + '-image'}>
          <img
            onClick={handleClick}
            onLoad={handleImgLoad}
            onError={handleImgError}
            class={classNames}
            style={imgStyle}
            src={src}
            data-src={src}
            alt={alt}
            width={width}
            height={height}
            {...attrs}
          ></img>
          {isShowOverlay.value && (
            <div class={prefix + '-image-overlay'}>
              {hasPropsOrSlots('placeholder', instance) &&
                renderElementForPropsOrSlot('placeholder', instance)}
              {state.isError && (
                <div class={prefix + '-image-status'}>
                  {hasPropsOrSlots('fallback', instance) ? (
                    renderElementForPropsOrSlot('fallback', instance)
                  ) : (
                    <IconUploadError size="extra-large" />
                  )}
                </div>
              )}
            </div>
          )}
          {isPreview && (
            <ImagePreview
              onClose={handleImagePreviewClose}
              src={props.src}
              visible={state.showVisible}
            ></ImagePreview>
          )}
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
