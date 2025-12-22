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
          <div>
            <tempui-collapse>
              <tempui-collapse-panel header="This is panel header 1" itemKey="1">
                <p>Hi, bytedance dance dance. This is the docsite of Semi UI. </p>
              </tempui-collapse-panel>
              <tempui-collapse-panel header="This is panel header 2" itemKey="2">
                <p>Hi, bytedance dance dance. This is the docsite of Semi UI. </p>
              </tempui-collapse-panel>
              <tempui-collapse-panel header="This is panel header 3" itemKey="3">
                <p>Hi, bytedance dance dance. This is the docsite of Semi UI. </p>
              </tempui-collapse-panel>
            </tempui-collapse>
          </div>
        </div>
      )
    }
  }
})

export default Collapsible
