import { prefix } from 'constants/config'
import { defineComponent, reactive, getCurrentInstance, computed } from 'vue'
import Portal from '../portal'
import { imagePreviewProps, imagePreviewEmits } from './type'
import '../image/style/image'
import { hasPropsOrSlots, isArray, isString, renderElementForPropsOrSlot } from '../_util'
import {
  IconArrowLeft,
  IconArrowRight,
  IconChevronLeft,
  IconChevronRight,
  IconClose,
  IconDownload,
  IconMinus,
  IconPlus,
  IconRotate
} from 'icons'
import Divider from '../divider'
import Slider from '../slider'
import { strings } from './constants'
import { IconRealSizeStroked, IconWindowAdaptionStroked } from 'icons/stroked-icons'

type ImagePreviewState = {
  triggerElementRef: HTMLElement | null
  currentIndex: number
  viewerVisible: boolean
  ratioType: 'adaptation' | 'realSize'
}
const imagePreview = defineComponent({
  setup(props) {
    const state = reactive<ImagePreviewState>({
      triggerElementRef: null,
      currentIndex: props.defaultCurrentIndex ?? 0,
      viewerVisible: false,
      ratioType: strings.REAL_SIZE
    })
    const instance = getCurrentInstance()
    const getImagesUrls = computed(() => {
      const src = props.src
      if (isString(src)) {
        return [src]
      } else if (isArray(src)) {
        return src
      }
      return []
    })
    const currentImageUrl = computed(() => {
      return getImagesUrls.value[state.currentIndex]
    })
    const renderCloseIcon = () => {
      if (hasPropsOrSlots('renderCloseIcon', instance)) {
        return renderElementForPropsOrSlot('renderCloseIcon', instance)
      }
      return <IconClose class={`${prefix}-image-preview-close`} />
    }
    const renderPreviewMenu = () => {
      const templates = []
      templates.push(<IconChevronLeft size="large"></IconChevronLeft>)
      templates.push(<div class={prefix + `-image-preview-footer-page`}>1 / 1</div>)
      templates.push(<IconChevronRight size="large"></IconChevronRight>)
      templates.push(<Divider layout="vertical"></Divider>)
      templates.push(<IconMinus size="large"></IconMinus>)
      templates.push(<Slider></Slider>)
      templates.push(<IconPlus size="large"></IconPlus>)
      if (state.ratioType === strings.REAL_SIZE) {
        templates.push(
          <IconRealSizeStroked
            class={prefix + '-image-preview-footer-gap'}
            size="large"
          ></IconRealSizeStroked>
        )
      } else {
        templates.push(
          <IconWindowAdaptionStroked
            class={prefix + '-image-preview-footer-gap'}
            size="large"
          ></IconWindowAdaptionStroked>
        )
      }
      templates.push(<Divider layout="vertical"></Divider>)
      templates.push(<IconRotate size="large"></IconRotate>)
      templates.push(
        <IconDownload class={prefix + '-image-preview-footer-gap'} size="large"></IconDownload>
      )
      return templates
    }
    const renderPageHandle = () => {
      const templates = []
      templates.push(
        <div class={[prefix + '-image-preview-icon', prefix + '-image-preview-prev']}>
          <IconArrowLeft></IconArrowLeft>
        </div>
      )
      templates.push(
        <div class={[prefix + '-image-preview-icon', prefix + '-image-preview-next']}>
          <IconArrowRight></IconArrowRight>
        </div>
      )
      return templates
    }
    return () => {
      const footerCls = [
        prefix + '-image-preview-footer',
        prefix + '-image-preview-footer-wrapper',
        state.viewerVisible && prefix + '-image-preview-footer-hide',
        prefix + '-image-preview-footer-content'
      ]
      return (
        <Portal
          triggerElementRef={state.triggerElementRef!}
          zIndex={props.zIndex}
          getPopupContainer={props.getPopupContainer}
        >
          <div
            class={`${prefix}-image-preview`}
            ref={(node) => (state.triggerElementRef = node as HTMLElement)}
          >
            <section class={`${prefix}-image-preview-header ${prefix}-image-preview-header-hide`}>
              <section class={`${prefix}-image-preview-header-title`}></section>
              <section class={`${prefix}-image-preview-header-close`}>{renderCloseIcon()}</section>
            </section>
            <div class={`${prefix}-image-preview-image`}>
              <img class={`${prefix}-image-preview-image-img`} src={currentImageUrl.value} />
            </div>
            {renderPageHandle()}
            <section class={footerCls}>{renderPreviewMenu()}</section>
          </div>
        </Portal>
      )
    }
  },
  props: imagePreviewProps,
  emits: imagePreviewEmits,
  name: prefix + '-image-preview'
})
export default imagePreview
