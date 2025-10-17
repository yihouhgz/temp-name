import { ref, defineComponent, watchEffect } from 'vue'
import { Button } from '../dist'
import './styles/app.scss'
const App = defineComponent(() => {
  const loading = ref(false)
  const inputvalue = ref('llll')
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
  return () => (
    <div>
      <div>
        <tempui-sync-button onClick={handleSync}>hello</tempui-sync-button>
        <Button type="primary">确定</Button>
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
            Content
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
    </div>
  )
})
export default App
