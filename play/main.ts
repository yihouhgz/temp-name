import { createApp } from 'vue'
import '../dist/ui-vue-components.esm.css'
import * as Components from '../dist/ui-vue-components.esm.js'
import App from './App.jsx'

console.log(Components)
const app = createApp(App)
app.use(Components)

app.mount('#app')
