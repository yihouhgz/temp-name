import { ref, defineComponent, watchEffect } from 'vue'
import { Button } from '../dist'
import './styles/app.scss'
import './styles/reset.scss'
import TooltipDemo from './components/tooltip'
import ResizableDemo from './components/resizable'
import CheckboxDemo from './components/checkbox'
import RadioDemo from './components/radio'
import SkeletonDemo from './components/skeleton'
import ProgressDemo from './components/progress'
import BannerDemo from './components/banner'
const App = defineComponent(() => {
  const loading = ref(false)
  const switchLoading = ref(false)
  const switchValue = ref(false)
  const inputvalue = ref('llll')
  const tagList = [
    {
      color: 'light-blue',
      children: '抖音',
      size: 'small',
      avatarSrc:
        'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/dy.png'
    },
    { color: 'cyan', children: '火山' },
    { color: 'violet', children: '剪映' },
    { color: 'white', children: '醒图' },
    {
      tagKey: '1',
      color: 'light-blue',
      children: '抖音',
      closable: true,
      avatarSrc:
        'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/dy.png'
    },
    { tagKey: '3', color: 'cyan', children: '剪映', closable: true },
    { tagKey: '2', color: 'violet', children: '醒图', closable: true },
    { tagKey: '4', color: 'teal', children: '轻颜相机', closable: true },
    { tagKey: '5', color: 'white', children: '飞书', closable: true }
  ]
  const handleChange = (value: boolean) => {
    switchLoading.value = true
    setTimeout(() => {
      console.log('handleChange', value)
      switchLoading.value = false
      switchValue.value = value
    }, 2000)
  }
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
  const handleSync = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('handleSync')
        resolve(true)
      }, 1000)
    })
  }
  const sunIcon = (
    <div
      key={'sunIcon'}
      style="width:100%;height:100%;display: flex;align-items: center;justify-content: center;color:var(--tempui-color-success)"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="width: 60%;height: 60%;">
        <g
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </g>
      </svg>
    </div>
  )
  const moonIcon = (
    <div
      key={'moonIcon'}
      style="width:100%;height:100%;display: flex;align-items: center;justify-content: center;color:var(--tempui-color-text-2)"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="width: 60%;height: 60%;">
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 3a6 6 0 0 0 9 9a9 9 0 1 1-9-9"
        />
      </svg>
    </div>
  )
  return () => (
    <div>
      <div>
        <tempui-sync-button onClick={handleSync}>hello</tempui-sync-button>
        <Button type="primary">确定</Button>
        <Button type="primary" disabled>
          确定
        </Button>
        <tempui-button
          loading={loading.value}
          onClick={handleClick}
          icon={CameraIcon}
          v-slots={{ icon: CameraIcon }}
        >
          我是按钮
        </tempui-button>
        <tempui-button
          type="secondary"
          size="small"
          icon={CameraIcon}
          loading={loading.value}
          onClick={handleClick}
        >
          我是按钮
        </tempui-button>
        <tempui-button type="tertiary">我是按钮</tempui-button>
        <tempui-button type="warning">我是按钮</tempui-button>
        <tempui-button type="danger">商品买断</tempui-button>
      </div>
      <div class="top-50">
        <div>主题</div>
        <tempui-button theme="light" disabled type="primary" style={{ marginRight: 8 }}>
          浅色主要 disabled
        </tempui-button>
        <tempui-button
          theme="light"
          size="small"
          disabled
          type="primary"
          style={{ marginRight: 8 }}
        >
          浅色主要
        </tempui-button>
        <tempui-button theme="light" disabled type="secondary" style={{ marginRight: 8 }}>
          浅色次要
        </tempui-button>
        <tempui-button
          theme="light"
          size="large"
          disabled
          type="tertiary"
          style={{ marginRight: 8 }}
        >
          浅色第三
        </tempui-button>
        <tempui-button theme="light" disabled type="warning" style={{ marginRight: 8 }}>
          浅色警告
        </tempui-button>
        <tempui-button theme="light" disabled type="danger" style={{ marginRight: 8 }}>
          浅色危险
        </tempui-button>
      </div>
      <div class="top-50">
        <Button theme="solid" disabled type="primary" style={{ marginRight: 8 }}>
          深色主要 disabled
        </Button>
        <Button theme="solid" type="primary" style={{ marginRight: 8 }}>
          深色主要
        </Button>
        <Button theme="solid" type="secondary" style={{ marginRight: 8 }}>
          深色次要
        </Button>
        <Button theme="solid" type="tertiary" style={{ marginRight: 8 }}>
          深色第三
        </Button>
        <Button theme="solid" type="warning" style={{ marginRight: 8 }}>
          深色警告
        </Button>
        <Button theme="solid" type="danger" style={{ marginRight: 8 }}>
          深色危险
        </Button>
      </div>
      <div class="top-50">
        <Button theme="borderless" disabled type="primary" style={{ marginRight: 8 }}>
          无背景主要 disabled
        </Button>
        <Button theme="borderless" type="primary" style={{ marginRight: 8 }}>
          无背景主要
        </Button>
        <Button theme="borderless" type="secondary" style={{ marginRight: 8 }}>
          无背景次要
        </Button>
        <Button theme="borderless" type="tertiary" style={{ marginRight: 8 }}>
          无背景第三
        </Button>
        <Button theme="borderless" type="warning" style={{ marginRight: 8 }}>
          无背景警告
        </Button>
        <Button theme="borderless" type="danger" style={{ marginRight: 8 }}>
          无背景危险
        </Button>
      </div>
      <div class="top-50">
        <Button theme="outline" disabled type="primary" style={{ marginRight: 8 }}>
          边框主要 disabled
        </Button>
        <Button theme="outline" type="primary" style={{ marginRight: 8 }}>
          边框主要
        </Button>
        <Button theme="outline" type="secondary" style={{ marginRight: 8 }}>
          边框次要
        </Button>
        <Button theme="outline" type="tertiary" style={{ marginRight: 8 }}>
          边框第三
        </Button>
        <Button theme="outline" type="warning" style={{ marginRight: 8 }}>
          边框警告
        </Button>
        <Button theme="outline" type="danger" style={{ marginRight: 8 }}>
          边框危险
        </Button>
      </div>
      <div>
        <Button type="secondary" loading icon={CameraIcon}>
          1
        </Button>
      </div>
      <div>
        <Button disabled>禁用</Button>
        <Button disabled theme="borderless">
          无背景禁用
        </Button>
        <Button disabled theme="light">
          浅色禁用
        </Button>
        <Button disabled theme="borderless" type="primary">
          无背景主要禁用
        </Button>
        <Button disabled theme="solid" type="warning">
          深色警告禁用
        </Button>
      </div>
      <div>
        <div style={{ marginRight: 10 }}>
          <tempui-button-group type="primary">
            <Button loading>拷贝</Button>
            <Button>查询</Button>
            <Button>剪切</Button>
          </tempui-button-group>
        </div>
      </div>
      <div style="width: 300px;" class="top-50">
        <tempui-tooltip content={<div>111</div>} trigger="focus">
          <tempui-input
            placeholder="请输入内容"
            validateStatus={inputvalue.value.length < 10 ? 'error' : 'default'}
            showClear
            v-model={inputvalue.value}
          ></tempui-input>
        </tempui-tooltip>
      </div>
      <div class="top-20">
        <tempui-select emptyContent={<span>暂无数据</span>}></tempui-select>
      </div>
      <div class="top-50">
        <tempui-icon name="camera"></tempui-icon>
      </div>
      <div class="top-50">
        <tempui-row gutter={[16, 24]}>
          {[1, 2, 3, 4, 5, 6].map((item, index) => (
            <tempui-col
              span={6}
              offset={index == 1 ? 6 : undefined}
              key={item}
              style="background: rgba(234,245,255, 1);min-height:30px;border: 1px solid rgba(152,205,253, 1);line-height: 30px"
            >
              <div style="background: rgb(203, 231, 254);height:100%;height:30px"></div>
            </tempui-col>
          ))}
        </tempui-row>
      </div>
      <div class="grid">
        <p>sub-element align left</p>
        <tempui-row type="flex" justify="start">
          <tempui-col span={4}>
            <div class="col-content">tempui-col-4</div>
          </tempui-col>
          <tempui-col span={4}>
            <div class="col-content">tempui-col-4</div>
          </tempui-col>
          <tempui-col span={4}>
            <div class="col-content">tempui-col-4</div>
          </tempui-col>
          <tempui-col span={4}>
            <div class="col-content">tempui-col-4</div>
          </tempui-col>
        </tempui-row>

        <p>sub-element align center</p>
        <tempui-row type="flex" justify="center">
          <tempui-col span={4}>
            <div class="col-content">tempui-col-4</div>
          </tempui-col>
          <tempui-col span={4}>
            <div class="col-content">tempui-col-4</div>
          </tempui-col>
          <tempui-col span={4}>
            <div class="col-content">tempui-col-4</div>
          </tempui-col>
          <tempui-col span={4}>
            <div class="col-content">tempui-col-4</div>
          </tempui-col>
        </tempui-row>

        <p>sub-element align right</p>
        <tempui-row type="flex" justify="end">
          <tempui-col span={4}>
            <div class="col-content">tempui-col-4</div>
          </tempui-col>
          <tempui-col span={4}>
            <div class="col-content">tempui-col-4</div>
          </tempui-col>
          <tempui-col span={4}>
            <div class="col-content">tempui-col-4</div>
          </tempui-col>
          <tempui-col span={4}>
            <div class="col-content">tempui-col-4</div>
          </tempui-col>
        </tempui-row>

        <p>sub-element monospaced arrangement</p>
        <tempui-row type="flex" justify="space-between">
          <tempui-col span={4}>
            <div class="col-content">tempui-col-4</div>
          </tempui-col>
          <tempui-col span={4}>
            <div class="col-content">tempui-col-4</div>
          </tempui-col>
          <tempui-col span={4}>
            <div class="col-content">tempui-col-4</div>
          </tempui-col>
          <tempui-col span={4}>
            <div class="col-content">tempui-col-4</div>
          </tempui-col>
        </tempui-row>

        <p>sub-element align full</p>
        <tempui-row type="flex" justify="space-around">
          <tempui-col span={4}>
            <div class="col-content">tempui-col-4</div>
          </tempui-col>
          <tempui-col span={4}>
            <div class="col-content">tempui-col-4</div>
          </tempui-col>
          <tempui-col span={4}>
            <div class="col-content">tempui-col-4</div>
          </tempui-col>
          <tempui-col span={4}>
            <div class="col-content">tempui-col-4</div>
          </tempui-col>
        </tempui-row>
      </div>
      <div class="grid grid-flex">
        <p>Align Top</p>
        <tempui-row type="flex" justify="center" align="top">
          <tempui-col span={4}>
            <div class="col-content">col-4</div>
          </tempui-col>
          <tempui-col span={4}>
            <div class="col-content">col-4</div>
          </tempui-col>
          <tempui-col span={4}>
            <div class="col-content">col-4</div>
          </tempui-col>
          <tempui-col span={4}>
            <div class="col-content">col-4</div>
          </tempui-col>
        </tempui-row>

        <p>Align Center</p>
        <tempui-row type="flex" justify="space-around" align="middle">
          <tempui-col span={4}>
            <div class="col-content">col-4</div>
          </tempui-col>
          <tempui-col span={4}>
            <div class="col-content">col-4</div>
          </tempui-col>
          <tempui-col span={4}>
            <div class="col-content">col-4</div>
          </tempui-col>
          <tempui-col span={4}>
            <div class="col-content">col-4</div>
          </tempui-col>
        </tempui-row>

        <p>Align Bottom</p>
        <tempui-row type="flex" justify="space-between" align="bottom">
          <tempui-col span={4}>
            <div class="col-content">col-4</div>
          </tempui-col>
          <tempui-col span={4}>
            <div class="col-content">col-4</div>
          </tempui-col>
          <tempui-tooltip content={<div>111</div>} trigger="hover">
            <tempui-col span={4}>
              <div class="col-content">col-4</div>
            </tempui-col>
          </tempui-tooltip>
          <tempui-col span={4}>
            <div class="col-content">col-4</div>
          </tempui-col>
        </tempui-row>
      </div>
      <div class="top-20">
        <tempui-popover
          position="bottom"
          content={<div class="popover-children">111</div>}
          trigger="click"
        >
          <Button type="primary">我是popover 点击触发</Button>
        </tempui-popover>
      </div>
      <div class="top-20">
        <tempui-tooltip content={<div>111</div>}>
          <Button type="primary">tooltip hover触发</Button>
        </tempui-tooltip>
      </div>
      <div class="top-20">
        <tempui-hot-keys
          background={false}
          render={<div>111</div>}
          hotKeys={['Control', 'q']}
          onHotKey={() => console.log('hahsdhhasd')}
        ></tempui-hot-keys>
      </div>
      <div class="top-20">
        {/* src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" */}
        <tempui-avatar
          hoverMask={
            <div
              style={{
                backgroundColor: 'var(--tempui-color-overlay-bg)',
                height: '100%',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <tempui-icon name="camera"></tempui-icon>
            </div>
          }
          alt="beautiful cat"
          src="https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/dy.png"
        >
          Duck
        </tempui-avatar>

        <tempui-avatar
          alt="beautiful cat"
          border={{ color: '#FE2C55', motion: true }}
          contentMotion
          gap={6}
          hoverMask={
            <div
              style={{
                backgroundColor: 'var(--tempui-color-overlay-bg)',
                height: '100%',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <tempui-icon name="camera"></tempui-icon>
            </div>
          }
        >
          duck
        </tempui-avatar>
        <tempui-avatar
          alt="beautiful cat"
          src="https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/dy.png"
          style={{ margin: '4px' }}
          size="large"
          border={{ color: '#FE2C55', motion: true }}
          contentMotion={true}
          topSlot={{
            text: '直播',
            gradientStart: 'rgb(255,23,100)',
            gradientEnd: 'rgb(237,52,148)'
          }}
          bottomSlot={{
            shape: 'circle',
            bgColor: '#FE2C55',
            text: <tempui-icon name="camera"></tempui-icon>
          }}
        />
      </div>
      <div class="top-20">
        <tempui-avatar-group maxCount={2}>
          <tempui-avatar
            hoverMask={
              <div
                style={{
                  backgroundColor: 'var(--tempui-color-overlay-bg)',
                  height: '100%',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <tempui-icon name="camera"></tempui-icon>
              </div>
            }
            alt="beautiful cat"
            src="https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/dy.png"
          >
            Duck
          </tempui-avatar>
          <tempui-avatar
            hoverMask={
              <div
                style={{
                  backgroundColor: 'var(--tempui-color-overlay-bg)',
                  height: '100%',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <tempui-icon name="camera"></tempui-icon>
              </div>
            }
            alt="beautiful cat"
            src="https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/dy.png"
          >
            Duck
          </tempui-avatar>
          <tempui-avatar
            hoverMask={
              <div
                style={{
                  backgroundColor: 'var(--tempui-color-overlay-bg)',
                  height: '100%',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <tempui-icon name="camera"></tempui-icon>
              </div>
            }
            alt="beautiful cat"
            src="https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/dy.png"
          >
            Duck
          </tempui-avatar>
        </tempui-avatar-group>
        <tempui-avatar-group maxCount={4}>
          <tempui-avatar>d</tempui-avatar>
          <tempui-avatar>u</tempui-avatar>
          <tempui-avatar>c</tempui-avatar>
          <tempui-avatar>k</tempui-avatar>
          <tempui-avatar>h</tempui-avatar>
        </tempui-avatar-group>
      </div>
      <div class="top-20">
        <tempui-hot-keys
          background={false}
          hotKeys={['Control', 'q']}
          onHotKey={() => console.log('hahsdhhasd')}
        ></tempui-hot-keys>
      </div>
      <div class="top-20">
        <tempui-select
          optionList={[
            { label: '小米手机', value: '1' },
            { label: '苹果手机', value: '2' }
          ]}
          defaultValue="2"
        >
          <tempui-select-option-group label="智能手机">
            <tempui-select-option value="1">小米手机</tempui-select-option>
            <tempui-select-option value="2">苹果手机</tempui-select-option>
          </tempui-select-option-group>
          <tempui-select-option-group label="智能手机2">
            <tempui-select-option value="11">小米手机1</tempui-select-option>
            <tempui-select-option value="21">苹果手机1</tempui-select-option>
          </tempui-select-option-group>
        </tempui-select>
      </div>
      <div class={'top-20'}>
        <tempui-drag-move>
          <div
            style={{ position: 'absolute', width: '40px', height: '40px', backgroundColor: 'red' }}
          ></div>
        </tempui-drag-move>
        <div style={{ paddingTop: '50px' }}>
          <div
            style={{
              width: '140px',
              height: '140px',
              backgroundColor: 'blue',
              position: 'relative'
            }}
            id="drag-move-container"
          >
            <tempui-drag-move
              constrainer={() => document.getElementById('drag-move-container') as HTMLElement}
              handler={() => document.getElementById('drag-move-child') as HTMLElement}
            >
              <div
                style={{
                  position: 'absolute',
                  width: '40px',
                  height: '40px',
                  backgroundColor: 'red',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <div
                  id="drag-move-child"
                  style={{ width: '20px', height: '20px', backgroundColor: 'white' }}
                ></div>
              </div>
            </tempui-drag-move>
          </div>
          <tempui-drag-move>
            <input type="text" value={'hahah'} />
          </tempui-drag-move>
        </div>
      </div>
      <div class={'top-20'}>
        <tempui-space>
          <tempui-button type="secondary">次要</tempui-button>
          <tempui-button type="tertiary">第三</tempui-button>
          <tempui-button type="warning">警告</tempui-button>
        </tempui-space>
      </div>
      <div class={'top-20'}>
        <tempui-space>
          <tempui-spin size={'small'}></tempui-spin>
          <tempui-spin size={'middle'} tip={'加载中...'}>
            <tempui-button type="secondary">次要</tempui-button>
          </tempui-spin>
          <tempui-spin size={'large'}>加载中...</tempui-spin>

          <tempui-spin delay={6000} size={'large'}>
            加载中...
          </tempui-spin>
        </tempui-space>
      </div>
      <div class="top-20" style="display: flex;gap: 8px;flex-wrap: wrap;">
        <tempui-tag>标签</tempui-tag>
        <tempui-tag type="ghost" color="blue">
          ghost
        </tempui-tag>
        <tempui-tag type="solid" color="blue">
          solid
        </tempui-tag>
        <tempui-tag type="light" color="red">
          light
        </tempui-tag>
        <tempui-tag size="large" color="green">
          large
        </tempui-tag>
        <tempui-tag closable>large</tempui-tag>
        <tempui-tag
          prefixIcon="234"
          suffixIcon="234"
          avatarShape="circle"
          avatarSrc="https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/dy.png"
        >
          large
        </tempui-tag>
        <tempui-tag
          visible={true}
          v-slots={{
            prefixIcon: () => <tempui-icon name="camera"></tempui-icon>,
            suffixIcon: () => <tempui-icon name="camera"></tempui-icon>
          }}
        >
          large
        </tempui-tag>
        <tempui-tag
          prefixIcon="234"
          suffixIcon="234"
          avatarShape="circle"
          avatarSrc="https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/dy.png"
        >
          large
        </tempui-tag>
      </div>
      123123
      <div class="top-20">
        <tempui-tag-group tagList={tagList} maxTagCount={4} showPopover={true}>
          {' '}
        </tempui-tag-group>
      </div>
      <tempui-layout>
        <tempui-layout-sider style={{ width: '120px', background: 'var(--tempui-color-fill-2)' }}>
          Sider
        </tempui-layout-sider>
        <tempui-layout>
          <tempui-layout-header
            style={{
              height: 64,
              lineHeight: '64px',
              background: 'var(--tempui-color-fill-0)'
            }}
          >
            Header
          </tempui-layout-header>
          <tempui-layout-content style={{ height: 300, lineHeight: '300px' }}>
            <div class={'top-20'}>
              <tempui-space>
                <tempui-switch size="small"></tempui-switch>
                <tempui-switch size="small" disabled></tempui-switch>
                <tempui-switch size="small" defaultChecked></tempui-switch>
                <tempui-switch size="small" loading></tempui-switch>
                <tempui-switch size="small" loading defaultChecked></tempui-switch>
              </tempui-space>

              <tempui-space>
                <tempui-switch checkedText="开" uncheckedText="关"></tempui-switch>
                <tempui-switch disabled></tempui-switch>
                <tempui-switch defaultChecked></tempui-switch>
                <tempui-switch loading></tempui-switch>
                <tempui-switch loading defaultChecked></tempui-switch>
              </tempui-space>

              <tempui-space>
                <tempui-switch size="large"></tempui-switch>
                <tempui-switch size="large" disabled></tempui-switch>
                <tempui-switch size="large" defaultChecked></tempui-switch>
                <tempui-switch size="large" loading></tempui-switch>
                <tempui-switch size="large" loading defaultChecked></tempui-switch>
              </tempui-space>

              <tempui-space>
                <tempui-switch checkedKnob={sunIcon} uncheckedKnob={moonIcon}></tempui-switch>
              </tempui-space>
              <tempui-space>
                <tempui-switch
                  loading={switchLoading.value}
                  checked={switchValue.value}
                  onChange={handleChange}
                ></tempui-switch>
              </tempui-space>
            </div>
          </tempui-layout-content>
          <tempui-layout-footer
            style={{
              height: 64,
              lineHeight: '64px',
              background: 'var(--tempui-color-fill-0)'
            }}
          >
            Footer
          </tempui-layout-footer>
        </tempui-layout>
      </tempui-layout>
      <div class={'top-20'}>
        <tempui-resizable
          style={{ backgroundColor: 'rgba(var(--tempui-grey-1), 1)' }}
          defaultSize={{
            width: 200,
            height: (200 * 9) / 16
          }}
          grid={100}
          snapGap={20}
          handleNode={{
            right: (
              <div
                style={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  width: 'fit-content'
                }}
              >
                111
                <moonIcon></moonIcon>
              </div>
            )
          }}
        >
          <div>hello resizable</div>
        </tempui-resizable>
        <div style={{ height: 300 + 'px', width: 800 + 'px', marginTop: 20 + 'px' }}>
          <tempui-resize-group>
            <div>111</div>
            <tempui-resize-handler></tempui-resize-handler>
            <tempui-resize-item
              defaultSize={'300px'}
              style={{
                backgroundColor: 'rgba(var(--tempui-grey-1), 1)',
                border: 'var(--tempui-color-border) 1px solid'
              }}
              onChange={(size, e, direction) => {
                console.log(size, e, direction)
              }}
            >
              <div>hello resizable</div>
            </tempui-resize-item>
            <tempui-resize-handler></tempui-resize-handler>
            <tempui-resize-item
              style={{
                backgroundColor: 'rgba(var(--tempui-grey-1), 1)',
                border: 'var(--tempui-color-border) 1px solid'
              }}
            >
              <div>hello resizable</div>
            </tempui-resize-item>
            <tempui-resize-handler></tempui-resize-handler>
            <tempui-resize-item
              style={{
                backgroundColor: 'rgba(var(--tempui-grey-1), 1)',
                border: 'var(--tempui-color-border) 1px solid'
              }}
            >
              <div>hello resizable</div>
            </tempui-resize-item>
          </tempui-resize-group>
        </div>
      </div>
      <div>
        <tempui-title style={{ margin: '8px 0' }}>h1. tempui Design</tempui-title>
        <tempui-title heading={2} style={{ margin: '8px 0' }}>
          h2. tempui Design
        </tempui-title>
        <tempui-title heading={3} style={{ margin: '8px 0' }}>
          h3. tempui Design
        </tempui-title>
        <tempui-title heading={4} style={{ margin: '8px 0' }}>
          h4. tempui Design
        </tempui-title>
        <tempui-title heading={5} style={{ margin: '8px 0' }}>
          h5. tempui Design
        </tempui-title>
        <tempui-title heading={6} style={{ margin: '8px 0' }}>
          h6. tempui Design
        </tempui-title>
      </div>
      <div>
        <br />
        <br />
        <div style="width: 150px;padding-left:200px">
          <tempui-text
            ellipsis={{
              rows: 2,
              showTooltip: {
                opts: { content: '可以自定义浮层里的展示内容试试看吧' }
              }
            }}
            style={{ width: 150 }}
          >
            可以自定义浮层里的展示内容试试看吧可以自定义浮层里的展示内容试试看吧
          </tempui-text>
        </div>
        <br />
        <br />
        <tempui-text size="normal">Text</tempui-text>
        <br />
        <br />
        <tempui-text type="secondary">Secondary</tempui-text>
        <br />
        <br />
        <tempui-text type="tertiary">{`Tertiary v>=1.2.0`}</tempui-text>
        <br />
        <br />
        <tempui-text type="quaternary">{`Quaternary v>=1.2.0`}</tempui-text>
        <br />
        <br />
        <tempui-text type="warning">Warning</tempui-text>
        <br />
        <br />
        <tempui-text type="danger">Danger</tempui-text>
        <br />
        <br />
        <tempui-text type="success">{`Success v>=1.7.0`}</tempui-text>
        <br />
        <br />
        <tempui-text disabled>Disabled</tempui-text>
        <br />
        <br />
        <tempui-text mark code delete underline strong>
          Default Mark
        </tempui-text>
        <br />
        <br />
        <tempui-text code>Example Code</tempui-text>
        <br />
        <br />
        <tempui-text underline>Underline</tempui-text>
        <br />
        <br />
        <tempui-text delete>Deleted</tempui-text>
        <br />
        <br />
        <tempui-text strong>Strong</tempui-text>
        <br />
        <br />
        <tempui-text link={{ href: 'https://semi.design/' }}>链接文本</tempui-text>
        <br />
        <br />
        <tempui-text link={{ href: 'https://semi.design/' }}>打开网站</tempui-text>
        <br />
        <br />
        <tempui-text link icon={<sunIcon />} underline>
          带下划线的网页链接
        </tempui-text>
      </div>
      <TooltipDemo></TooltipDemo>
      <ResizableDemo></ResizableDemo>
      <CheckboxDemo></CheckboxDemo>
      <RadioDemo></RadioDemo>
      <SkeletonDemo></SkeletonDemo>
      <ProgressDemo></ProgressDemo>
      <BannerDemo></BannerDemo>
    </div>
  )
})
export default App
