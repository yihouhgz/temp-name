import { defineComponent, ref } from 'vue'

const SkeletonDemo = defineComponent({
  setup() {
    const showLoading = ref(true)
    const showContent = () => {
      showLoading.value = !showLoading.value
    }
    return () => {
      const loading = showLoading.value
      return (
        <div>
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <tempui-switch onChange={() => showContent()} />
            <span style={{ marginLeft: '10px' }}>显示加载内容</span>
          </span>
          <br />
          <tempui-skeleton active placeholder={<tempui-skeleton-avatar />} loading={loading}>
            <tempui-avatar color="blue" style={{ marginBottom: 10 + 'px' }}>
              U
            </tempui-avatar>
          </tempui-skeleton>
          <br />
          <tempui-skeleton
            style={{ width: 200 + 'px', height: 150 + 'px' }}
            placeholder={<tempui-skeleton-image />}
            loading={loading}
            active
          >
            <img
              src="https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/dy.png"
              height="150"
              alt="avatar"
            />
          </tempui-skeleton>
          <br />
          <tempui-skeleton
            active
            style={{ width: 80 + 'px' }}
            placeholder={<tempui-skeleton-title style={{ marginBottom: 10 + 'px' }} />}
            loading={loading}
          >
            <h4 style={{ marginBottom: 0 }}>Semi UI</h4>
          </tempui-skeleton>
          <tempui-skeleton
            active
            style={{ width: 240 + 'px' }}
            placeholder={<tempui-skeleton-paragraph rows={2} />}
            loading={loading}
          >
            <p style={{ width: 240 + 'px' }}>
              精心打磨每一个组件的用户体验，从用户的角度考虑每个组件的使用场景。
            </p>
          </tempui-skeleton>
          <br />
          <tempui-skeleton active placeholder={<tempui-skeleton-button />} loading={loading}>
            <tempui-button>Button</tempui-button>
          </tempui-skeleton>
        </div>
      )
    }
  },
  name: 'SkeletonDemo'
})
export default SkeletonDemo
