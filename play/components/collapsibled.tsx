import { defineComponent, ref } from 'vue'

const Collapsible = defineComponent({
  name: 'CollapsibleDemo',
  setup() {
    const isOpen = ref(false)
    const toggle = () => {
      isOpen.value = !isOpen.value
    }
    const collapsed = (
      <ul>
        <li>
          <p>Semi Design 以内容优先进行设计。</p>
        </li>
        <li>
          <p>更容易地自定义主题。</p>
        </li>
        <li>
          <p>适用国际化场景。</p>
        </li>
        <li>
          <p>效率场景加入人性化关怀。</p>
        </li>
      </ul>
    )
    return () => {
      return (
        <div>
          <tempui-button onClick={toggle}>Toggle</tempui-button>
          <tempui-collapsible isOpen={isOpen.value}>{collapsed}</tempui-collapsible>
        </div>
      )
    }
  }
})

export default Collapsible
