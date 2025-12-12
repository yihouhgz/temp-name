import Notification from './implement'

setTimeout(() => {
  const notification = new Notification()
  notification.open({
    content: 'hello info',
    title: 'hi',
    duration: 0
  })
  notification.success({
    content: 'hello success',
    title: 'hi',
    duration: 0
  })
  notification.success({
    content: 'hello success',
    title: 'hi',
    theme: 'light',
    duration: 0
  })
}, 1000)
export default Notification
