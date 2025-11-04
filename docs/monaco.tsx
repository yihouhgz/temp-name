import * as monaco from 'monaco-editor'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import { defineComponent, onMounted, ref, onBeforeUnmount } from 'vue'

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

export const MonacoEditor = defineComponent(() => {
  const editor = ref()
  const previewRef = ref()
  let monacoEditor: monaco.editor.IStandaloneCodeEditor | null = null

  onMounted(() => {
    monaco.editor.defineTheme('myTheme', {
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
    monaco.editor.setTheme('myTheme')

    monacoEditor = monaco.editor.create(editor.value, {
      // 设置代码语言
      language: 'javascript',
      // 设置主题
      theme: 'myTheme',
      // 编辑器默认显示的值
      value: `import { Button } from 'tempuiComponents';
function ButtonDemo() {
  return (
    <div className="btn-margin-right">
      <Button>主要按钮1</Button>
      <Button type="secondary">次要按钮</Button>
      <Button type="tertiary">第三按钮</Button>
      <Button type="warning">警告按钮</Button>
      <Button type="danger">危险按钮</Button>
    </div>
  );
}
`,
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
      // 简单的预览实现 - 在实际项目中可能需要更复杂的处理
      previewRef.value.innerHTML = `
        <div>
          ${code}
        </div>
      `
    } catch (e) {
      previewRef.value.innerHTML = `
        <div>
          ${e}
        </div>
      `
    }
  }

  onBeforeUnmount(() => {
    if (monacoEditor) {
      monacoEditor.dispose()
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
    background: rgba(255,255,255,1);"
      >
        <div
          class="monaco-editor-perview"
          style="box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 20px;
    overflow: auto;"
          ref={previewRef}
        ></div>
        <div id="monaco-editor" style="width: 100%; height: 344px;" ref={editor}></div>
      </div>
    )
  }
})
