import { defineComponent } from 'vue'

const CheckboxDemo = defineComponent({
  setup() {
    const plainOptions = ['抖音', '火山', '皮皮虾']
    const options = [
      { label: '追求极致', value: '1', extra: '不断提高要求，延迟满足感，在更大范围里找最优解' },
      {
        label: '务实敢为',
        value: '2',
        extra:
          '直接体验，深入事实；不自嗨，注重效果；能突破有担当，打破定式；尝试多种可能，快速迭代'
      },
      {
        label: '开放谦逊',
        value: '3',
        extra:
          '内心阳光，信任伙伴；乐于助人和求助，合作成大事;格局大，上个台阶想问题；对外敏锐谦虚，ego小，听得进意见'
      },
      {
        label: '坦诚清晰',
        value: '4',
        extra:
          '敢当面表达真实想法；能承认错误，不装不爱面子；实事求是，暴露问题，反对“向上管理”；准确、简洁、直接，有条理有重点'
      }
    ]
    const optionsWithDisabled = [
      { label: 'Photography', value: 'Photography' },
      { label: 'Movies', value: 'Movies' },
      { label: 'Running', value: 'Running', disabled: false }
    ]
    return () => (
      <div style="margin-top:20px">
        <tempui-checkbox>Checkbox</tempui-checkbox>
        <tempui-checkbox
          aria-label="Checkbox 示例"
          extra="Semi Design 是由抖音前端团队与 UED 团队共同设计开发并维护的设计系统"
        >
          tempui Design
        </tempui-checkbox>
        <tempui-checkbox defaultChecked={false} disabled aria-label="Checkbox 示例">
          Unchecked Disabled
        </tempui-checkbox>
        <br />
        <tempui-checkbox defaultChecked disabled aria-label="Checkbox 示例">
          Checked Disabled
        </tempui-checkbox>
        <div>
          <tempui-checkbox-group
            style={{ width: '100%' }}
            defaultValue={['A', 'B']}
            aria-label="CheckboxGroup 示例"
          >
            <tempui-checkbox value="A">A</tempui-checkbox>
            <tempui-checkbox value="B">B</tempui-checkbox>
            <tempui-checkbox value="C">C</tempui-checkbox>
            <tempui-checkbox value="D">D</tempui-checkbox>
            <tempui-checkbox value="E">E</tempui-checkbox>
          </tempui-checkbox-group>
        </div>
        <div>
          <tempui-checkbox-group
            options={plainOptions}
            defaultValue={['抖音']}
            aria-label="CheckboxGroup 示例"
          />
          <br />
          <br />
          <tempui-checkbox-group
            options={options}
            defaultValue={[]}
            aria-label="CheckboxGroup 示例"
          />
          <br />
          <br />
          <tempui-checkbox-group
            name="checkbox-group"
            options={optionsWithDisabled}
            disabled
            defaultValue={['Photography']}
            aria-label="Checkbox 示例"
          />
        </div>

        <tempui-checkbox-group
          type="card"
          defaultValue={['1', '3']}
          direction="vertical"
          aria-label="CheckboxGroup 示例"
        >
          <tempui-checkbox
            value={'1'}
            disabled
            extra="Semi Design 是由抖音前端团队与 UED 团队共同设计开发并维护的设计系统"
            style={{ width: 280 }}
          >
            单选框标题
          </tempui-checkbox>
          <tempui-checkbox
            value={'2'}
            disabled
            extra="Semi Design 是由抖音前端团队与 UED 团队共同设计开发并维护的设计系统"
            style={{ width: 280 }}
          >
            单选框标题
          </tempui-checkbox>
          <tempui-checkbox
            value={'3'}
            extra="Semi Design 是由抖音前端团队与 UED 团队共同设计开发并维护的设计系统"
            style={{ width: 280 }}
          >
            单选框标题
          </tempui-checkbox>
          <tempui-checkbox
            value={'4'}
            extra="Semi Design 是由抖音前端团队与 UED 团队共同设计开发并维护的设计系统"
            style={{ width: 280 }}
          >
            单选框标题
          </tempui-checkbox>
        </tempui-checkbox-group>

        <tempui-checkbox-group
          type="pureCard"
          defaultValue={['1', '3']}
          direction="vertical"
          aria-label="CheckboxGroup 示例"
        >
          <tempui-checkbox
            value={'1'}
            disabled
            extra="Semi Design 是由抖音前端团队与 UED 团队共同设计开发并维护的设计系统"
            style={{ width: 280 + 'px' }}
          >
            单选框标题
          </tempui-checkbox>
          <tempui-checkbox
            value={'2'}
            disabled
            extra="Semi Design 是由抖音前端团队与 UED 团队共同设计开发并维护的设计系统"
            style={{ width: 280 + 'px' }}
          >
            单选框标题
          </tempui-checkbox>
          <tempui-checkbox
            value={'3'}
            extra="Semi Design 是由抖音前端团队与 UED 团队共同设计开发并维护的设计系统"
            style={{ width: 280 + 'px' }}
          >
            单选框标题
          </tempui-checkbox>
          <tempui-checkbox
            value={'4'}
            extra="Semi Design 是由抖音前端团队与 UED 团队共同设计开发并维护的设计系统"
            style={{ width: 280 + 'px' }}
          >
            单选框标题
          </tempui-checkbox>
        </tempui-checkbox-group>
      </div>
    )
  },
  name: 'CheckboxDemo'
})

export default CheckboxDemo
