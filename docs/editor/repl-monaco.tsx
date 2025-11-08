import { defineComponent } from 'vue'
import { Repl } from '@vue/repl'
import Monaco from '@vue/repl/monaco-editor'
export default defineComponent({
  setup() {
    return () => {
      return (
        <div style={{ height: '344px' }}>
          <Repl editor={Monaco} showCompileOutput></Repl>
        </div>
      )
    }
  },
  name: 'repl-monaco'
})
