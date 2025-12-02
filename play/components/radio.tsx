import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RadioDemo',
  setup() {
    return () => {
      return (
        <div>
          <div>
            <tempui-radio aria-label="单选示例" name="demo-radio">
              Radio
            </tempui-radio>
          </div>
          <br />
          <tempui-radio
            extra="Semi Design 是由抖音前端团队与 UED 团队共同设计开发并维护的设计系统"
            aria-label="单选示例"
            name="demo-radio-extra"
          >
            Semi Design
          </tempui-radio>
          <br />
          <tempui-radio disabled aria-label="单选示例" name="demo-radio">
            Radio
          </tempui-radio>
          <br />
          <br />
          <tempui-radio mode="advanced" aria-label="单选示例" name="demo-radio-advanced">
            允许取消选择
          </tempui-radio>
        </div>
      )
    }
  }
})
