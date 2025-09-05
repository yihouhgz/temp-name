import { writeFileSync, existsSync, readFileSync } from 'fs'
import { join, dirname } from 'path'

/**
 * 将字符串转换为大驼峰命名（PascalCase）
 * @param {string} str 
 * @returns {string}
 */
function toPascalCase(str) {
  return str.replace(/(?:^|[-_])(\w)/g, (_, char) => char.toUpperCase())
}

/**
 * 生成Vue组件的类型声明文件插件
 * @returns {import('rollup').Plugin}
 */
export default function types() {
  return {
    name: 'vue-types',

    generateBundle(options, bundle) {
      // 生成根级别的类型声明文件
      const typeFiles = {}

      // 收集所有生成的声明文件，只保留组件入口文件
      Object.keys(bundle).forEach((fileName) => {
        if (fileName.endsWith('/index.d.ts')) {
          // 只处理组件主入口文件，排除内部文件
          const parts = fileName.split('/')
          // 只处理二级目录下的index.d.ts（如 components/button/index.d.ts）
          if (parts.length === 3 && parts[0] === 'components') {
            typeFiles[fileName] = bundle[fileName]
          }
        }
      })

      // 生成主入口类型文件
      const mainTypes = `import type { App } from 'vue'
${Object.keys(typeFiles)
  .map((file) => {
    const moduleName = file.replace('/index.d.ts', '').replace('.d.ts', '')
    if (moduleName === 'index') return ''
    const componentName = toPascalCase(moduleName.split('/').pop())
    return `import ${componentName} from './${moduleName}'`
  })
  .filter(Boolean)
  .join('\n')}

declare const install: (app: App) => void

export { install }
${Object.keys(typeFiles)
  .map((file) => {
    const moduleName = file.replace('/index.d.ts', '').replace('.d.ts', '')
    if (moduleName === 'index') return ''
    const componentName = toPascalCase(moduleName.split('/').pop())
    return `export { ${componentName} }`
  })
  .filter(Boolean)
  .join('\n')}
`

      // 添加主入口类型文件到bundle
      bundle['index.d.ts'] = {
        type: 'asset',
        fileName: 'index.d.ts',
        source: mainTypes
      }
    },

    writeBundle(options) {
      // 确保package.json包含types字段
      // 获取输出目录，兼容多种配置方式
      let outputDir = options.dir;
      if (!outputDir && options.file) {
        outputDir = dirname(options.file);
      }
      
      // 如果仍然没有输出目录，则使用默认值'dist'
      if (!outputDir) {
        outputDir = 'dist';
      }
      
      const packageJsonPath = join(outputDir, 'package.json')
      if (existsSync(packageJsonPath)) {
        const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'))
        if (!packageJson.types) {
          packageJson.types = './index.d.ts'
        }
        
        // 确保main、module和exports字段正确配置
        if (!packageJson.main) {
          packageJson.main = './ui-vue-components.common.js'
        }
        
        if (!packageJson.module) {
          packageJson.module = './ui-vue-components.esm.js'
        }
        
        if (!packageJson.exports) {
          packageJson.exports = {
            ".": {
              "types": "./index.d.ts",
              "import": "./ui-vue-components.esm.js",
              "require": "./ui-vue-components.common.js"
            }
          }
        } else if (!packageJson.exports["."]) {
          packageJson.exports["."] = {
            "types": "./index.d.ts",
            "import": "./ui-vue-components.esm.js",
            "require": "./ui-vue-components.common.js"
          }
        } else if (!packageJson.exports["."].types) {
          packageJson.exports["."].types = "./index.d.ts"
        }
        
        writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
      } else {
        // 创建package.json如果不存在
        const packageJson = {
          name: 'ui-vue-components',
          version: '1.0.0',
          types: './index.d.ts',
          main: './ui-vue-components.common.js',
          module: './ui-vue-components.esm.js',
          exports: {
            '.': {
              types: './index.d.ts',
              import: './ui-vue-components.esm.js',
              require: './ui-vue-components.common.js'
            }
          }
        }
        writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
      }
    }
  }
}