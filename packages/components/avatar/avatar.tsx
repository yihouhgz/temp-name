import { defineComponent, computed, ref, type StyleValue } from 'vue'
import { prefix } from 'constants/config'
import { avatarProps, avatarEmits } from './type'
import './style/avatar'
import { reactive } from 'vue'
import { isFunction } from '../_util'
const Avatar = defineComponent({
  setup(props, ctx) {
    const avatarData = reactive({
      showHoverMask: false
    })
    const container = ref<HTMLElement>()
    const wrapperClass = computed(() => {
      return [
        'tempui-avatar',
        `tempui-avatar-${props.shape}`,
        `tempui-avatar-${props.size}`,
        props.src ? `tempui-avatar-img` : `tempui-avatar-${props.color}`
      ]
    })
    const computedScale = computed(() => {
      const gap = props.gap
      const containerEl = container.value as HTMLElement
      const stringEl = container.value?.firstChild as HTMLSpanElement
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
          <span class="tempui-avatar-content" style={computedScale.value}>
            <span class="tempui-avatar-label">{ctx.slots.default?.()}</span>
          </span>
          {showHoverMaskComputed.value && (
            <span class="tempui-avatar-hover">{hoverMaskRender()}</span>
          )}
        </>
      )
      if (props.src) {
        content = (
          <>
            <img
              class="tempui-avatar-img"
              src={props.src}
              alt={props.alt}
              {...props.imgAttr}
              style={computedScale.value}
            />
            {showHoverMaskComputed.value && (
              <span class="tempui-avatar-hover">{hoverMaskRender()}</span>
            )}
          </>
        )
      }
      const avatarBase = (
        <span
          class={wrapperClass.value}
          {...ctx.attrs}
          ref={container}
          onClick={handleClick}
          onMouseenter={handleMouseEnter}
          onMouseleave={handleMouseLeave}
        >
          {content}
        </span>
      )
      if (props.border || props.topSlot || props.bottomSlot) {
        const style: StyleValue = { position: 'relative', margin: 'inherit' }
        const borderColor = props.border?.color
        const getBorderClass = (): string[] => {
          return [
            'tempui-avatar-border',
            `tempui-avatar-border-${props.size}`,
            `tempui-avatar-${props.shape}`
          ]
        }
        const mergnStyle = {
          style: borderColor ? { borderColor: borderColor } : null,
          class: getBorderClass()
        }
        return (
          <div class="tempui-avatar-wrapper" {...ctx.attrs}>
            <div style={style}>
              {avatarBase}
              {props.border && <span {...mergnStyle}></span>}
              {props.border && Boolean(props.border.motion) && (
                <span {...mergnStyle} class="tempui-avatar-border-animated"></span>
              )}
            </div>
            {props.topSlot && <div class="tempui-avatar-top">{props.topSlot.render}</div>}
            {props.bottomSlot && <div class="tempui-avatar-bottom">{props.bottomSlot.render}</div>}
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
