import * as MonacoCode from 'monaco-editor'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import { defineComponent, onMounted, ref, onBeforeUnmount, h, createApp } from 'vue'
import type { App as VueApp, VNode, Component } from 'vue'

// 导入项目组件
import * as ProjectComponents from '../packages/components/index'

// @ts-expect-error: Babel standalone has no type definitions
import * as Babel from '@babel/standalone'

declare global {
  interface Window {
    // 忽略类型检查，添加React到window对象
    React: unknown
    jsx: unknown
  }
}

self.MonacoEnvironment = {
  // 提供一个定义worker路径的全局变量
  getWorker(_: unknown, label: string): Worker {
    if (label === 'json') {
      return new jsonWorker()
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new cssWorker()
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new htmlWorker()
    }
    if (label === 'typescript' || label === 'javascript') {
      return new tsWorker()
    }
    // 基础功能文件， 提供了所有语言通用功能 无论使用什么语言，monaco都会去加载他
    return new editorWorker()
  }
}

Babel.registerPreset('jsx-preset', {
  presets: [[Babel.availablePresets['env'], { modules: false }]],
  plugins: [[Babel.availablePlugins['transform-react-jsx'], { pragma: 'jsx' }]]
})

// 创建 JSX 工厂函数来适配 Vue
function jsx(
  type: string | Component,
  props: Record<string, unknown> | null,
  ...children: unknown[]
): VNode {
  // 处理 children
  const normalizedChildren = children.flat()

  // 如果 type 是字符串，尝试在已知组件中查找
  if (typeof type === 'string') {
    // 在项目组件中查找匹配的组件
    for (const key of Object.keys(ProjectComponents)) {
      const componentModule = ProjectComponents[key as keyof typeof ProjectComponents]
      if (componentModule && typeof componentModule !== 'string') {
        // 检查默认导出
        if ((componentModule as Component).name === type) {
          return h(componentModule as Component, props || {}, { default: () => normalizedChildren })
        }
        // 检查命名导出
        if (typeof componentModule === 'object' && componentModule !== null) {
          for (const subKey of Object.keys(componentModule)) {
            if (subKey === '__esModule') continue
            const subComponent = (componentModule as Record<string, Component>)[subKey]
            if (subComponent && subComponent.name === type) {
              return h(subComponent, props || {}, { default: () => normalizedChildren })
            }
          }
        }
      }
    }
  }

  // 否则直接使用 h 函数
  return h(type, props || {}, { default: () => normalizedChildren })
}

// 设置全局 JSX 函数
window.React = { createElement: jsx }
window.jsx = jsx

