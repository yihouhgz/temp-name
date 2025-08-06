// import { name } from './package.json'
import typescript from 'rollup-plugin-typescript2'
import vuePlugin from 'rollup-plugin-vue'
// import autoprefixer from 'autoprefixer'
import postcss from 'rollup-plugin-postcss'
import nodeResolve from '@rollup/plugin-node-resolve'
import images from '@rollup/plugin-image'
import copy from 'rollup-plugin-copy'
import babel from 'rollup-plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
// import { terser } from 'rollup-plugin-terser'
// import scss from 'rollup-plugin-scss'

const name = 'ui-vue-components'
const file = (type) => `dist/${name}.${type}.js`

export default {
  name: name,
  file,
  input: './packages/components/index.ts',
  output: [
    {
      name,
      file: file('esm'),
      format: 'esm'
    },
    {
      name,
      file: file('common'),
      format: 'commonjs'
    }
  ],
  external: ['vue'],
  plugins: [
    nodeResolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      moduleDirectories: ['node_modules']
    }),
    commonjs(),
    postcss({
      modules: false, // 启用 CSS Modules
      extract: (css) => {
        const fileName = css
          .split('/')
          .pop()
          .replace(/\.[^/.]+$/, '')
        return `dist/styles/${fileName}.css`
      }, // 提取 CSS 到单独文件
      use: ['sass'] // 使用 Sass 编译器
    }),
    typescript({
      // tsconfig: './tsconfig.base.json',
      tsconfigOverride: {
        compilerOptions: {
          declaration: true,
          jsx: 'preserve',
          moduleResolution: 'node',
          emitDeclarationOnly: false,
          noEmit: false
        },
        exclude: ['**/*.test.ts', '**/*.test.tsx']
      },
      include: ['packages/**/*']
    }),
    babel({
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    }),
    vuePlugin(),
    // scss({
    //   processor: () => postcss([autoprefixer()])
    // }),
    // postcss({
    //   plugins: [autoprefixer()],
    //   extract: 'bundle.css'
    // }),
    images({ include: ['**/*.png', '**/*.jpg', '**/*.svg'] }),
    copy({
      targets: [
        {
          src: 'packages/assets/*',
          dest: 'dist/assets'
        }
      ]
    })
    // terser()
  ]
}
