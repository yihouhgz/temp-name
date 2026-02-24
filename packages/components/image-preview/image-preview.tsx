import { prefix } from 'constants/config'
import {
  defineComponent,
  reactive,
  getCurrentInstance,
  computed,
  onUnmounted,
  watch,
  watchEffect,
  type VNode
} from 'vue'
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
import Tooltip from '../tooltip'

type ImagePreviewState = {
  triggerElementRef: HTMLElement | null
  currentIndex: number
  viewerVisible: boolean
  ratioType: 'adaptation' | 'realSize'
  isHideMenu: boolean
}
const imagePreview = defineComponent({
  setup(props) {
    let handerTimer: ReturnType<typeof setTimeout> | null = null
    const state = reactive<ImagePreviewState>({
      triggerElementRef: null,
      currentIndex: props.defaultCurrentIndex ?? 0,
      viewerVisible: false,
      ratioType: strings.REAL_SIZE,
      isHideMenu: false
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
    watchEffect(() => {
      const { visible } = props
      state.viewerVisible = visible
    })
    watch(
      () => state.viewerVisible,
      (v) => {
        if (v) cancelNotHandle()
      },
      { immediate: true }
    )
    const cancelNotHandle = () => {
      if (handerTimer) {
        state.isHideMenu = false
        clearTimeout(handerTimer)
        handerTimer = null
      }
      if (state.viewerVisible) {
        const { viewerVisibleDelay } = props
        handerTimer = setTimeout(() => {
          state.isHideMenu = true
        }, viewerVisibleDelay)
      }
    }
    onUnmounted(() => {
      if (handerTimer) clearTimeout(handerTimer)
    })
    const renderCloseIcon = () => {
      if (hasPropsOrSlots('renderCloseIcon', instance)) {
        return renderElementForPropsOrSlot('renderCloseIcon', instance)
      }
      return <IconClose class={`${prefix}-image-preview-close`} />
    }
    const creatTooltipWrapper = (content: VNode | string, children: VNode) => {
      const { showTooltip } = props
      if (showTooltip) {
        return (
          <Tooltip
            zIndex={props.zIndex + 1}
            trigger="hover"
            content={<span>{content}</span>}
            position="top"
          >
            {children}
          </Tooltip>
        )
      }
      return children
    }
    const renderPreviewMenu = () => {
      const {
        prevTip,
        nextTip,
        zoomOutTip,
        zoomInTip,
        rotateTip,
        originTip,
        adaptiveTip,
        downloadTip
      } = props
      const templates = []
      templates.push(creatTooltipWrapper(prevTip, <IconChevronLeft size="large"></IconChevronLeft>))
      templates.push(
        <div class={prefix + `-image-preview-footer-page`}>
          {state.currentIndex + 1} / {getImagesUrls.value.length}
        </div>
      )
      templates.push(
        creatTooltipWrapper(nextTip, <IconChevronRight size="large"></IconChevronRight>)
      )
      templates.push(<Divider layout="vertical"></Divider>)
      templates.push(creatTooltipWrapper(zoomOutTip, <IconMinus size="large"></IconMinus>))
      templates.push(<Slider></Slider>)
      templates.push(creatTooltipWrapper(zoomInTip, <IconPlus size="large"></IconPlus>))
      if (state.ratioType === strings.REAL_SIZE) {
        templates.push(
          creatTooltipWrapper(
            originTip,
            <IconRealSizeStroked
              class={prefix + '-image-preview-footer-gap'}
              size="large"
            ></IconRealSizeStroked>
          )
        )
      } else {
        templates.push(
          creatTooltipWrapper(
            adaptiveTip,
            <IconWindowAdaptionStroked
              class={prefix + '-image-preview-footer-gap'}
              size="large"
            ></IconWindowAdaptionStroked>
          )
        )
      }
      templates.push(<Divider layout="vertical"></Divider>)
      templates.push(creatTooltipWrapper(rotateTip, <IconRotate size="large"></IconRotate>))
      templates.push(
        creatTooltipWrapper(
          downloadTip,
          <IconDownload class={prefix + '-image-preview-footer-gap'} size="large"></IconDownload>
        )
      )
      return templates
    }
    const renderPageHandle = () => {
      const templates = []
      templates.push(
        <div
          class={[
            prefix + '-image-preview-icon',
            prefix + '-image-preview-prev',
            state.isHideMenu && prefix + '-image-preview-hide'
          ]}
        >
          <IconArrowLeft></IconArrowLeft>
        </div>
      )
      templates.push(
        <div
          class={[
            prefix + '-image-preview-icon',
            prefix + '-image-preview-next',
            state.isHideMenu && prefix + '-image-preview-hide'
          ]}
        >
          <IconArrowRight></IconArrowRight>
        </div>
      )
      return templates
    }
    return () => {
      if (!state.viewerVisible) {
        return null
      }
      const footerCls = [
        prefix + '-image-preview-footer',
        prefix + '-image-preview-footer-wrapper',
        state.isHideMenu && prefix + '-image-preview-hide',
        prefix + '-image-preview-footer-content'
      ]
      return (
        <Portal
          triggerElementRef={state.triggerElementRef!}
          zIndex={props.zIndex}
          getPopupContainer={props.getPopupContainer}
        >
          <div
            onClick={() => cancelNotHandle()}
            onMousemove={() => cancelNotHandle()}
            class={`${prefix}-image-preview`}
            ref={(node) => (state.triggerElementRef = node as HTMLElement)}
          >
            <section
              class={[
                `${prefix}-image-preview-header`,
                state.isHideMenu && prefix + '-image-preview-hide'
              ]}
            >
              <section class={`${prefix}-image-preview-header-title`}></section>
              <section class={`${prefix}-image-preview-header-close`}>{renderCloseIcon()}</section>
            </section>
            <div class={`${prefix}-image-preview-image`}>
              <img class={`${prefix}-image-preview-image-img`} src={currentImageUrl.value} />
            </div>
            {getImagesUrls.value.length && renderPageHandle()}
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
