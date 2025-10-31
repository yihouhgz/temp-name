// import ToastFactory from './toast-factory'
import Wrapper from './wrapper'
import { createApp } from 'vue'

const app = createApp(Wrapper)
// app.mount(document.body)
const div = document.createElement('div')
document.body.appendChild(div)
app.mount(div)
export default Wrapper
