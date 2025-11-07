import ToastFactory from './toast-factory'

const Toast = ToastFactory.create()
export { Toast, ToastFactory }

Toast.info({
  content: 'hello info',
  duration: 0,
  theme: 'light',
  stack: true
})
setTimeout(() => {
  Toast.success({
    content: 'hello success',
    duration: 0,
    theme: 'light',
    stack: true
  })
}, 1000)
setTimeout(() => {
  Toast.error({
    content: 'hello error',
    duration: 0,
    theme: 'light',
    stack: true
  })
}, 2000)
setTimeout(() => {
  const id = 'hello'
  Toast.warning({
    content: 'hello warning',
    id,
    duration: 0,
    theme: 'light',
    stack: true
  })
  setTimeout(() => {
    Toast.success({
      content: 'hello success',
      duration: 0,
      id,
      theme: 'light',
      stack: true
    })
  }, 1000)
}, 3000)
