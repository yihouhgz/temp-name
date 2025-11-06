// import ToastFactory from './toast-factory'
import Wrapper from './wrapper'
import Toast from './implement'
import { defaultConfig } from './type'

const toast = new Toast({
  ...defaultConfig
})

toast.info('hello info')
setTimeout(() => {
  toast.success('hello success')
}, 1000)
setTimeout(() => {
  toast.error('hello error')
}, 2000)
setTimeout(() => {
  toast.warning('hello warning')
}, 3000)
export default Wrapper
