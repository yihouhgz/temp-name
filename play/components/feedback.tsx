import { defineComponent, ref } from 'vue'
const BannerDemo = defineComponent({
  setup() {
    const visible = ref(false)
    const handleOk = () => {
      visible.value = false
    }
    const handleCancel = () => {
      visible.value = false
    }
    const onValueChange = (value: unknown) => {
      console.log(value)
    }
    return () => {
      return (
        <div>
          <tempui-button onClick={() => (visible.value = !visible.value)}>
            展示反馈: Popup, emoji
          </tempui-button>
          <tempui-feedback
            title="您对本产品的评分是？"
            visible={visible.value}
            onOk={handleOk}
            onCancel={handleCancel}
            onValueChange={onValueChange}
          />
        </div>
      )
    }
  },
  name: 'BannerDemo'
})
export default BannerDemo
