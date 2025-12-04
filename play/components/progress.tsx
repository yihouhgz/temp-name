import { defineComponent } from 'vue'

const ProgressDemo = defineComponent({
  setup() {
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
        <div>
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
      </div>
    )
  },
  name: 'ProgressDemo'
})
export default ProgressDemo
