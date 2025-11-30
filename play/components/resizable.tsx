import { ref, defineComponent } from 'vue'
const ResizableDemo = defineComponent({
  setup() {
    const leftEnable = ref(true)
    const handleSetEnable = (checked: boolean) => {
      leftEnable.value = checked
    }
    return () => (
      <div>
        <div style={{ width: '400px', height: '400px' }}>
          <div style={{ width: '500px', height: '60%' }}>
            <div style={{ display: 'flex', alignItems: 'center', margin: 8 }}>
              <tempui-switch checked={leftEnable.value} onChange={handleSetEnable}></tempui-switch>
              <span style={{ margin: 8 + 'px' }}>{leftEnable.value ? 'able' : 'disable'}</span>
            </div>
            <tempui-resizable
              style={{ backgroundColor: 'rgba(var(--tempui-grey-1), 1)' }}
              enable={{
                left: leftEnable.value
              }}
              defaultSize={{
                width: 200,
                height: 200
              }}
            >
              <div style={{ marginLeft: '20%' }}>{'enable.left:' + leftEnable.value}</div>
            </tempui-resizable>
          </div>
        </div>

        <div style={{ width: '1000px', height: '600px' }}>
          <tempui-resize-group direction="vertical">
            <tempui-resize-item
              style={{ backgroundColor: 'rgba(var(--tempui-grey-1), 1)' }}
              defaultSize={'20%'}
            >
              <div style={{ marginLeft: '20%' }}>{'header'}</div>
            </tempui-resize-item>
            <tempui-resize-handler></tempui-resize-handler>
            <tempui-resize-item defaultSize={'80%'}>
              <tempui-resize-group direction="horizontal">
                <tempui-resize-item
                  style={{
                    backgroundColor: 'rgba(var(--tempui-grey-1), 1)',
                    border: 'var(--tempui-color-border) 1px solid'
                  }}
                  defaultSize={'25%'}
                >
                  <div style={{ marginLeft: '20%' }}>{'tab'}</div>
                </tempui-resize-item>
                <tempui-resize-handler></tempui-resize-handler>
                <tempui-resize-item
                  style={{
                    backgroundColor: 'rgba(var(--tempui-grey-1), 1)',
                    border: 'var(--tempui-color-border) 1px solid'
                  }}
                  defaultSize={'75%'}
                >
                  <div style={{ marginLeft: '20%' }}>content</div>
                </tempui-resize-item>
              </tempui-resize-group>
            </tempui-resize-item>
          </tempui-resize-group>
        </div>
      </div>
    )
  },
  name: 'ResizableDemo'
})
export default ResizableDemo
