import { prefix } from 'constants/config'
import {
  defineComponent,
  reactive,
  getCurrentInstance,
  computed,
  onUnmounted,
  watch,
  watchEffect,
  type VNode,
  type StyleValue,
  useAttrs,
  type ExtractPropTypes,
  type ExtractPublicPropTypes
} from 'vue'
import Portal from '../portal'
import { imagePreviewProps, imagePreviewEmits } from './type'
import '../image/style/image'
import {
  hasPropsOrSlots,
  isArray,
  isFunction,
  isObject,
  isString,
  isUndefined,
  renderElementForPropsOrSlot
} from '../_util'
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
import { numbers, strings } from './constants'
import { IconRealSizeStroked, IconWindowAdaptionStroked } from 'icons/stroked-icons'
import Tooltip from '../tooltip'
import { downloadFile } from './utils'
import Spin from '../spin'
import { useImagePerviewProvider } from './scope'
import type { VueNode } from '../_util/type'

type ImagePreviewState = {
  triggerElementRef: HTMLElement | null
  currentIndex: number
  viewerVisible: boolean
  ratioType: 'adaptation' | 'realSize'
  isHideMenu: boolean
  rotate: number
  zoom: number
  naturalWidth: number
  naturalHeight: number
  currentImageLoading: boolean
  scopeImageUrls: string[]
  scopeImageTitles: VueNode[]
}
const imagePreview = defineComponent({
  setup(props, ctx) {
    let handerTimer: ReturnType<typeof setTimeout> | null = null
    const state = reactive<ImagePreviewState>({
      triggerElementRef: null,
      currentIndex: props.defaultCurrentIndex ?? 0,
      viewerVisible: props.defaultVisible,
      ratioType: strings.ADAPTIVE,
      isHideMenu: false,
      rotate: 0,
      zoom: 1,
      naturalWidth: 0,
      naturalHeight: 0,
      currentImageLoading: false,
      scopeImageUrls: [],
      scopeImageTitles: []
    })
    let imageRef: HTMLImageElement | null = null
    let containerObserver: ResizeObserver | null = null
    let scheduleIndex = 0
    useImagePerviewProvider({
      isChildren: true,
      setImageUrl(index, url) {
        state.scopeImageUrls[index] = url
      },
      showImagePerview(index) {
        if (!isUndefined(index)) {
          state.currentIndex = index
        }
        state.viewerVisible = true
      },
      getSchedule() {
        return {
          index: scheduleIndex++
        }
      },
      setImagePerviewTitle(index, title) {
        state.scopeImageTitles[index] = title
      }
    })
    watchEffect(() => {
      if (!isUndefined(props.currentIndex)) {
        state.currentIndex = props.currentIndex
      }
    })
    watch(
      () => state.viewerVisible,
      () => {
        const viewerVisible = state.viewerVisible
        ctx.emit('visibleChange', viewerVisible)
        if (viewerVisible) {
          state.currentImageLoading = true
        }
      }
    )
    watch(
      () => state.currentIndex,
      () => {
        state.currentImageLoading = true
        // ctx.emit('change', state.currentIndex)
      }
    )
    const instance = getCurrentInstance()
    const getImagesUrls = computed(() => {
      const src = props.src
      const scopeImageUrls = state.scopeImageUrls
      let imageUrls: string[] = []
      if (isString(src)) {
        imageUrls = [src]
      } else if (isArray(src)) {
        imageUrls = src
      }
      if (scopeImageUrls.length) {
        imageUrls = imageUrls.concat(scopeImageUrls)
      }
      return imageUrls
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
      if (containerObserver) {
        containerObserver.disconnect()
        containerObserver = null
      }
    })

    const createMenuProps = computed(() => {
      return {
        curPage: state.currentIndex,
        disabledPrev: false,
        disabledNext: false,
        disableDownload: props.disableDownload,
        max: numbers.SIZE_MAX / 100,
        min: numbers.SIZE_MIN / 100,
        onDownload: handleDownload,
        onZoomIn: handleZoomIn,
        onZoomOut: handleZoomOut,
        onPrev: handlePrev,
        onNext: handleNext,
        onRotateLeft: handleRotateLeft,
        onRotateRight: handleRotateRight,
        ratio: state.ratioType,
        step: props.zoomStep,
        totalNum: getImagesUrls.value.length,
        zoom: state.zoom,
        menuItems: []
      }
    })
    const handleZoomIn = () => {
      const step = props.zoomStep
      const maxFactor = numbers.SIZE_MAX / 100
      let zoom = state.zoom + step
      if (zoom > maxFactor) zoom = maxFactor
      state.zoom = zoom
      ctx.emit('zoomIn', zoom)
    }
    const handleZoomOut = () => {
      const step = props.zoomStep
      const minFactor = numbers.SIZE_MIN / 100
      let zoom = state.zoom - step
      if (zoom < minFactor) zoom = minFactor
      state.zoom = zoom
      ctx.emit('zoomOut', zoom)
    }

    const handlePrev = () => {
      let index = state.currentIndex - 1
      const { infinite } = props
      if (index == 0 && infinite) {
        index = getImagesUrls.value.length - 1
      } else if (index < 0) {
        index = 0
      }
      handleChangeIamge(index)
      ctx.emit('prev', state.currentIndex)
    }
    const handleNext = () => {
      let index = state.currentIndex + 1
      const { infinite } = props
      if (index == getImagesUrls.value.length - 1 && infinite) {
        index = 0
      } else if (index >= getImagesUrls.value.length) {
        index = getImagesUrls.value.length - 1
      }
      handleChangeIamge(index)
      ctx.emit('next', state.currentIndex)
    }

    const handleChangeIamge = (index: number) => {
      if (getImagesUrls.value.length <= 1) return
      if (index === state.currentIndex) return
      if (isUndefined(props.currentIndex)) {
        state.currentIndex = index
      }
      ctx.emit('change', index)
    }

    const handleRotateLeft = () => {
      state.rotate = state.rotate - numbers.ROTATE_STEP
      ctx.emit('rotateLeft', state.rotate)
    }
    const handleRotateRight = () => {
      state.rotate = state.rotate + numbers.ROTATE_STEP
    }
    const handleDownload = () => {
      const { setDownloadName, disableDownload } = props
      if (disableDownload) return
      const src = getImagesUrls.value[state.currentIndex]
      const name = isFunction(setDownloadName) ? setDownloadName(src) : undefined
      downloadFile(src, name).then((success) => {
        if (success) {
          ctx.emit('download', src, state.currentIndex)
        } else {
          ctx.emit('downloadError', src)
        }
      })
    }
    const handleClickClose = () => {
      if (!isUndefined(props.visible)) {
        state.viewerVisible = false
      }
      ctx.emit('close')
    }
    const handleChangeRatioType = (type: 'adaptation' | 'realSize') => {
      state.ratioType = type
    }
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (e.deltaY < 0) {
        handleZoomIn()
      } else {
        handleZoomOut()
      }
    }
    const handleClickRoot = (event: MouseEvent) => {
      cancelNotHandle()
      if (event.target === event.currentTarget) {
        if (props.maskClosable) {
          handleClickClose()
        }
      }
    }
    const previewStyle = computed<StyleValue>(() => {
      const { rotate, zoom, naturalWidth, naturalHeight } = state
      let width = naturalWidth ? naturalWidth * zoom + 'px' : undefined
      let height = naturalHeight ? naturalHeight * zoom + 'px' : undefined
      if (state.ratioType === strings.REAL_SIZE) {
        width = naturalWidth + 'px'
        height = naturalHeight + 'px'
      }
      return {
        position: 'absolute',
        visibility: 'visible',
        cursor: 'default',
        width,
        height,
        transform: `translate(0px, 0px) rotate(${rotate}deg)`
      }
    })
    const handleImageLoad = () => {
      if (imageRef) {
        state.naturalWidth = imageRef.naturalWidth || imageRef.width
        state.naturalHeight = imageRef.naturalHeight || imageRef.height
        const container = imageRef.parentElement as HTMLElement | null
        if (container && state.naturalWidth && state.naturalHeight) {
          const rect = container.getBoundingClientRect()
          const cw = rect.width
          const ch = rect.height
          if (cw > 0 && ch > 0) {
            const scaleX = cw / state.naturalWidth
            const scaleY = ch / state.naturalHeight
            const scale = Math.min(scaleX, scaleY)
            const minFactor = numbers.SIZE_MIN / 100
            const maxFactor = numbers.SIZE_MAX / 100
            state.zoom = Math.max(minFactor, Math.min(maxFactor, scale)) * 0.9
            state.ratioType = strings.ADAPTIVE
          }
          if (containerObserver) {
            containerObserver.disconnect()
          }
          containerObserver = new ResizeObserver(() => {
            if (state.ratioType === strings.ADAPTIVE) {
              const rect2 = container.getBoundingClientRect()
              const cw2 = rect2.width
              const ch2 = rect2.height
              if (cw2 > 0 && ch2 > 0 && state.naturalWidth && state.naturalHeight) {
                const sx = cw2 / state.naturalWidth
                const sy = ch2 / state.naturalHeight
                const sc = Math.min(sx, sy)
                const minF = numbers.SIZE_MIN / 100
                const maxF = numbers.SIZE_MAX / 100
                state.zoom = Math.max(minF, Math.min(maxF, sc)) * 0.9
              }
            }
          })
          containerObserver.observe(container)
        }
      }
      state.currentImageLoading = false
    }
    const handleKeyEsc = () => {
      handleClickClose()
    }
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
        downloadTip,
        disableDownload,
        renderPreviewMenu: renderPreviewMenuFn
      } = props
      const templates = []
      const isMinPage = state.currentIndex === 0 && !props.infinite
      templates.push(
        creatTooltipWrapper(
          prevTip,
          <IconChevronLeft
            class={[isMinPage && `${prefix}-image-preview-footer-disabled`]}
            size="large"
            onClick={handlePrev}
          ></IconChevronLeft>
        )
      )
      templates.push(
        <div class={prefix + `-image-preview-footer-page`}>
          {state.currentIndex + 1} / {getImagesUrls.value.length}
        </div>
      )
      const isMaxPage = state.currentIndex >= getImagesUrls.value.length - 1 && !props.infinite
      templates.push(
        creatTooltipWrapper(
          nextTip,
          <IconChevronRight
            class={[isMaxPage && `${prefix}-image-preview-footer-disabled`]}
            size="large"
            onClick={handleNext}
          ></IconChevronRight>
        )
      )
      templates.push(<Divider layout="vertical"></Divider>)

      // 缩小
      const isMin = state.zoom <= props.zoomStep
      templates.push(
        creatTooltipWrapper(
          zoomOutTip,
          <IconMinus
            class={[isMin && `${prefix}-image-preview-footer-disabled`]}
            onClick={handleZoomOut}
            size="large"
          ></IconMinus>
        )
      )
      const handleZoomBySliderChange = (value: number | number[]) => {
        const v = Array.isArray(value) ? Number(value[0]) : Number(value)
        const percent = Math.max(numbers.SIZE_MIN, Math.min(numbers.SIZE_MAX, v))
        state.zoom = percent / 100
      }
      templates.push(
        <Slider
          value={state.zoom * 100}
          min={numbers.SIZE_MIN}
          max={numbers.SIZE_MAX}
          onChange={handleZoomBySliderChange}
          tipFormatter={undefined}
        ></Slider>
      )
      // 放大
      templates.push(
        creatTooltipWrapper(zoomInTip, <IconPlus onClick={handleZoomIn} size="large"></IconPlus>)
      )
      if (state.ratioType === strings.ADAPTIVE) {
        templates.push(
          creatTooltipWrapper(
            originTip,
            <IconRealSizeStroked
              onClick={() => handleChangeRatioType(strings.REAL_SIZE)}
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
              onClick={() => handleChangeRatioType(strings.ADAPTIVE)}
              class={prefix + '-image-preview-footer-gap'}
              size="large"
            ></IconWindowAdaptionStroked>
          )
        )
      }
      templates.push(<Divider layout="vertical"></Divider>)
      templates.push(
        creatTooltipWrapper(
          rotateTip,
          <IconRotate onClick={handleRotateLeft} size="large"></IconRotate>
        )
      )
      templates.push(
        creatTooltipWrapper(
          downloadTip,
          <IconDownload
            onClick={handleDownload}
            class={[
              prefix + '-image-preview-footer-gap',
              disableDownload && prefix + '-image-preview-footer-disabled'
            ]}
            size="large"
          ></IconDownload>
        )
      )
      if (isFunction(renderPreviewMenuFn)) {
        const menuProps = {
          ...createMenuProps.value,
          menuItems: templates
        }
        return renderPreviewMenuFn(menuProps)
      }
      return templates
    }
    const renderPageHandle = () => {
      const templates = []
      const { infinite, renderLeftIcon, renderRightIcon } = props
      const isShowPrev = infinite || state.currentIndex > 0
      if (isShowPrev) {
        let leftIcon = null
        if (renderLeftIcon) {
          if (isObject(renderLeftIcon)) {
            leftIcon = renderLeftIcon
          }
          if (isFunction(renderLeftIcon)) {
            leftIcon = renderLeftIcon(state.currentIndex)
          }
        } else leftIcon = <IconArrowLeft></IconArrowLeft>
        templates.push(
          <div
            class={[
              prefix + '-image-preview-icon',
              prefix + '-image-preview-prev',
              state.isHideMenu && prefix + '-image-preview-hide'
            ]}
            onClick={handlePrev}
          >
            {leftIcon}
          </div>
        )
      }
      const isShowNext = infinite || state.currentIndex < getImagesUrls.value.length - 1
      if (isShowNext) {
        let rightIcon = null
        if (renderRightIcon) {
          if (isObject(renderRightIcon)) {
            rightIcon = renderRightIcon
          }
          if (isFunction(renderRightIcon)) {
            rightIcon = renderRightIcon(state.currentIndex)
          }
        } else rightIcon = <IconArrowRight></IconArrowRight>
        templates.push(
          <div
            class={[
              prefix + '-image-preview-icon',
              prefix + '-image-preview-next',
              state.isHideMenu && prefix + '-image-preview-hide'
            ]}
            onClick={handleNext}
          >
            {rightIcon}
          </div>
        )
      }
      return templates
    }
    const renderHeader = () => {
      if (isFunction(props.renderHeader)) {
        const title = state.scopeImageTitles[state.currentIndex] || props.previewTitle || ''
        return props.renderHeader(title)
      }
      return props.previewTitle
    }
    const attrs = useAttrs()
    return () => {
      // 存在子节点情况
      let defaultTemplates = ctx.slots.default?.()
      if (defaultTemplates && defaultTemplates.length > 0) {
        defaultTemplates = [
          <div
            {...attrs}
            id={`${prefix}-image-preview-group-xqnf`}
            class={`${prefix}-image-preview-group`}
          >
            {defaultTemplates}
          </div>
        ]
      }
      if (!state.viewerVisible) {
        return [defaultTemplates]
      }
      const footerCls = [
        prefix + '-image-preview-footer',
        prefix + '-image-preview-footer-wrapper',
        state.isHideMenu && prefix + '-image-preview-hide',
        prefix + '-image-preview-footer-content'
      ]
      const { closable, crossOrigin, getPopupContainer } = props
      const previewWrapper = (
        <Portal
          triggerElementRef={state.triggerElementRef!}
          zIndex={props.zIndex}
          getPopupContainer={props.getPopupContainer}
          closeOnEsc={props.closeOnEsc}
          onKeyEsc={handleKeyEsc}
          style={getPopupContainer ? { position: 'static' } : {}}
        >
          <div
            onWheel={handleWheel}
            onClick={handleClickRoot}
            onMousemove={() => cancelNotHandle()}
            class={[
              `${prefix}-image-preview`,
              getPopupContainer && `${prefix}-image-preview-popup`,
              props.previewCls
            ]}
            ref={(node) => (state.triggerElementRef = node as HTMLElement)}
            style={props.previewStyle}
            {...attrs}
          >
            <section
              class={[
                `${prefix}-image-preview-header`,
                state.isHideMenu && prefix + '-image-preview-hide'
              ]}
            >
              <section class={`${prefix}-image-preview-header-title`}>{renderHeader()}</section>
              {closable && (
                <section class={`${prefix}-image-preview-header-close`} onClick={handleClickClose}>
                  {renderCloseIcon()}
                </section>
              )}
            </section>
            <div class={`${prefix}-image-preview-image`}>
              <img
                crossorigin={crossOrigin}
                class={`${prefix}-image-preview-image-img`}
                style={previewStyle.value}
                ref={(node) => (imageRef = node as HTMLImageElement)}
                onLoad={handleImageLoad}
                onError={() => {
                  state.currentImageLoading = false
                }}
                src={currentImageUrl.value}
              />
              {state.currentImageLoading && (
                <div class={`${prefix}-image-preview-image-spin`}>
                  <Spin size="large"></Spin>
                </div>
              )}
            </div>
            {getImagesUrls.value.length && renderPageHandle()}
            <section class={footerCls}>{renderPreviewMenu()}</section>
          </div>
        </Portal>
      )
      return [defaultTemplates, previewWrapper]
    }
  },
  inheritAttrs: false,
  props: imagePreviewProps,
  emits: imagePreviewEmits,
  name: prefix + '-image-preview'
})
export default imagePreview
export type ImagePreviewPropsTypes = ExtractPropTypes<typeof imagePreviewProps>
export type ImagePreviewPublicPropTypes = ExtractPublicPropTypes<typeof imagePreviewProps>
