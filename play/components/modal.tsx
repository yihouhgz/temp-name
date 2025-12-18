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
                <tempui-numeral precision={1}>
                  <p>点赞量：1.6111e1 K</p>
                </tempui-numeral>
                <p>
                  播放量:
                  <tempui-numeral rule="numbers" precision={1}>
                    2.4444e2
                  </tempui-numeral>
                  K
                </p>
                <tempui-numeral
                  rule="percentages"
                  precision={2}
                  style={{ marginBottom: 12 + 'px' }}
                >
                  <p>好评率: 0.915</p>
                </tempui-numeral>
                <tempui-numeral rule="percentages" style={{ marginBottom: 12 + 'px' }}>
                  这场比赛我的胜率是0.6，输的概率是0.4
                </tempui-numeral>
                <tempui-numeral rule="bytes-decimal" precision={2} truncate="floor">
                  <p>已使用: 1000</p>
                  <p>未使用: {1024 * 1000}</p>
                </tempui-numeral>
                <tempui-numeral rule="bytes-binary" precision={2} truncate="floor">
                  <p>已使用: 1024</p>
                  <p>未使用: {2e12}</p>
                </tempui-numeral>
              </div>
            </tempui-modal>
          </tempui-locale-provider>
        </div>
      )
    }
  },
  name: 'ModalDemo'
})
