import { defineComponent } from 'vue'

const CheckboxDemo = defineComponent({
  setup() {
    return () => (
      <div>
        <tempui-checkbox>Checkbox</tempui-checkbox>
      </div>
    )
  },
  name: 'CheckboxDemo'
})

export default CheckboxDemo
