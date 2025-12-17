import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const showDialog = ref(true)
    const handleShowDialog = () => {
      showDialog.value = true
    }
    return () => {
      return (
        <div>
          <tempui-button onClick={handleShowDialog}>打开弹窗</tempui-button>
          <tempui-locale-provider>
            <tempui-modal title="标题" visible={showDialog.value}>
              <div>
                This is the content of a basic modal.
                <br />
                More content...
              </div>
            </tempui-modal>
          </tempui-locale-provider>
        </div>
      )
    }
  },
  name: 'ModalDemo'
})
