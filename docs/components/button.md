---
projectName: your-project-name
---

<script setup lang="ts">
import { MonacoEditor } from '../monaco.tsx'
</script>

# Button

用户使用按钮来触发一个操作或者进行跳转。

### 如何引入

```ts
import { Button, ButtonGroup } from '{{projectName}}'
// or
import { Button } from '{{projectName}}'
const ButtonGroup = Button.Group
```

### 按钮类型

按钮支持以下类型`type`：

- `primary` - 默认 主要按钮
- `secondary` - 次要按钮
- `tertiary` - 第三按钮
- `warning` - 警告按钮
- `danger` - 危险按钮

<MonacoEditor>
</MonacoEditor>
