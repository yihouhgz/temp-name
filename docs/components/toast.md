<script>
    const handleShowToast = ()=>{
        const ops = {
            content: 'Hi, Toast',
            duration: 10
        }
        Toast.info(ops)
    }
</script>

# Toast

Toast 提示是对用户的操作做出及时反馈，由用户的操作触发，反馈信息可以是操作的结果状态，如成功、失败、出错、警告等

## 如何引入

```ts
import { Toast, ToastFactory } from '{{projectName}}'
```

## 普通提示

通过调用 Toast的相关 method 可以实现弹出提示。 推荐设置 stack 属性应用堆叠样式到同屏多个 Toast，Hover 展开，可有效防止一次性弹出多个并列 Toast 对用户造成干扰

<div style="display: flex; gap: 8px;">
    <tempui-button type="tertiary" @click="handleShowToast">Display Toast</tempui-button>
</div>

```tsx v-monaco
import { Toast } from '{{projectName}}'
function ToastDemo() {
  const handleShowToast = () => {
    const ops = {
      content: 'Hi, Toast',
      duration: 10
    }
    Toast.info(ops)
  }
  return (
    <div>
      <Button type="tertiary" onClick={handleShowToast}>
        Display Toast
      </Button>
    </div>
  )
}
```
