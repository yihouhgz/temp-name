import { defineComponent } from 'vue'

const BannerDemo = defineComponent({
  setup() {
    const changeVisible = () => {
      console.log('changeVisible')
    }
    return () => {
      return (
        <div>
          <tempui-banner
            onClose={changeVisible}
            description="Semi D2C 现已支持 Figma DevMode, 安装插件，随时查阅图层对应的前端代码"
          />

          <tempui-banner
            type="info"
            description="Semi D2C 现已支持 Figma DevMode, 安装插件，随时查阅图层对应的前端代码"
          />
          <br />
          <tempui-banner
            type="warning"
            description="当前使用 Figma UI Kit 为旧版，可能无法支持完整的 Design to code 能力"
          />
          <br />
          <tempui-banner type="danger" description="当前使用 API 已过期，请尽快升级" />
          <br />
          <tempui-banner type="success" description="Semi DSM, Make Semi Design to Any Design" />
          <br />
          <div style={{ width: '600px' }}>
            <tempui-banner
              fullMode={false}
              type="info"
              bordered
              icon={null}
              closeIcon={null}
              title={
                <div style={{ fontWeight: 600, fontSize: '14px', lineHeight: '20px' }}>
                  不知道 AppKey？
                </div>
              }
              description={
                <div>
                  你可先联系对应的研发同学，确认是否已在
                  <tempui-text link={{ href: 'https://semi.design/' }}>应用云平台</tempui-text>
                  申请了应用，并填写对应的信息。
                </div>
              }
            />
            <br />
            <tempui-banner
              fullMode={false}
              type="warning"
              bordered
              icon={null}
              closeIcon={null}
              title={
                <div style={{ fontWeight: 600, fontSize: '14px', lineHeight: '20px' }}>
                  不知道 AppKey？
                </div>
              }
              description={
                <div>
                  你可先联系对应的研发同学，确认是否已在
                  <tempui-text link={{ href: 'https://semi.design/' }}>应用云平台</tempui-text>
                  申请了应用，并填写对应的信息。
                </div>
              }
            />
            <br />
            <tempui-banner
              fullMode={false}
              type="danger"
              bordered
              icon={null}
              closeIcon={null}
              title={
                <div style={{ fontWeight: 600, fontSize: '14px', lineHeight: '20px' }}>
                  不知道 AppKey？
                </div>
              }
              description={
                <div>
                  你可先联系对应的研发同学，确认是否已在
                  <tempui-text link={{ href: 'https://semi.design/' }}>应用云平台</tempui-text>
                  申请了应用，并填写对应的信息。
                </div>
              }
            />
            <br />
            <tempui-banner
              fullMode={false}
              type="success"
              bordered
              icon={null}
              closeIcon={null}
              title={
                <div style={{ fontWeight: 600, fontSize: '14px', lineHeight: '20px' }}>
                  不知道 AppKey？
                </div>
              }
              description={
                <div>
                  你可先联系对应的研发同学，确认是否已在{' '}
                  <tempui-text link={{ href: 'https://semi.design/' }}>应用云平台</tempui-text>{' '}
                  申请了应用，并填写对应的信息。
                </div>
              }
            />
          </div>
          <div
            style={{
              width: 500 + 'px',
              padding: 20 + 'px',
              border: '1px solid var(--tempui-color-border)'
            }}
          >
            <tempui-banner
              fullMode={false}
              title="Title"
              type="warning"
              bordered
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
            >
              <div style={{ margin: '24px 0', textAlign: 'right' }}>
                <tempui-button theme="light" type="tertiary">
                  No, thanks.
                </tempui-button>
                <tempui-button type="warning" theme="solid" style="margin-left: 12px;">
                  Sounds great!
                </tempui-button>
              </div>
            </tempui-banner>
            <br />
          </div>
        </div>
      )
    }
  },
  name: 'BannerDemo'
})
export default BannerDemo
