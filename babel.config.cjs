// module.exports = {
//   presets: [
//     ['@babel/preset-env', {
//       targets: {
//         node: 'current'
//       }
//     }],
//     '@babel/preset-typescript',
//     ['@babel/preset-react', {
//       runtime: 'automatic'
//     }]
//   ],
//   plugins: [
//     '@babel/plugin-syntax-jsx'
//   ]
// }
module.exports = {
  plugins: ['@vue/babel-plugin-jsx']
}
