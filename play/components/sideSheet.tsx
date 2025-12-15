import { defineComponent, ref } from 'vue'
const SideSheetDemo = defineComponent({
  setup() {
    const visible = ref(false)
    const onValueChange = (value: unknown) => {
      console.log(value)
      visible.value = !visible.value
    }
    const placement = ref('right')
    const changePlacement = (e: { target: HTMLInputElement }) => {
      placement.value = e.target.value
    }
    const visible1 = ref(false)
    const change = () => {
      visible1.value = !visible1.value
    }
    return () => {
      return (
        <div>
          <tempui-button onClick={onValueChange}>展示反馈: Popup, emoji</tempui-button>
          <tempui-side-sheet title="滑动侧边栏" visible={visible.value} onCancel={onValueChange}>
            <p>This is the content of a basic sidesheet.</p>
            <p>Here is more content...</p>
          </tempui-side-sheet>
          <br />
          <tempui-radio-group onChange={changePlacement} value={placement.value}>
            <tempui-radio value={'right'}>right</tempui-radio>
            <tempui-radio value={'left'}>left</tempui-radio>
            <tempui-radio value={'top'}>top</tempui-radio>
            <tempui-radio value={'bottom'}>bottom</tempui-radio>
          </tempui-radio-group>
          <br />
          <br />
          <tempui-button onClick={change}>Open SideSheet</tempui-button>
          <tempui-side-sheet
            title="滑动侧边栏"
            visible={visible1.value}
            onCancel={change}
            placement={placement.value}
            keepDOM
          >
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
