export default function TooltipDemo() {
  const tops = [
    ['topLeft', 'TL'],
    ['top', 'Top'],
    ['topRight', 'TR']
  ]
  const lefts = [
    ['leftTop', 'LT'],
    ['left', 'Left'],
    ['leftBottom', 'LB']
  ]
  const rights = [
    ['rightTop', 'RT'],
    ['right', 'Right'],
    ['rightBottom', 'RB']
  ]
  const bottoms = [
    ['bottomLeft', 'BL'],
    ['bottom', 'Bottom'],
    ['bottomRight', 'BR']
  ]
  const getPopupContainer = () => document.querySelector('#tooltip-container')
  return (
    <div>
      <div>
        <div style={{ marginLeft: 80 + 'px', whiteSpace: 'nowrap' }}>
          {tops.map((pos, index) => (
            <tempui-tooltip
              trigger="click"
              arrowPointAtCenter={true}
              content={
                <article>
                  <p>hi bytedance</p>
                  <p>hi bytedance</p>
                </article>
              }
              position={Array.isArray(pos) ? pos[0] : pos}
              key={index}
            >
              <tempui-tag style={{ margin: 8 + 'px', padding: 20 + 'px' }}>
                {Array.isArray(pos) ? pos[1] : pos}
              </tempui-tag>
            </tempui-tooltip>
          ))}
        </div>
        <div style={{ width: 80 + 'px', float: 'left' }}>
          {lefts.map((pos, index) => (
            <tempui-tooltip
              trigger="click"
              content={
                <article>
                  <p>hi bytedance</p>
                  <p>hi bytedance</p>
                </article>
              }
              arrowPointAtCenter={false}
              position={Array.isArray(pos) ? pos[0] : pos}
              key={index}
            >
              <tempui-tag style={{ margin: 8 + 'px', padding: 20 + 'px', width: 60 + 'px' }}>
                {Array.isArray(pos) ? pos[1] : pos}
              </tempui-tag>
            </tempui-tooltip>
          ))}
        </div>
        <div style={{ width: 40 + 'px', marginLeft: 300 + 'px' }}>
          {rights.map((pos, index) => (
            <tempui-tooltip
              trigger="click"
              content={
                <article>
                  <p>hi bytedance</p>
                  <p>hi bytedance</p>
                </article>
              }
              arrowPointAtCenter={false}
              position={Array.isArray(pos) ? pos[0] : pos}
              key={index}
            >
              <tempui-tag style={{ margin: 8 + 'px', padding: 20 + 'px', width: 60 + 'px' }}>
                {Array.isArray(pos) ? pos[1] : pos}
              </tempui-tag>
            </tempui-tooltip>
          ))}
        </div>
        <div style={{ marginLeft: 80 + 'px', clear: 'both', whiteSpace: 'nowrap' }}>
          {bottoms.map((pos, index) => (
            <tempui-tooltip
              trigger="click"
              content={
                <article>
                  <p>hi bytedance</p>
                  <p>hi bytedance</p>
                </article>
              }
              arrowPointAtCenter={false}
              position={Array.isArray(pos) ? pos[0] : pos}
              key={index}
            >
              <tempui-tag style={{ margin: 8 + 'px', padding: 20 + 'px', width: 60 + 'px' }}>
                {Array.isArray(pos) ? pos[1] : pos}
              </tempui-tag>
            </tempui-tooltip>
          ))}
        </div>
      </div>
      <div
        style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}
        id="tooltip-container"
      >
        <div
          style={{ width: '150%', height: '150%', paddingLeft: 50 + 'px', paddingTop: 50 + 'px' }}
        >
          <tempui-tooltip content={'hi bytedance'} getPopupContainer={getPopupContainer}>
            <tempui-button theme="solid" type="tertiary" style={{ marginBottom: 20 + 'px' }}>
              悬停显示
            </tempui-button>
          </tempui-tooltip>
          <br />
          <tempui-tooltip
            content={'hi bytedance'}
            trigger="click"
            getPopupContainer={getPopupContainer}
          >
            <tempui-button style={{ marginBottom: 20 + 'px' }}>点击显示</tempui-button>
          </tempui-tooltip>
          <br />
          <tempui-tooltip
            content={'hi bytedance'}
            trigger="focus"
            getPopupContainer={getPopupContainer}
          >
            <tempui-input
              style={{ width: 100 + 'px', marginBottom: 20 + 'px' }}
              placeholder="聚焦显示"
            />
          </tempui-tooltip>
          <br />
          <tempui-tooltip
            content={'hi bytedance'}
            trigger="contextMenu"
            getPopupContainer={getPopupContainer}
          >
            <tempui-button theme="solid" type="secondary" style={{ marginBottom: 20 + 'px' }}>
              右键点击展示
            </tempui-button>
          </tempui-tooltip>
          <br />
          <tempui-tooltip
            content={'hi bytedance'}
            trigger="custom"
            visible={true}
            getPopupContainer={getPopupContainer}
          >
            <span>111</span>
          </tempui-tooltip>
        </div>
      </div>
      <div>
        <tempui-tooltip
          trigger="click"
          style={{
            maxWidth: 320 + 'px'
          }}
          class="another-classname"
          content={'hi semi semi semi semi semi semi semi'}
        >
          <tempui-tag style={{ marginRight: '8px' }}>Custom Style And ClassName</tempui-tag>
        </tempui-tooltip>
      </div>
      <div id="tooltip-wrapper" style={{ position: 'relative' }}>
        <tempui-tooltip
          position="right"
          content="浮层被渲染至#tooltip-wrapper元素中"
          trigger="click"
          getPopupContainer={() => document.querySelector('#tooltip-wrapper')}
        >
          <tempui-tag>点击此处</tempui-tag>
        </tempui-tooltip>
      </div>
      <div class="top-20">
        <tempui-popover
          position="bottom"
          content={<div class="popover-children">111</div>}
          trigger="click"
        >
          <div>我是popover 点击触发</div>
        </tempui-popover>
      </div>
    </div>
  )
}
