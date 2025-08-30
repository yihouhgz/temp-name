import { defineComponent, computed, onMounted, ref } from 'vue'
import { prefix } from 'constants/config'
import { avatarProps, avatarEmits } from './type'
import './style/avatar'
const Avatar = defineComponent({
  setup(props, ctx) {
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
    onMounted(() => {})
    return () => {
      if (props.src) {
        return (
          <span class={wrapperClass.value} {...ctx.attrs}>
            <img
              class="tempui-avatar-img"
              src={props.src}
              srcset={props.srcSet}
              alt={props.alt}
              {...props.imgAttr}
            />
          </span>
        )
      }
      return (
        <span class={wrapperClass.value} {...ctx.attrs} ref={container}>
          <span class="tempui-avatar-content" style={computedScale.value}>
            <span class="tempui-avatar-label">{ctx.slots.default?.()}</span>
          </span>
        </span>
      )
    }
  },
  name: prefix + '-avatar',
  props: avatarProps,
  emits: avatarEmits
})

export default Avatar
