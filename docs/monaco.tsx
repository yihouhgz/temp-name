import * as MonacoCode from 'monaco-editor'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import {
  defineComponent,
  onMounted,
  ref,
  onBeforeUnmount,
  h,
  createApp,
  reactive,
  watchEffect
} from 'vue'
import type { App as VueApp, VNode, Component } from 'vue'
import { useThrottle } from '../packages/components/_util'

// 导入项目组件
import * as ProjectComponents from '../packages/components/index'

// @ts-expect-error: Babel standalone has no type definitions
import * as Babel from '@babel/standalone'

declare global {
  interface Window {
    // 忽略类型检查，添加React到window对象
    React: unknown
    jsx: unknown
    __IMPORT_FINISHED__?: boolean
  }
}
ProjectComponents.registerGlobalApiToDocs()
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
  return h(type, props || {}, { default: () => normalizedChildren })
}

// 设置全局 JSX 函数
window.React = { createElement: jsx }
window.jsx = jsx

function hasStrictImportStatement(code: string) {
  // 移除字符串内容，避免字符串中的 "import" 被误判
  const withoutStrings = code.replace(/['"`](\\?.)*?['"`]/g, '""')

  // 移除注释
  const cleanedCode = withoutStrings.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '')

  // 检测各种 import 语法
  const importPatterns = [
    /^import\s+{[\s\S]*?}\s+from\s+['"`]/, // import { x } from 'y'
    /^import\s+\*\s+as\s+\w+\s+from\s+['"`]/, // import * as x from 'y'
    /^import\s+\w+\s+from\s+['"`]/, // import x from 'y'
    /^import\s+['"`]/, // import 'module'
    /^import\s+[\s\S]*?,\s*from\s+['"`]/, // 混合导入
    /import\s*\(/ // 动态导入 import()
  ]

  return importPatterns.some((pattern) => pattern.test(cleanedCode.trim()))
}

type Options = {
  removeDynamicImports?: boolean
  preserveComments?: boolean
  removeTypeImports?: boolean
}
function clearStrictImportStatement(code: string, options?: Options): string {
  const {
    removeDynamicImports = false, // 是否移除动态导入
    preserveComments = true, // 是否保留注释
    removeTypeImports = true // 是否移除 TypeScript 类型导入
  } = options || {}

  let processedCode = code

  // 如果不保留注释，先移除注释
  if (!preserveComments) {
    processedCode = processedCode.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '')
  }

  // 静态 import 模式
  const staticPatterns = [
    /^import\s+{[\s\S]*?}\s+from\s+['"`][^'"`]+['"`];?\s*$/gm,
    /^import\s+\*\s+as\s+\w+\s+from\s+['"`][^'"`]+['"`];?\s*$/gm,
    /^import\s+\w+\s+from\s+['"`][^'"`]+['"`];?\s*$/gm,
    /^import\s+['"`][^'"`]+['"`];?\s*$/gm,
    /^import\s+[\w*{},\s]+\s+from\s+['"`][^'"`]+['"`];?\s*$/gm
  ]

  // TypeScript 类型导入
  if (removeTypeImports) {
    staticPatterns.push(/^import\s+type\s+.*?from\s+['"`][^'"`]+['"`];?\s*$/gm)
    staticPatterns.push(/^import\s+{.*?}\s+from\s+['"`][^'"`]+['"`];?\s*$/gm)
  }

  // 移除静态导入
  staticPatterns.forEach((pattern) => {
    processedCode = processedCode.replace(pattern, '')
  })

  // 如果需要移除动态导入
  if (removeDynamicImports) {
    processedCode = processedCode.replace(
      /import\s*\(['"`][^'"`]+['"`]\)/g,
      'Promise.resolve(null)'
    )
  }

  return processedCode.trim()
}

function hasAppComponent(code: string) {
  const appPatterns = [
    // function App() { ... }
    /function\s+App\s*\([^)]*\)\s*{/,
    // const App = () => { ... }
    /const\s+App\s*=\s*\([^)]*\)\s*=>/,
    // const App = function() { ... }
    /const\s+App\s*=\s*function\s*\([^)]*\)\s*{/,
    // class App extends Component { ... }
    /class\s+App\s+extends\s+\w+/,
    // var App = ...
    /(?:var|let)\s+App\s*=\s*\([^)]*\)\s*=>/,
    // export default function App() { ... }
    /export\s+default\s+function\s+App\s*\(/,
    // export default class App { ... }
    /export\s+default\s+class\s+App\s+/
  ]

  // 移除注释避免误判
  const cleanedCode = code.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '')

  return appPatterns.some((pattern) => pattern.test(cleanedCode))
}
interface ImportInfo {
  statement: string
  type: 'named' | 'default' | 'namespace' | 'mixed' | 'side-effect' | 'type' | 'type-named'
  exports: string[]
  module: string
  detailedExports?: Array<{
    original: string
    alias: string | null
    finalName: string
    isType?: boolean
  }>
  isTypeImport?: boolean
}
interface ExtractImportsResult {
  imports: string[]
  exports: string[]
  detailedImports: ImportInfo[]
  summary: {
    totalImports: number
    totalExports: number
    modules: string[]
    typeImports: number
    valueImports: number
  }
}
function extractImportsDetailedTS(code: string): ExtractImportsResult {
  // 移除注释以避免干扰
  const cleanedCode = code.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '')

  // TypeScript 特有的 import 模式
  const importPatterns = [
    // import { A, B } from 'module'
    /(import\s+\{([^}]+)\}\s+from\s+['"`]([^'"`]+)['"`])/g,
    // import type { A, B } from 'module'
    /(import\s+type\s+\{([^}]+)\}\s+from\s+['"`]([^'"`]+)['"`])/g,
    // import * as Name from 'module'
    /(import\s+\*\s+as\s+(\w+)\s+from\s+['"`]([^'"`]+)['"`])/g,
    // import Default from 'module'
    /(import\s+(\w+)\s+from\s+['"`]([^'"`]+)['"`])/g,
    // import type Default from 'module'
    /(import\s+type\s+(\w+)\s+from\s+['"`]([^'"`]+)['"`])/g,
    // import Default, { Named } from 'module'
    /(import\s+(\w+)\s*,\s*\{([^}]+)\}\s+from\s+['"`]([^'"`]+)['"`])/g,
    // import type Default, { Named } from 'module'
    /(import\s+type\s+(\w+)\s*,\s*\{([^}]+)\}\s+from\s+['"`]([^'"`]+)['"`])/g,
    // 副作用导入 import 'module'
    /(import\s+['"`]([^'"`]+)['"`])/g,
    // 动态导入（可选）
    /(import\s*\(\s*['"`]([^'"`]+)['"`]\s*\))/g
  ]

  const imports: string[] = []
  const exports: string[] = []
  const detailedImports: ImportInfo[] = []
  let typeImportsCount = 0
  let valueImportsCount = 0

  importPatterns.forEach((pattern) => {
    let match: RegExpExecArray | null
    while ((match = pattern.exec(cleanedCode)) !== null) {
      const [fullMatch, , ...groups] = match

      imports.push(fullMatch)

      const importInfo: ImportInfo = {
        statement: fullMatch,
        type: 'named',
        exports: [],
        module: '',
        isTypeImport: pattern.source.includes('import\\s+type')
      }

      // 统计类型导入和值导入
      if (importInfo.isTypeImport) {
        typeImportsCount++
      } else {
        valueImportsCount++
      }

      // 根据模式类型解析
      if (pattern.source.includes('* as')) {
        // 命名空间导入
        const namespace = groups[0]
        importInfo.type = 'namespace'
        importInfo.exports = [namespace]
        importInfo.module = groups[1]
        exports.push(namespace)
      } else if (pattern.source.includes('{')) {
        // 命名导入或混合导入
        const isTypeImport = pattern.source.includes('import\\s+type')

        if (groups.length === 2 || (isTypeImport && groups.length === 2)) {
          // import { A, B } from 'module' 或 import type { A, B } from 'module'
          const namedExports = groups[0].split(',').map((name) => {
            const trimmed = name.trim()
            const parts = trimmed.split(/\s+as\s+/)
            const finalName = parts[parts.length - 1].trim()
            return {
              original: parts[0].trim(),
              alias: parts[1] ? parts[1].trim() : null,
              finalName,
              isType: isTypeImport
            }
          })

          importInfo.type = isTypeImport ? 'type-named' : 'named'
          importInfo.exports = namedExports.map((e) => e.finalName)
          importInfo.module = groups[1]
          importInfo.detailedExports = namedExports

          exports.push(...namedExports.map((e) => e.finalName))
        } else if (groups.length === 3 || (isTypeImport && groups.length === 3)) {
          // import Default, { Named } from 'module' 或 import type Default, { Named } from 'module'
          const defaultExport = groups[0]
          const namedExports = groups[1].split(',').map((name) => {
            const trimmed = name.trim()
            const parts = trimmed.split(/\s+as\s+/)
            const finalName = parts[parts.length - 1].trim()
            return {
              original: parts[0].trim(),
              alias: parts[1] ? parts[1].trim() : null,
              finalName,
              isType: isTypeImport
            }
          })

          importInfo.type = 'mixed'
          importInfo.exports = [defaultExport, ...namedExports.map((e) => e.finalName)]
          importInfo.module = groups[2]
          importInfo.detailedExports = [
            { original: 'default', alias: null, finalName: defaultExport, isType: isTypeImport },
            ...namedExports
          ]

          exports.push(defaultExport, ...namedExports.map((e) => e.finalName))
        }
      } else if (
        pattern.source.includes('import\\s+\\w+\\s+from') ||
        pattern.source.includes('import\\s+type\\s+\\w+\\s+from')
      ) {
        // 默认导入
        const defaultExport = groups[0]
        const isTypeImport = pattern.source.includes('import\\s+type')
        importInfo.type = isTypeImport ? 'type' : 'default'
        importInfo.exports = [defaultExport]
        importInfo.module = groups[1]
        exports.push(defaultExport)
      } else if (pattern.source.includes('import\\s*\\(')) {
        // 动态导入
        importInfo.type = 'side-effect'
        importInfo.module = groups[0]
        // 动态导入没有导出名称
      } else {
        // 副作用导入
        importInfo.type = 'side-effect'
        importInfo.module = groups[0]
        // 没有导出名称
      }

      detailedImports.push(importInfo)
    }
  })

  return {
    imports,
    exports: [...new Set(exports)], // 去重
    detailedImports,
    summary: {
      totalImports: imports.length,
      totalExports: exports.length,
      modules: [...new Set(detailedImports.map((i) => i.module))],
      typeImports: typeImportsCount,
      valueImports: valueImportsCount
    }
  }
}

const importmapScript = document.createElement('script')
//设置code的import
if (importmapScript.type !== 'importmap') importmapScript.type = 'importmap'
importmapScript.innerHTML = `
    {
      "imports": {
        "tempuiComponents": "../ui-vue-components.esm.js",
        "vue": "https://unpkg.com/vue@3.5.18/dist/vue.esm-browser.js"
      }
    }
  `
document.head.appendChild(importmapScript)

export const MonacoEditor = defineComponent(
  (props) => {
    const editor = ref<HTMLElement>()
    const previewRef = ref<HTMLElement>()
    let monacoEditor: MonacoCode.editor.IStandaloneCodeEditor | null = null
    let previewApp: VueApp | null = null

    const codeState = reactive({
      code: '',
      previewCode: '',
      originalCode: props.code, // 缓存原始代码
      compiledCode: '',
      notImportCode: '',
      importMoudleScript: document.createElement('script')
    })
    document.head.appendChild(codeState.importMoudleScript)

    watchEffect(() => {
      codeState.code = props.code
      codeState.previewCode = props.code
    })

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

      const callback = useThrottle(() => {
        updatePreview()
      }, 800)
      // 添加内容变化监听器，实现实时预览
      monacoEditor.onDidChangeModelContent(callback)
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

        if (!hasAppComponent(code)) {
          return renderError('root组件App不存在 小淘皮')
        }

        // 使用 Babel 编译 JSX 代码
        const compiledCode = Babel.transform(code, {
          presets: ['jsx-preset']
        }).code

        codeState.compiledCode = compiledCode

        let executableCode = compiledCode
        if (hasStrictImportStatement(compiledCode)) {
          executableCode = clearStrictImportStatement(compiledCode)
          codeState.notImportCode = executableCode

          const res = extractImportsDetailedTS(compiledCode)
          //设置导入
          codeState.importMoudleScript.type = 'module'
          codeState.importMoudleScript.innerHTML = `
              //设置导入模块
              ${res.imports
                .map((item) => {
                  return item
                })
                .join('\n')}
              // 手动挂载到全局
              ${res.exports
                .map((item) => {
                  return `window.${item.trim()} = ${item.trim()};`
                })
                .join('\n')}
              // 通知导入已完成
              window.__IMPORT_FINISHED__ = true;
            `
        }

        // 创建函数来执行编译后的代码，包含组件注册和应用挂载逻辑
        const executeCode = new Function(
          'React',
          'h',
          'createApp',
          'ProjectComponents',
          'jsx',
          'appContainer',
          `
          // 执行用户代码并获取 App 组件
          ${executableCode}
          // 在执行环境中创建 Vue 应用实例，传入 App 组件
          const app = createApp(App);

          // 挂载应用到容器
          if (app && appContainer) {
            app.mount(appContainer);
            return app;
          }
          `
        )

        // 执行代码获取 Vue 应用实例
        const appContainer = previewRef.value.querySelector('#preview-app')

        // 如果有import语句，等待import完成后再执行
        if (hasStrictImportStatement(compiledCode)) {
          const checkImportFinished = () => {
            if (window.__IMPORT_FINISHED__) {
              const vueApp = executeCode(
                { createElement: jsx },
                h,
                createApp,
                ProjectComponents,
                jsx,
                appContainer
              )

              // 保存应用实例用于后续销毁
              if (vueApp) {
                previewApp = vueApp
              }
            } else {
              // 继续等待import完成
              setTimeout(checkImportFinished, 10)
            }
          }

          // 开始检查import是否完成
          checkImportFinished()
        } else {
          // 没有import语句，直接执行
          const vueApp = executeCode(
            { createElement: jsx },
            h,
            createApp,
            ProjectComponents,
            jsx,
            appContainer
          )

          // 保存应用实例用于后续销毁
          if (vueApp) {
            previewApp = vueApp
          }
        }
      } catch (e) {
        renderError(e as Error)
      }
    }

    const renderError = (e: Error | string) => {
      previewRef.value!.innerHTML = `
        <div style="color: red;">
          <pre>编译错误:${(e as Error).message || e}</pre>
        </div>
      `
      console.error(e)
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
    min-height: 344px;margin-bottom: 20px;"
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
    },
    name: 'MonacoEditor'
  }
)
