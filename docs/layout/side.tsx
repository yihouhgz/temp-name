import { defineComponent } from 'vue'
import { Nav } from '../../packages/components'
import { IconIntro } from '../../packages/components/icon/lights'

const SideTheme = defineComponent({
  setup() {
    const iconSize = 'extra-large'
    const items = [
      {
        itemKey: 'start',
        text: '开始',
        items: [
          {
            itemKey: 'start-0',
            text: 'Semi Design of vue',
            icon: <IconIntro size={iconSize} />
          },
          {
            itemKey: 'start-1',
            text: 'Introduction 开始',
            icon: <IconIntro size={iconSize} />
          },
          {
            itemKey: 'start-2',
            text: 'Getting Started 快速开始'
          },
          {
            itemKey: 'start-3',
            text: 'Overview 组件总览'
          }
        ]
      },
      {
        itemKey: 'design-collaboration',
        text: '设计协作',
        items: [
          {
            itemKey: 'design-collaboration-1',
            text: 'Customized Themes 定制主题'
          },
          {
            itemKey: 'design-collaboration-2',
            text: 'Design to Code 设计稿转代码'
          },
          {
            itemKey: 'design-collaboration-3',
            text: 'Dark Mode 暗色模式'
          },
          {
            itemKey: 'design-collaboration-4',
            text: 'Design Resources 设计资源'
          }
        ]
      },
      {
        itemKey: 'enhanced-experience',
        text: '体验增强',
        items: [
          {
            itemKey: 'enhanced-experience-1',
            text: 'Accessibility 无障碍'
          },
          {
            itemKey: 'enhanced-experience-2',
            text: 'Internationalization 国际化'
          },
          {
            itemKey: 'enhanced-experience-3',
            text: 'Content Guidelines 文案规范'
          }
        ]
      },
      {
        itemKey: 'ecology-and-assistance',
        text: '生态与帮助',
        items: [
          {
            itemKey: 'ecology-and-assistance-1',
            text: 'FAQ 常见问题'
          },
          {
            itemKey: 'ecology-and-assistance-2',
            text: 'Web components 适配'
          },
          {
            itemKey: 'ecology-and-assistance-3',
            text: 'Change Log 变更日志'
          }
        ]
      }
    ]
    const openItemKey = items.map((item) => item.itemKey)
    return () => {
      return (
        <div class={'side-container'}>
          <Nav
            style={{
              width: '100%',
              height: 'calc(100%)',
              minWidth: '240px',
              maxWidth: '280px'
            }}
            items={items}
            header={null}
            openKeys={openItemKey}
          ></Nav>
        </div>
      )
    }
  },
  name: 'SideTheme'
})
export default SideTheme
