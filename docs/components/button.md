# Button

用户使用按钮来触发一个操作或者进行跳转。

## 如何引入

```ts
import { Button, ButtonGroup } from '{{projectName}}'
// or
import { Button } from '{{projectName}}'
const ButtonGroup = Button.Group
```

## 按钮类型

按钮支持以下类型`type`：

- `primary` - 默认 主要按钮
- `secondary` - 次要按钮
- `tertiary` - 第三按钮
- `warning` - 警告按钮
- `danger` - 危险按钮

<div style="display: flex; gap: 8px;">
    <tempui-button>主要按钮</tempui-button>
    <tempui-button type="secondary">次要按钮</tempui-button>
    <tempui-button type="tertiary">第三按钮</tempui-button>
    <tempui-button type="warning">警告按钮</tempui-button>
    <tempui-button type="danger">危险按钮</tempui-button>
</div>

```tsx v-monaco
import { Button } from '{{projectName}}'
function ButtonDemo() {
  return (
    <div className="btn-margin-right">
      <Button>主要按钮</Button>
      <Button type="secondary">次要按钮</Button>
      <Button type="tertiary">第三按钮</Button>
      <Button type="warning">警告按钮</Button>
      <Button type="danger">危险按钮</Button>
    </div>
  )
}
```

## 按钮主题

目前可用的主题（theme）为：

- `light`：浅色背景 `默认`
- `solid`：深色背景
- `borderless`：无背景
- `outline`：边框模式

### 浅色背景

<div style="margin-top:16px">
    <tempui-button theme='light' type='primary' style='margin-right:8px'>浅色主要</tempui-button>
    <tempui-button theme='light' type='secondary' style='margin-right:8px'>浅色次要</tempui-button>
    <tempui-button theme='light' type='tertiary' style='margin-right:8px'>浅色第三</tempui-button>
    <tempui-button theme='light' type='warning' style='margin-right:8px'>浅色警告</tempui-button>
    <tempui-button theme='light' type='danger' style='margin-right:8px'>浅色危险</tempui-button>
</div>

```tsx
import { Button } from '{{projectName}}'
function ButtonDemo() {
  return (
    <>
      <Button theme="light" type="primary" style={{ marginRight: 8 }}>
        浅色主要
      </Button>
      <Button theme="light" type="secondary" style={{ marginRight: 8 }}>
        浅色次要
      </Button>
      <Button theme="light" type="tertiary" style={{ marginRight: 8 }}>
        浅色第三
      </Button>
      <Button theme="light" type="warning" style={{ marginRight: 8 }}>
        浅色警告
      </Button>
      <Button theme="light" type="danger" style={{ marginRight: 8 }}>
        浅色危险
      </Button>
    </>
  )
}
```

### 深色背景

<div style="margin-top:16px">
    <tempui-button theme='solid' type='primary' style='margin-right:8px'>浅色主要</tempui-button>
    <tempui-button theme='solid' type='secondary' style='margin-right:8px'>浅色次要</tempui-button>
    <tempui-button theme='solid' type='tertiary' style='margin-right:8px'>浅色第三</tempui-button>
    <tempui-button theme='solid' type='warning' style='margin-right:8px'>浅色警告</tempui-button>
    <tempui-button theme='solid' type='danger' style='margin-right:8px'>浅色危险</tempui-button>
</div>

```tsx
import { Button } from '{{projectName}}'
function ButtonDemo() {
  return (
    <>
      <Button theme="solid" type="primary" style={{ marginRight: 8 }}>
        浅色主要
      </Button>
      <Button theme="solid" type="secondary" style={{ marginRight: 8 }}>
        浅色次要
      </Button>
      <Button theme="solid" type="tertiary" style={{ marginRight: 8 }}>
        浅色第三
      </Button>
      <Button theme="solid" type="warning" style={{ marginRight: 8 }}>
        浅色警告
      </Button>
      <Button theme="solid" type="danger" style={{ marginRight: 8 }}>
        浅色危险
      </Button>
    </>
  )
}
```

### 无背景

<div style="margin-top:16px">
    <tempui-button theme='borderless' type='primary' style='margin-right:8px'>浅色主要</tempui-button>
    <tempui-button theme='borderless' type='secondary' style='margin-right:8px'>浅色次要</tempui-button>
    <tempui-button theme='borderless' type='tertiary' style='margin-right:8px'>浅色第三</tempui-button>
    <tempui-button theme='borderless' type='warning' style='margin-right:8px'>浅色警告</tempui-button>
    <tempui-button theme='borderless' type='danger' style='margin-right:8px'>浅色危险</tempui-button>
</div>

```tsx
import { Button } from '{{projectName}}'
function ButtonDemo() {
  return (
    <>
      <Button theme="borderless" type="primary" style={{ marginRight: 8 }}>
        浅色主要
      </Button>
      <Button theme="borderless" type="secondary" style={{ marginRight: 8 }}>
        浅色次要
      </Button>
      <Button theme="borderless" type="tertiary" style={{ marginRight: 8 }}>
        浅色第三
      </Button>
      <Button theme="borderless" type="warning" style={{ marginRight: 8 }}>
        浅色警告
      </Button>
      <Button theme="borderless" type="danger" style={{ marginRight: 8 }}>
        浅色危险
      </Button>
    </>
  )
}
```

### 边框模式

<div style="margin-top:16px">
    <tempui-button theme='outline' type='primary' style='margin-right:8px'>浅色主要</tempui-button>
    <tempui-button theme='outline' type='secondary' style='margin-right:8px'>浅色次要</tempui-button>
    <tempui-button theme='outline' type='tertiary' style='margin-right:8px'>浅色第三</tempui-button>
    <tempui-button theme='outline' type='warning' style='margin-right:8px'>浅色警告</tempui-button>
    <tempui-button theme='outline' type='danger' style='margin-right:8px'>浅色危险</tempui-button>
