import { defineComponent, watchEffect, ref, computed } from 'vue'
import { prefix } from 'constants/config'
import './style/icon'
const iconProps = {
  name: {
    type: String,
    required: true
  },
  size: {
    type: String,
    default: 'default',
    require: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
}
const loadSvg = async (name: string) => {
  try {
    const module = await import(/* @vite-ignore */ `./svgs/${name}.svg`)
    return module.default
  } catch {
    return null
  }
}
const svgDataUriToHtml = (dataUri: string) => {
  let svgContent = dataUri.replace('data:image/svg+xml,', '')
  svgContent = decodeURIComponent(svgContent)
  return svgContent
}
const Icon = defineComponent({
  name: prefix + '-icon',
  props: iconProps,
  emits: ['click'],
  setup(props, ctx) {
    const svgContent = ref<string | undefined>()
    watchEffect(async () => {
      if (props.name) {
        const dataUri = await loadSvg(props.name)
        if (dataUri) {
          svgContent.value = svgDataUriToHtml(dataUri)
        }
      }
    })
    const iconClass = computed(() => {
      return [
        `${prefix}-icon`,
        {
          [`${prefix}-icon-${props.size}`]: props.size,
          [`${prefix}-icon-disabled`]: props.disabled
        }
      ]
    })
    const handleClick = (e: MouseEvent) => {
      // props.onClick?.(e)
      ctx.emit('click', e)
    }
    return () => {
      return (
        <span class={iconClass.value} innerHTML={svgContent.value} onClick={handleClick}></span>
      )
    }
  }
})
export { iconProps }
export default Icon
