import { defineComponent, computed, ref, type StyleValue } from 'vue'
import { prefix } from 'constants/config'
import { avatarProps, avatarEmits, type AvatarSizeType } from './type'
import './style/avatar'
import { reactive } from 'vue'
import { hasPropsOrSlots, isFunction, isNumber, isString, renderVnode } from '../_util'
import TopSlotIcon from './top-slot-icon'
import { baseBorderZIndex, marginBorder } from './constant'
import { getCurrentInstance } from 'vue'
const Avatar = defineComponent({
  setup(props, ctx) {
    const avatarData = reactive({
      showHoverMask: false
    })
    const container = ref<HTMLElement>()
    const baseClass = computed(() => {
      return [
        `${prefix}-avatar`,
        `${prefix}-avatar-${props.shape}`,
        { [`${prefix}-avatar-${props.size}`]: isString(props.size) },
        props.src ? `${prefix}-avatar-img` : `${prefix}-avatar-${props.color}`,
        {
          [`${prefix}-avatar-animated`]: props.contentMotion
        }
      ]
    })
    const computedScale = computed(() => {
      const gap = props.gap
      const containerEl = container.value as HTMLElement
      const stringEl = container.value?.firstElementChild as HTMLSpanElement
      if (stringEl && containerEl && gap) {
        const [nodeWidth, stringNodeWidth] = [
          containerEl?.offsetWidth || 0,
          stringEl?.offsetWidth || 0
        ]
        if (nodeWidth !== 0 && stringNodeWidth !== 0 && gap * 2 < nodeWidth) {
          const scale =
            nodeWidth - gap * 2 > stringNodeWidth ? 1 : (nodeWidth - gap * 2) / stringNodeWidth
          return {
            transform: `scale(${scale})`
          }
        }
      }
      return {}
    })

    const handleClick = (e: MouseEvent) => {
      props.onClick?.(e)
    }
    const handleMouseEnter = (e: MouseEvent) => {
      if (props.hoverMask) {
        avatarData.showHoverMask = true
      }
      props.onMouseEnter?.(e)
    }
    const handleMouseLeave = (e: MouseEvent) => {
      if (props.hoverMask) {
        avatarData.showHoverMask = false
      }
      props.onMouseLeave?.(e)
    }
    const showHoverMaskComputed = computed(() => {
      if (props.hoverMask) {
        return avatarData.showHoverMask
      }
      return false
    })
    const vm = getCurrentInstance()
    return () => {
      const hoverMaskRender = () => {
        if (props.hoverMask) {
          if (isFunction(props.hoverMask)) {
            return props.hoverMask()
          }
          return props.hoverMask
        }
        return null
      }
      let content = (
        <>
          <span class={`${prefix}-avatar-content`} style={computedScale.value}>
            <span class={`${prefix}-avatar-label`}>{ctx.slots.default?.()}</span>
          </span>
          {showHoverMaskComputed.value && (
            <span class={`${prefix}-avatar-hover`}>{hoverMaskRender()}</span>
          )}
        </>
      )
      if (props.src) {
        content = (
          <>
            <img
              class={`${prefix}-avatar-img`}
              src={props.src}
              alt={props.alt}
              {...props.imgAttr}
              style={computedScale.value}
            />
            {showHoverMaskComputed.value && (
              <span class={`${prefix}-avatar-hover`}>{hoverMaskRender()}</span>
            )}
          </>
        )
      }
      const showWrapper = props.border || props.topSlot || props.bottomSlot
      const baseAttrs = showWrapper ? {} : ctx.attrs
      const handlerAttrs = showWrapper
        ? {}
        : {
            onClick: handleClick,
            onMouseenter: handleMouseEnter,
            onMouseleave: handleMouseLeave
          }
      const baseStyle: StyleValue = {}
      if (isNumber(props.size)) {
        baseStyle.width = `${props.size}px`
        baseStyle.height = `${props.size}px`
      }
      if (props.border && !hasPropsOrSlots('topSlot', vm)) {
        baseStyle.position = 'relative'
        baseStyle.zIndex = baseBorderZIndex
      }
      const avatarBase = (
        <span
          class={baseClass.value}
          style={baseStyle}
          {...baseAttrs}
          ref={(node) => (container.value = node as HTMLElement)}
          {...handlerAttrs}
        >
          {content}
        </span>
      )
      if (showWrapper) {
        const style: StyleValue = { position: 'relative', margin: 'inherit' }
        const borderColor = props.border?.color
        const getBorderClass = (): string[] => {
          return [
            `${prefix}-avatar-border`,
            isString(props.size) ? `${prefix}-avatar-border-${props.size}` : '',
            `${prefix}-avatar-${props.shape}`
          ]
        }
        const mergnStyle: {
          style?: { width?: string; height?: string; borderColor: string }
          class: string[]
        } = {
          style: borderColor ? { borderColor: borderColor } : undefined,
          class: getBorderClass()
        }
        if (isNumber(props.size)) {
          if (mergnStyle.style) {
            mergnStyle.style.width = `${props.size + marginBorder}px`
            mergnStyle.style.height = `${props.size + marginBorder}px`
          }
        }
        const renderTopSlot = () => {
          const topSlot = props.topSlot
          if (!topSlot) return null
          if (topSlot?.render) return renderVnode(topSlot.render)
          const optionStyle: StyleValue = {}
          if (topSlot.textColor) optionStyle.color = topSlot.textColor

          const slotWrapperClass = [
            `${prefix}-avatar-top-slot`,
            { [topSlot.className]: Boolean(topSlot.className) },
            { [`${prefix}-avatar-animated`]: props.contentMotion }
          ]
          const slotWrapperStyle: StyleValue = topSlot.style
          const bgClass = [
            `${prefix}-avatar-top-slot-bg`,
            `${prefix}-avatar-top-slot-bg-${props.size}`
          ]
          const bgSvgClass = [
            `${prefix}-avatar-top-slot-bg-svg`,
            `${prefix}-avatar-top-slot-bg-svg-${props.size}`
          ]
          const gradientStart = topSlot.gradientStart ?? `var(--${prefix}-color-primary)`
          const gradientEnd = topSlot.gradientEnd ?? `var(--${prefix}-color-primary)`
          const exclusion = ['extra-extra-small', 'extra-small'] as AvatarSizeType[]

          const contentClass = [
            `${prefix}-avatar-top-slot-content`,
            `${prefix}-avatar-top-slot-content-${props.size}`
          ]
          return (
            <div class={slotWrapperClass} style={slotWrapperStyle}>
              {!exclusion.includes(props.size as AvatarSizeType) && (
                <div class={bgClass}>
                  <div class={bgSvgClass}>
                    <TopSlotIcon
                      gradientStart={gradientStart}
                      gradientEnd={gradientEnd}
                    ></TopSlotIcon>
                  </div>
                </div>
              )}
              <div style={optionStyle} class={`${prefix}-avatar-top-slot-content-wrapper`}>
                <span class={contentClass}>{renderVnode(topSlot.text)}</span>
              </div>
            </div>
          )
        }
        const renderBottomSlot = () => {
          const bottomSlot = props.bottomSlot
          if (!bottomSlot) return null
          if (bottomSlot?.render) return renderVnode(bottomSlot.render)
          const optionStyle: StyleValue = {}
          if (bottomSlot.bgColor) optionStyle.backgroundColor = bottomSlot.bgColor
          if (bottomSlot.textColor) optionStyle.color = bottomSlot.textColor
          const optionClass = [
            `${prefix}-avatar-bottom-slot-shape-${bottomSlot.shape ?? props.shape}`,
            `${prefix}-avatar-bottom-slot-shape-circle-${props.size}`
          ]
          const slotWrapperClass = [
            `${prefix}-avatar-bottom-slot`,
            { [bottomSlot.className]: Boolean(bottomSlot.className) }
          ]
          const slotWrapperStyle: StyleValue = bottomSlot.style
          return (
            <div class={slotWrapperClass} style={slotWrapperStyle}>
              <span style={optionStyle} class={optionClass}>
                {renderVnode(bottomSlot.text)}
              </span>
            </div>
          )
        }
        const showSopSlot = props.topSlot && isString(props.size)
        const showBottomSlot = props.bottomSlot && isString(props.size)
        return (
          <div
            class={`${prefix}-avatar-wrapper`}
            {...ctx.attrs}
            onClick={handleClick}
            onMouseenter={handleMouseEnter}
            onMouseleave={handleMouseLeave}
          >
            <div style={style}>
              {avatarBase}
              {props.border && <span {...mergnStyle}></span>}
              {props.border && Boolean(props.border.motion) && (
                <span {...mergnStyle} class={`${prefix}-avatar-border-animated`}></span>
              )}
            </div>
            {showSopSlot && renderTopSlot()}
            {showBottomSlot && renderBottomSlot()}
          </div>
        )
      }
      return avatarBase
    }
  },
  name: prefix + '-avatar',
  props: avatarProps,
  emits: avatarEmits
})

export default Avatar
