import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'TypographyDemo',
  setup() {
    const locale = ref('zh-CN')
    onMounted(() => {
      setInterval(() => {
        locale.value = locale.value === 'zh-CN' ? 'en-US' : 'zh-CN'
      }, 5000)
    })
    return () => {
      return (
        <div>
          <div>
            <tempui-title style={{ margin: '8px 0' }}>h1. Semi Design</tempui-title>
            <tempui-title heading={2} style={{ margin: '8px 0' }}>
              h2. Semi Design
            </tempui-title>
            <tempui-title heading={3} style={{ margin: '8px 0' }}>
              h3. Semi Design
            </tempui-title>
            <tempui-title heading={4} style={{ margin: '8px 0' }}>
              h4. Semi Design
            </tempui-title>
            <tempui-title heading={5} style={{ margin: '8px 0' }}>
              h5. Semi Design
            </tempui-title>
            <tempui-title heading={6} style={{ margin: '8px 0' }}>
              h6. Semi Design
            </tempui-title>
          </div>
          <div>
            <tempui-text icon={'icon'}>链接文本</tempui-text>
            <tempui-text link={{ href: 'https://semi.design/' }}>链接文本</tempui-text>
            <br />
            <br />
            <tempui-text link={{ href: 'https://semi.design/' }}>打开网站</tempui-text>
            <br />
            <br />
            <tempui-text link icon={'icon'} underline>
              带下划线的网页链接
            </tempui-text>
          </div>
          <div style={{ width: '200px' }}>
            <tempui-title heading={5}>默认行距</tempui-title>
            <tempui-paragraph>
              Semi Design 是由抖音前端团队与 UED
              团队共同设计开发并维护的设计系统。设计系统包含设计语言以及一整套可复用的前端组件，帮助设计师与开发者更容易地打造高质量的、用户体验一致的、符合设计规范的
              Web 应用。
            </tempui-paragraph>
            <br />
            <tempui-title heading={5}>宽松行距</tempui-title>
            <tempui-paragraph size="small">
              Semi Design 是由抖音前端团队与 UED
              团队共同设计开发并维护的设计系统。设计系统包含设计语言以及一整套可复用的前端组件，帮助设计师与开发者更容易地打造高质量的、用户体验一致的、符合设计规范的
              Web 应用。
            </tempui-paragraph>
          </div>
          <br />
          <tempui-locale-provider locale={locale.value}>
            <tempui-paragraph copyable>点击右边的图标复制文本。</tempui-paragraph>
          </tempui-locale-provider>
        </div>
      )
    }
  }
})
