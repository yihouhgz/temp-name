import { defineComponent, h } from 'vue'
import { prefix } from 'constants/config'
import { buttonGroupProps } from './type'
import './style/button'

const ButtonGroup = defineComponent({
  name: prefix + '-button-group',
  props: buttonGroupProps,
  setup(props, { slots }) {
    return () => {
      const { disabled, size, theme, type } = props
      const buttons = slots.default?.() || []
      const template = []
      let index = 0
      for (const button of buttons) {
        template.push(h(button, { disabled, size, theme, type }))
        if (index < buttons.length - 1) {
          const lineClass = [
            prefix + '-button-group-line',
            prefix + '-button-group-line-' + theme,
            prefix + '-button-group-line-' + type
          ]
          template.push(<span class={lineClass}></span>)
        }
        index++
      }
      return <div class={prefix + '-button-group'}>{template}</div>
    }
  }
})
export default ButtonGroup
