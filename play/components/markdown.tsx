import { defineComponent } from 'vue'

const MarkdownRender = defineComponent({
  name: 'MarkdownRender',
  setup() {
    const raw = `
##

正文内容是普通的文本，也可以**加粗**~~删除线~~和<u>下划线</u> [超链接](https://semi.design) 等 Markdown 与 HTML 的基本语法所支持的富文本，也支持 emoji 🍰


部分符号需要转义 \\\{\\} \\<\\> ...

<br/>
<br/>
---
#### Semi Design DSM
[Semi DSM](https://semi.design/dsm) 是 Semi Design 提供的设计系统管理工具（Design System Management），支持全局、组件级别的样式定制，并在 Figma 和前端代码之间保持同步
适用于各种规模的团队，无论你是需要简化工作流程，提高团队协作，还是增加生产力，我们都有适合你的功能

##### 中大型企业
- 多达 3000+ Design Token，深入每一处细节的定制可能，色彩，阴影，边距，圆角，动效，渲染结构均可自由定制，告别 ~~CSS 硬编码~~
- 功能强大，经过抖音内部数千项目验证过的 UI lib，轻松应对各类复杂场景
- A11y 无障碍友好，国际化功能完备
- 面向社区建设，完全开源，无使用限制
- 从 designOps 到 devOps，自动化工作流，Figma UI Kit 一键刷入主题，生成 Style Guideline，研发一行 npm 代码配置接入

##### 初创企业
- 无需从 0 到 1 投入大量研发资源，快速复用开源社区优秀方案, 低成本快速定制具备品牌特色的设计系统。
- 一键支持暗色模式生成，支持根据品牌色快速生成包含 320 个全色阶、兼容深/浅两种模式的色彩系统，并支持动态切换
- 不断进化，DSM + Semi Design 组件由<u>抖音前端架构团队</u>专业维护，已稳定迭代五年+，值得信赖

##### 自由设计师/个人开发者
- 低成本快速创建风格各异的设计系统，更少时间，更快交付
- 研发接入友好，无需反复沟通，交付npm包产物，一键完成代码接入


![DSM](https://semi.design/dsm_manual/content/introduction/start/start-intro.png)

---

#### MarkdownRender 渲染列表语法
- 好好地吃饭
- 好好地睡觉
- 好好地游玩
- 好好地学习
- 好好地聊天
- 好好地吵架
- 过着平凡普通的每日

| 支持 | Markdown 表格 |  c |  d  |
| - | :- | -: | :-: |
| 1 | 2 | 3 | 4 |
| 21 | 22 | 23 | 24 |
| 31 | 32 | 33 | 34 |
| 41 | 42 | 43 | 44 |

    `
    return () => {
      return (
        <div>
          {/* <tempui-markdown-render raw={raw}></tempui-markdown-render> */}
          {/*<tempui-image
            width={360}
            height={200}
            src="https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/abstract.jpg"
          ></tempui-image>*/}
          <div style={{ width: '430px' }}>
            <div>
              <div>Default</div>
              <tempui-slider showBoundary={true}></tempui-slider>
            </div>
            <br />
            <br />
            <div>
              <div>Range</div>
              <tempui-slider defaultValue={[20, 60]} range></tempui-slider>
            </div>
            <br />
            <br />
            <div>
              <div>Disabled</div>
              <tempui-slider defaultValue={40} disabled></tempui-slider>
            </div>
            <div>
              <div>step=10</div>
              <tempui-slider
                step={10}
                marks={{ 0: '0', 10: '10', 20: '20', 30: '30', 40: '40', 50: '50', 100: '100' }}
                defaultValue={[10, 100]}
                range={true}
              ></tempui-slider>
            </div>
            <div
              style={{
                height: 300 + 'px',
                marginLeft: 30 + 'px',
                marginTop: 10 + 'px',
                paddingRight: 30 + 'px',
                display: 'inline-block'
              }}
            >
              <tempui-slider
                vertical
                verticalReverse
                range
                marks={{ 20: '20°C', 40: '40°C' }}
                step={10}
                defaultValue={[20, 60]}
              ></tempui-slider>
            </div>
            <tempui-image
              width={360}
              height={200}
              src="https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/abstract.jpg"
            />
          </div>
          <div
            id="container1"
            style={{
              height: 400 + 'px',
              width: 1156 + 'px',
              position: 'relative'
            }}
          >
            <tempui-image-preview
              getPopupContainer={() => {
                const node = document.getElementById('container1')
                return node
              }}
              style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {[
                'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/abstract.jpg',
                'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/sky.jpg',
                'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/greenleaf.jpg'
              ].map((src, index) => {
                return (
                  <tempui-image
                    key={index}
                    src={src}
                    width={200}
                    alt={`lamp${index + 1}`}
                    style={{ marginRight: 5 + 'px' }}
                  />
                )
              })}
            </tempui-image-preview>
          </div>
        </div>
      )
    }
  }
})
export default MarkdownRender
