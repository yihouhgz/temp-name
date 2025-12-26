import { defineComponent } from 'vue'
const IconSemiLogo = (props: Record<string, unknown>) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      focusable="false"
      aria-hidden="true"
      {...props}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.62 17.5a8.25 8.25 0 0 1 0-16.5v16.5Zm2.75-11a8.25 8.25 0 1 1 0 16.5V6.5Z"
        fill="currentColor"
      ></path>
    </svg>
  )
}
const IconAvatar = () => {
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
      <circle cx="12" cy="12" r="11" fill="#FBCD2C"></circle>
      <mask
        id="mask0_1_3014"
        maskUnits="userSpaceOnUse"
        x="1"
        y="1"
        width="22"
        height="22"
        style="mask-type: alpha;"
      >
        <circle cx="12" cy="12" r="11" fill="#A2845E"></circle>
      </mask>
      <g mask="url(#mask0_1_3014)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12 17.8c1.72 0 3.25-1.44 4.09-3.6.52-.2 1.02-.86 1.24-1.7.3-1.1.24-2.09-.56-2.4-.08-3.83-1.6-5.31-4.77-5.31-3.18 0-4.69 1.48-4.77 5.32-.8.3-.86 1.28-.57 2.39.23.84.73 1.5 1.25 1.7.84 2.16 2.37 3.6 4.09 3.6Zm8.01 5.2c.33 0 .58-.3.46-.6-.86-2.14-4.33-3.74-8.47-3.74-4.14 0-7.61 1.6-8.47 3.74-.12.3.13.6.46.6H20Z"
          fill="white"
        ></path>
      </g>
    </svg>
  )
}
const IconDescriptions = () => {
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
      <rect
        x="2.75"
        y="2.75"
        width="18.5"
        height="18.5"
        rx="3"
        fill="white"
        stroke="#AAB2BF"
        stroke-width="1.5"
      ></rect>
      <rect x="5" y="6" width="4" height="2" fill="#AAB2BF"></rect>
      <rect x="5" y="11" width="4" height="2" fill="#AAB2BF"></rect>
      <rect x="5" y="16" width="2" height="2" fill="#AAB2BF"></rect>
      <rect x="11" y="11" width="4" height="2" fill="#324350"></rect>
      <rect x="11" y="16" width="8" height="2" fill="#324350"></rect>
      <rect x="11" y="6" width="8" height="2" fill="#324350"></rect>
    </svg>
  )
}
const IconTree = () => {
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
      <rect x="9" y="16" width="13" height="5" rx="0.5" fill="#6A6F7F"></rect>
      <rect x="9" y="9" width="13" height="5" rx="0.5" fill="#6A6F7F"></rect>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5 6a1 1 0 0 1 1 1v11h1a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z"
        fill="#AAB2BF"
      ></path>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5 12a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1Z"
        fill="#AAB2BF"
      ></path>
      <rect x="2" y="2" width="15" height="5" rx="0.5" fill="#4CC3FA"></rect>
    </svg>
  )
}
export default defineComponent({
  name: 'NavigationDemo',
  setup() {
    return () => {
      return (
        <div style="display: flex;">
          <tempui-nav
            bodyStyle={{ height: 420 + 'px' }}
            items={[
              { itemKey: 'user', text: '用户管理', icon: <IconAvatar /> },
              { itemKey: 'union', text: '活动管理', icon: <IconDescriptions /> },
              {
                text: '任务平台',
                icon: <IconTree />,
                itemKey: 'job',
                items: [
                  '任务管理',
                  '用户任务查询',
                  {
                    itemKey: 'operation-management',
                    text: '运营管理',
                    items: ['人员管理', '人员变更']
                  }
                ]
              }
            ]}
            header={{
              logo: <IconSemiLogo style={{ height: '36px', fontSize: 36 + 'px' }} />,
              text: 'Semi 运营后台'
            }}
            footer={{
              collapseButton: true
            }}
            onSelect={(data: unknown) => console.log('trigger onSelect: ', data)}
            onClick={(data: unknown) => console.log('trigger onClick: ', data)}
          />

          <br />
          <tempui-nav
            bodyStyle={{ height: 400 + 'px' }}
            defaultOpenKeys={['user', 'union']}
            onSelect={(data: unknown) => console.log('trigger onSelect: ', data)}
            onClick={(data: unknown) => console.log('trigger onClick: ', data)}
          >
            <tempui-nav-header
              logo={<IconSemiLogo style={{ height: '36px', fontSize: 36 }} />}
              text={'Semi 运营后台'}
            />
            <tempui-nav-item itemKey={'union'} text={'活动管理'} icon={<IconAvatar />} />
            <tempui-nav-sub itemKey={'user'} text="用户管理" icon={<IconDescriptions />}>
              <tempui-nav-item itemKey={'active'} text={'活跃用户'} />
              <tempui-nav-item itemKey={'negative'} text={'非活跃用户'} />
            </tempui-nav-sub>

            <tempui-nav-sub itemKey={'union-management'} text="任务管理" icon={<IconTree />}>
              <tempui-nav-item itemKey={'notice'} text={'任务设置'} />
              <tempui-nav-item itemKey={'query'} text={'任务查询'} />
              <tempui-nav-item itemKey={'info'} text={'信息录入'} />
            </tempui-nav-sub>
            <tempui-nav-footer collapseButton={true} />
          </tempui-nav>
        </div>
      )
    }
  }
})
