import { defineComponent, ref } from 'vue'
const SideSheetDemo = defineComponent({
  setup() {
    const visible = ref(false)
    const onValueChange = (value: unknown) => {
      console.log(value)
    }
    return () => {
      return (
        <div>
          <tempui-button onClick={() => (visible.value = !visible.value)}>
            展示反馈: Popup, emoji
          </tempui-button>
          <tempui-side-sheet title="滑动侧边栏" visible={visible} onCancel={onValueChange}>
            <p>This is the content of a basic sidesheet.</p>
            <p>Here is more content...</p>
          </tempui-side-sheet>
        </div>
      )
    }
  },
  name: 'SideSheetDemo'
})
export default SideSheetDemo
