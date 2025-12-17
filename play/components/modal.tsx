import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return () => {
      return (
        <div>
          <tempui-locale-provider>
            <tempui-modal title="标题" visible={true}>
              <div>
                <p>内容</p>
                <p>内容</p>
                <p>内容</p>
                <p>内容</p>
                <p>内容</p>
                <p>内容</p>
                <p>内容</p>
                <p>内容</p>
                <p>内容</p>
                <p>内容</p>
                <p>内容</p>
                <p>内容</p>
                <p>内容</p>
              </div>
            </tempui-modal>
          </tempui-locale-provider>
        </div>
      )
    }
  },
  name: 'ModalDemo'
})
