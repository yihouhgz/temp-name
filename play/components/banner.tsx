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
        </div>
      )
    }
  },
  name: 'BannerDemo'
})
export default BannerDemo