export const MonacoEditor = defineComponent(
  (props) => {
    const editor = ref<HTMLElement>()
    const previewRef = ref<HTMLElement>()
    let monacoEditor: MonacoCode.editor.IStandaloneCodeEditor | null = null
    let previewApp: VueApp | null = null

    onMounted(() => {
      MonacoCode.editor.defineTheme('myTheme', {
        base: 'vs',
        inherit: true,
        rules: [],
        colors: {
          'editor.foreground': '#000000',
          'editor.background': '#f9f9f9ff',
          'editorCursor.foreground': '#8B0000',
          'editor.lineHighlightBackground': '#0000FF20',
          'editorLineNumber.foreground': '#008800',
          'editor.selectionBackground': '#88000030',
          'editor.inactiveSelectionBackground': '#88000015'
        }
      })
      MonacoCode.editor.setTheme('myTheme')

      monacoEditor = MonacoCode.editor.create(editor.value!, {
        // 设置代码语言
        language: 'javascript',
        // 设置主题
        theme: 'myTheme',
        // 编辑器默认显示的值
        value: props.code,
        lineNumbers: 'off',
        fontSize: 14,
        lineHeight: 1.5,
        overviewRulerLanes: 0,
        hideCursorInOverviewRuler: true,
        scrollbar: {
          vertical: 'visible', // 垂直滚动条模式：'auto'（需要时显示）|'visible'（总是显示）|'hidden'
          useShadows: true, // 滚动时显示阴影
          verticalScrollbarSize: 8, // 垂直滚动条的宽度（px）
          horizontal: 'hidden' // 水平滚动条隐藏
        },
        overviewRulerBorder: false,
        padding: {
          top: 10,
          bottom: 10 // 编辑器底部的内边距（px）
        }
      })

      // 添加内容变化监听器，实现实时预览
      monacoEditor.onDidChangeModelContent(() => {
        updatePreview()
      })

      // 初始化预览
      updatePreview()
    })

    // 更新预览区域
    const updatePreview = () => {
      if (!previewRef.value || !monacoEditor) return

      const code = monacoEditor.getValue()

      try {
        // 销毁之前的预览应用
        if (previewApp) {
          previewApp.unmount()
          previewApp = null
        }

        // 清空预览区域
        previewRef.value.innerHTML = '<div id="preview-app"></div>'

        // 收集所有项目组件
        const componentList: Component[] = []
        Object.keys(ProjectComponents).forEach((key) => {
          const componentModule = ProjectComponents[key as keyof typeof ProjectComponents]
          if (componentModule && typeof componentModule !== 'string') {
            // 处理默认导出的组件（如 Button）
            if (
              Object.hasOwnProperty.call(componentModule, 'name') &&
              (componentModule as Component).name
            ) {
              componentList.push(componentModule as Component)
            }
            // 处理命名导出的组件对象（如 { Button, ButtonGroup }）
            else if (
              typeof componentModule === 'object' &&
              componentModule !== null &&
              !Array.isArray(componentModule)
            ) {
              Object.keys(componentModule).forEach((subKey) => {
                // 跳过 __esModule 等特殊属性
                if (subKey === '__esModule') return

                const subComponent = (
                  componentModule as Record<string, Component & { name?: string }>
                )[subKey]
                // 确保是组件对象而不是其他属性
                if (
                  subComponent &&
                  typeof subComponent === 'object' &&
                  Object.hasOwnProperty.call(subComponent, 'name')
                ) {
                  componentList.push(subComponent)
                }
              })
            }
          }
        })

        // 使用 Babel 编译 JSX 代码
        const compiledCode = Babel.transform(code, {
          presets: ['jsx-preset']
        }).code

        // 创建函数来执行编译后的代码，包含组件注册和应用挂载逻辑
        const executeCode = new Function(
          'React',
          'h',
          'createApp',
          'ProjectComponents',
          'jsx',
          'componentList',
          'appContainer',
          `
          // 执行用户代码并获取 App 组件
          ${compiledCode}
          // 在执行环境中创建 Vue 应用实例，传入 App 组件
          const app = createApp(App);

          // 注册所有项目组件到当前应用实例
          componentList.forEach(component => {
            if (component.name) {
              app.component(component.name, component);
            }
          });

          // 挂载应用到容器
          if (app && appContainer) {
            app.mount(appContainer);
            return app;
          }
          `
        )

        // 执行代码获取 Vue 应用实例
        const appContainer = previewRef.value.querySelector('#preview-app')
        const vueApp = executeCode(
          { createElement: jsx },
          h,
          createApp,
          ProjectComponents,
          jsx,
          componentList,
          appContainer
        )

        // 保存应用实例用于后续销毁
        if (vueApp) {
          previewApp = vueApp
        }
      } catch (e) {
        previewRef.value!.innerHTML = `
        <div style="color: red; padding: 10px;">
          <h3>编译错误:</h3>
          <pre>${(e as Error).message || e}</pre>
        </div>
      `
        console.error(e)
      }
    }

    onBeforeUnmount(() => {
      if (monacoEditor) {
        monacoEditor.dispose()
      }
      if (previewApp) {
        previewApp.unmount()
      }
    })

    return () => {
      return (
        <div
          style="display: flex;
        flex-direction: column;
    border-radius: 3px;
    border: 1px solid rgba(28,31,35,.08);
    margin: 24px 0;
    background: rgba(255,255,255,1);
    height: 344px;"
        >
          <div
            class="monaco-editor-preview"
            style="box-sizing: border-box;
    width: 100%;
    padding: 20px;
    border-bottom: 1px solid rgba(28,31,35,.08);"
            ref={previewRef}
          ></div>
          <div style="width: 100%; flex:1" ref={editor}></div>
        </div>
      )
    }
  },
  {
    props: {
      code: {
        type: String,
        default: `const App = () => {
  return (
    <div style="display:flex;gap:8px">
      <tempui-button type="primary">Primary Button</tempui-button>
      <tempui-button>Default Button</tempui-button>
    </div>
  )
}`
      }
    }
  }
)
