import { defineComponent, ref } from 'vue'

const ProgressDemo = defineComponent({
  setup() {
    const percent = ref(20)
    const strokeArr = [
      { percent: 20, color: 'red' },
      { percent: 40, color: 'orange-9' },
      { percent: 60, color: 'light-green-8' },
      { percent: 80, color: 'hsla(125, 50%, 46% / 1)' }
    ]
    return () => (
      <div style="margin-top:20px">
        <div style={{ width: 200 + 'px' }}>
          <tempui-progress
            percent={10}
            stroke="var(--tempui-color-warning)"
            aria-label="disk usage"
            size="large"
          />
          <br />
          <tempui-progress
            percent={25}
            stroke="var(--tempui-color-danger)"
            aria-label="disk usage"
            showInfo
          />
          <br />
          <tempui-progress percent={50} aria-label="disk usage" />
          <br />
          <tempui-progress percent={80} aria-label="download progress" />
          <br />
          <tempui-progress percent={80} size="large" aria-label="disk usage" />
          <br />
          <tempui-progress percent={80} style={{ height: '8px' }} aria-label="disk usage" />
        </div>
        <div style={{ height: 100 + 'px', display: 'flex' }}>
          <tempui-progress size="large" percent={10} direction="vertical" aria-label="disk usage" />
          <tempui-progress showInfo percent={25} direction="vertical" aria-label="disk usage" />
          <tempui-progress percent={50} direction="vertical" aria-label="disk usage" />
          <tempui-progress percent={80} direction="vertical" size="large" aria-label="disk usage" />
          <tempui-progress
            percent={80}
            direction="vertical"
            style={{ width: '8px' }}
            aria-label="disk usage"
          />
        </div>
        <div style={{ display: 'flex' }}>
          <tempui-progress
            percent={10}
            type="circle"
            style={{ margin: 5 + 'px' }}
            aria-label="disk usage"
          />
          <tempui-progress
            percent={25}
            type="circle"
            style={{ margin: 5 + 'px' }}
            aria-label="disk usage"
          />
          <tempui-progress
            percent={50}
            type="circle"
            style={{ margin: 5 + 'px' }}
            aria-label="disk usage"
          />
          <tempui-progress
            percent={80}
            type="circle"
            style={{ margin: 5 + 'px' }}
            aria-label="disk usage"
          />
        </div>
        <div style={{ width: 200 + 'px' }}>
          <tempui-progress percent={percent.value} showInfo aria-label="disk usage" />
          <tempui-progress
            size="small"
            showInfo
            type="circle"
            percent={percent.value}
            aria-label="disk usage"
          />
          <tempui-button
            onClick={() => {
              percent.value = percent.value - 10
            }}
          >
            -
          </tempui-button>
          <tempui-button
            onClick={() => {
              percent.value = percent.value + 10
            }}
          >
            +
          </tempui-button>
        </div>
        <div style={{ width: 200 + 'px' }}>
          <tempui-progress
            percent={percent.value}
            stroke={strokeArr}
            showInfo
            type="circle"
            width={100}
            aria-label="disk usage"
          />
          <tempui-progress
            percent={percent.value}
            stroke={strokeArr}
            showInfo
            style={{ margin: '20px 0 10px' }}
            aria-label="disk usage"
          />
          <tempui-button
            onClick={() => {
              percent.value = percent.value - 10
            }}
          >
            -
          </tempui-button>
          <tempui-button
            onClick={() => {
              percent.value = percent.value + 10
            }}
          >
            + {percent.value}
          </tempui-button>
        </div>
      </div>
    )
  },
  name: 'ProgressDemo'
})
export default ProgressDemo
