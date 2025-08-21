import { ref, defineComponent, watchEffect } from 'vue'
import { Button } from '../dist'
import './styles/app.scss'
const App = defineComponent(() => {
  const loading = ref(false)
  const inputvalue = ref('llll')
  watchEffect(() => {
    console.log(inputvalue.value)
  })
  const handleClick = () => {
    loading.value = true
    setTimeout(() => {
      loading.value = false
    }, 3000)
  }
  const CameraIcon = () => {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        focusable="false"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M7.45 3.1A2 2 0 0 1 9.24 2h5.52a2 2 0 0 1 1.8 1.1L17.5 5H20a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3h2.5l.95-1.9ZM9 13a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z"
          fill="currentColor"
        ></path>
      </svg>
    )
  }
  return () => (
    <div>
      <div>
        <Button type="primary">确定</Button>
        <nl-button
          loading={loading.value}
          onClick={handleClick}
          icon={CameraIcon}
          v-slots={{ icon: CameraIcon }}
        >
          我是按钮
        </nl-button>
        <nl-button
          type="secondary"
          size="small"
          icon={CameraIcon}
          loading={loading.value}
          onClick={handleClick}
        >
          我是按钮
        </nl-button>
        <nl-button type="tertiary">我是按钮</nl-button>
        <nl-button type="warning">我是按钮</nl-button>
        <nl-button type="danger">商品买断</nl-button>
      </div>
      <div style="margin-top: 20px;width: 300px;">
        <nl-input
          placeholder="请输入内容"
          validateStatus={inputvalue.value.length < 10 ? 'error' : 'default'}
          showClear
          v-model={inputvalue.value}
        ></nl-input>
      </div>
      <div class="margin-top: 20px;">
        <nl-icon name="camera"></nl-icon>
      </div>
      <div class="margin-top: 20px;">
        <nl-row gutter={[16, 24]}>
          {[1, 2, 3, 4, 5, 6].map((item, index) => (
            <nl-col
              span={6}
              offset={index == 1 ? 6 : undefined}
              key={item}
              style="background: rgba(234,245,255, 1);min-height:30px;border: 1px solid rgba(152,205,253, 1);line-height: 30px"
            >
              <div style="background: rgb(203, 231, 254);height:100%;height:30px"></div>
            </nl-col>
          ))}
        </nl-row>
      </div>
      <div class="grid">
        <p>sub-element align left</p>
        <nl-row type="flex" justify="start">
          <nl-col span={4}>
            <div class="col-content">nl-col-4</div>
          </nl-col>
          <nl-col span={4}>
            <div class="col-content">nl-col-4</div>
          </nl-col>
          <nl-col span={4}>
            <div class="col-content">nl-col-4</div>
          </nl-col>
          <nl-col span={4}>
            <div class="col-content">nl-col-4</div>
          </nl-col>
        </nl-row>

        <p>sub-element align center</p>
        <nl-row type="flex" justify="center">
          <nl-col span={4}>
            <div class="col-content">nl-col-4</div>
          </nl-col>
          <nl-col span={4}>
            <div class="col-content">nl-col-4</div>
          </nl-col>
          <nl-col span={4}>
            <div class="col-content">nl-col-4</div>
          </nl-col>
          <nl-col span={4}>
            <div class="col-content">nl-col-4</div>
          </nl-col>
        </nl-row>

        <p>sub-element align right</p>
        <nl-row type="flex" justify="end">
          <nl-col span={4}>
            <div class="col-content">nl-col-4</div>
          </nl-col>
          <nl-col span={4}>
            <div class="col-content">nl-col-4</div>
          </nl-col>
          <nl-col span={4}>
            <div class="col-content">nl-col-4</div>
          </nl-col>
          <nl-col span={4}>
            <div class="col-content">nl-col-4</div>
          </nl-col>
        </nl-row>

        <p>sub-element monospaced arrangement</p>
        <nl-row type="flex" justify="space-between">
          <nl-col span={4}>
            <div class="col-content">nl-col-4</div>
          </nl-col>
          <nl-col span={4}>
            <div class="col-content">nl-col-4</div>
          </nl-col>
          <nl-col span={4}>
            <div class="col-content">nl-col-4</div>
          </nl-col>
          <nl-col span={4}>
            <div class="col-content">nl-col-4</div>
          </nl-col>
        </nl-row>

        <p>sub-element align full</p>
        <nl-row type="flex" justify="space-around">
          <nl-col span={4}>
            <div class="col-content">nl-col-4</div>
          </nl-col>
          <nl-col span={4}>
            <div class="col-content">nl-col-4</div>
          </nl-col>
          <nl-col span={4}>
            <div class="col-content">nl-col-4</div>
          </nl-col>
          <nl-col span={4}>
            <div class="col-content">nl-col-4</div>
          </nl-col>
        </nl-row>
      </div>
      <div class="grid grid-flex">
        <p>Align Top</p>
        <nl-row type="flex" justify="center" align="top">
          <nl-col span={4}>
            <div class="col-content">col-4</div>
          </nl-col>
          <nl-col span={4}>
            <div class="col-content">col-4</div>
          </nl-col>
          <nl-col span={4}>
            <div class="col-content">col-4</div>
          </nl-col>
          <nl-col span={4}>
            <div class="col-content">col-4</div>
          </nl-col>
        </nl-row>

        <p>Align Center</p>
        <nl-row type="flex" justify="space-around" align="middle">
          <nl-col span={4}>
            <div class="col-content">col-4</div>
          </nl-col>
          <nl-col span={4}>
            <div class="col-content">col-4</div>
          </nl-col>
          <nl-col span={4}>
            <div class="col-content">col-4</div>
          </nl-col>
          <nl-col span={4}>
            <div class="col-content">col-4</div>
          </nl-col>
        </nl-row>

        <p>Align Bottom</p>
        <nl-row type="flex" justify="space-between" align="bottom">
          <nl-col span={4}>
            <div class="col-content">col-4</div>
          </nl-col>
          <nl-col span={4}>
            <div class="col-content">col-4</div>
          </nl-col>
          <nl-tooltip content={<div>111</div>}>
            <nl-col span={4}>
              <div class="col-content">col-4</div>
            </nl-col>
          </nl-tooltip>
          <nl-col span={4}>
            <div class="col-content">col-4</div>
          </nl-col>
        </nl-row>
      </div>
      <div>
        <nl-popover>
          <div>111</div>
        </nl-popover>
      </div>
      <div>
        <nl-tooltip content={<div>111</div>}>
          <div style="width:200px;">222</div>
        </nl-tooltip>
      </div>
    </div>
  )
})
export default App
