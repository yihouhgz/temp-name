import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RadioDemo',
  setup() {
    const state = {
      value1: 'Guest',
      value2: 'Developer',
      value3: 'Maintainer'
    }
    const plainOptions = ['Guest', 'Developer', 'Maintainer']
    const options = [
      { label: 'Guest', value: 'Guest', extra: 'Semi Design', style: { width: 120 } },
      { label: 'Developer', value: 'Developer', extra: 'Semi Design', style: { width: 120 } },
      { label: 'Maintainer', value: 'Maintainer', extra: 'Semi Design', style: { width: 120 } }
    ]
    const optionsWithDisabled = [
      { label: 'Guest', value: 'Guest' },
      { label: 'Developer', value: 'Developer' },
      { label: 'Maintainer', value: 'Maintainer', disabled: true }
    ]
    const onChange1 = (value: unknown) => {
      console.log(value)
    }
    const onChange2 = (value: unknown) => {
      console.log(value)
    }
    const onChange3 = (value: unknown) => {
      console.log(value)
    }

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
          <br />
          <tempui-space vertical align="start" spacing="loose">
            <tempui-radio-group
              options={plainOptions}
              onChange={onChange1}
              value={state.value1}
              aria-label="单选组合示例"
              name="demo-radio-group-1"
            />
            <tempui-radio-group
              options={optionsWithDisabled}
              onChange={onChange2}
              value={state.value2}
              aria-label="单选组合示例"
              name="demo-radio-group-2"
            />
            <tempui-radio-group
              options={options}
              onChange={onChange3}
              value={state.value3}
              aria-label="单选组合示例"
              name="demo-radio-group-3"
            />
          </tempui-space>
          <br />
          <tempui-radio-group value={2} aria-label="单选组合示例" name="demo-radio-group">
            <tempui-radio value={1}>A</tempui-radio>
            <tempui-radio value={2}>B</tempui-radio>
            <tempui-radio value={3}>C</tempui-radio>
            <tempui-radio value={4}>D</tempui-radio>
          </tempui-radio-group>
          <br />

          <tempui-radio mode="advanced" type="button">
            button A
          </tempui-radio>
          <br />
          <br />
          <tempui-space vertical spacing="loose" align="start">
            <tempui-radio-group
              type="button"
              buttonSize="small"
              defaultValue={1}
              aria-label="单选组合示例"
              name="demo-radio-small"
              disabled
            >
              <tempui-radio value={1}>即时推送</tempui-radio>
              <tempui-radio value={2}>定时推送</tempui-radio>
              <tempui-radio value={3}>动态推送</tempui-radio>
            </tempui-radio-group>
            <tempui-radio-group
              type="button"
              buttonSize="middle"
              defaultValue={1}
              aria-label="单选组合示例"
              name="demo-radio-middle"
            >
              <tempui-radio value={1}>即时推送</tempui-radio>
              <tempui-radio value={2}>定时推送</tempui-radio>
              <tempui-radio value={3}>动态推送</tempui-radio>
            </tempui-radio-group>
            <tempui-radio-group
              type="button"
              buttonSize="large"
              defaultValue={1}
              aria-label="单选组合示例"
              name="demo-radio-large"
            >
              <tempui-radio value={1}>即时推送</tempui-radio>
              <tempui-radio value={2}>定时推送</tempui-radio>
              <tempui-radio value={3}>动态推送</tempui-radio>
            </tempui-radio-group>
          </tempui-space>
        </div>
      )
    }
  }
})
