import Notification from './implement'

// setTimeout(() => {
//   const notification = new Notification()
//   notification.config({
//     bottom: 100
//   })
//   notification.open({
//     content: 'hello info',
//     title: 'hi'
//     // duration: 0
//   })
//   notification.success({
//     content: 'hello success',
//     title: 'hi',
//     duration: 0
//   })
//   const opts = {
//     title: 'Hi, Bytedance',
//     content: 'Hi, Bytedance dance dance',
//     duration: 0,
//     theme: 'light'
//   } as const
//   notification.info(opts)
//   notification.success(opts)
//   notification.warning(opts)
//   const closeId = notification.danger(opts)

//   setTimeout(() => {
//     notification.close(closeId)
//   }, 3000)

//   const id = notification.open({
//     title: 'Hi, Bytedance',
//     content: 'ies dance dance dance',
//     duration: 3
//   })
//   setTimeout(() => {
//     notification.open({
//       title: 'Hi, Bytedance',
//       content: 'updated',
//       duration: 3,
//       id
//     })
//   }, 1000)
// }, 1000)
export default Notification