</div>

```tsx
import { Button } from '{{projectName}}'
function ButtonDemo() {
  return (
    <>
      <Button theme="outline" type="primary" style={{ marginRight: 8 }}>
        浅色主要
      </Button>
      <Button theme="outline" type="secondary" style={{ marginRight: 8 }}>
        浅色次要
      </Button>
      <Button theme="outline" type="tertiary" style={{ marginRight: 8 }}>
        浅色第三
      </Button>
      <Button theme="outline" type="warning" style={{ marginRight: 8 }}>
        浅色警告
      </Button>
      <Button theme="outline" type="danger" style={{ marginRight: 8 }}>
        浅色危险
      </Button>
    </>
  )
}
```

## 尺寸大小

默认定义了三种尺寸：

- `small`：小尺寸
- `default`：中尺寸
- `large`：大尺寸

<div>
    <tempui-button size="large" style='margin-right:8px'>
        大尺寸
    </tempui-button>
    <tempui-button size="default" style='margin-right:8px'>
        默认尺寸
    </tempui-button>
    <tempui-button size="small">小尺寸</tempui-button>
</div>

```tsx
import { Button } from '{{projectName}}'

function ButtonDemo() {
  return (
    <div>
      <Button size="large" style={{ marginRight: 8 }}>
        大尺寸
      </Button>
      <Button size="default" style={{ marginRight: 8 }}>
        默认尺寸
      </Button>
      <Button size="small">小尺寸</Button>
    </div>
  )
}
```

## 块级按钮

块级按钮具有预先定义好的宽度，它的宽度与按钮里面内容的宽度无关。

<div>
<tempui-button block>块级按钮</tempui-button>
</div>

```tsx
import { Button } from '{{projectName}}'

function ButtonDemo() {
  return (
    <div>
      <Button block>块级按钮</Button>
    </div>
  )
}
```

## 禁用状态

<div style="display: flex;gap: 8px;">
<tempui-button disabled>禁用</tempui-button>
<tempui-button disabled heme="borderless">无背景禁用</tempui-button>
<tempui-button disabled theme="light">浅色禁用</tempui-button>
<tempui-button disabled theme="borderless" type="primary">无背景主要禁用</tempui-button>
<tempui-button disabled theme="solid" type="warning">深色警告禁用</tempui-button>
</div>

```tsx
import { Button } from '{{projectName}}'

function ButtonDemo() {
  return (
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
  )
}
```

## 加载状态

按钮支持加载状态，通过设置 `loading` 参数值为 `true` 即可，`注意：disabled 状态优先级高于 loading 状态。`

<div style="display: flex;gap: 8px;">
<tempui-button loading theme="solid">加载中...</tempui-button>
<tempui-button loading type="secondary">加载中...</tempui-button>
<tempui-button loading type="tertiary">加载中...</tempui-button>
<tempui-button loading type="warning">加载中...</tempui-button>
<tempui-button loading type="danger">加载中...</tempui-button>
</div>

```tsx
import { Button } from '{{projectName}}'

function ButtonDemo() {
  return (
    <div>
      <Button loading theme="solid">
        加载中...
      </Button>
      <Button loading type="secondary">
        加载中...
      </Button>
      <Button loading type="tertiary">
        加载中...
      </Button>
      <Button loading type="warning">
        加载中...
      </Button>
      <Button loading type="danger">
        加载中...
      </Button>
    </div>
  )
}
```

## 按钮组合

可以将多个按钮放入`ButtonGroup`的容器中，通过设置`size`，`disabled`，`type`可统一设置按钮组合中的按钮尺寸，是否禁用和类型。

<div style="display: flex; gap:8px">
    <div>
        <tempui-button-group size='large'>
            <tempui-button>拷贝</tempui-button>
            <tempui-button>查询</tempui-button>
            <tempui-button>剪切</tempui-button>
        </tempui-button-group>
    </div>
    <div>
        <tempui-button-group size='default'>
            <tempui-button>拷贝</tempui-button>
            <tempui-button>查询</tempui-button>
            <tempui-button>剪切</tempui-button>
        </tempui-button-group>
    </div>
    <div>
        <tempui-button-group size='small'>
            <tempui-button>拷贝</tempui-button>
            <tempui-button>查询</tempui-button>
            <tempui-button>剪切</tempui-button>
        </tempui-button-group>
    </div>
</div>

```tsx
import { ButtonGroup, Button } from '{{projectName}}'

function ButtonDemo() {
  const sizes = ['large', 'default', 'small']

  return (
    <div style={{ display: 'flex' }}>
      {sizes.map((size) => (
        <div style={{ marginRight: 10 }} key={size}>
          <ButtonGroup size={size}>
            <Button>拷贝</Button>
            <Button>查询</Button>
            <Button>剪切</Button>
          </ButtonGroup>
        </div>
      ))}
    </div>
  )
}
```

## API 参考

Button 组件的 API 参数如下：

| 属性             | 说明                 | 类型          | 默认值 |
| ---------------- | -------------------- | ------------- | ------ |
| aria-label       | 按钮的标签           | string        | -      |
| class            |                      |               | -      |
| style            |                      |               | -      |
| block            | 将按钮设置为块级按钮 | boolean       | false  |
| contentClassName | 内容区域 className   | string        | -      |
| disabled         | 禁用状态             | boolean       | false  |
| htmlType         | 按钮的 HTML 类型     | string        | button |
| loading          | 加载中状态           | boolean       | false  |
| icon             | 按钮图标             | `VNode、slot` | -      |
