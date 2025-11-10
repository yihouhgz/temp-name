import concurrently from 'concurrently'
import { existsSync } from 'fs'
import { join } from 'path'

// 检查dist目录中的构建文件是否已存在
function checkDistFiles(): Promise<void> {
  return new Promise((resolve) => {
    const checkInterval = setInterval(() => {
      const esmFile = join(process.cwd(), 'dist', 'index.d.ts')

      // 检查文件是否存在
      if (existsSync(esmFile)) {
        clearInterval(checkInterval)
        resolve()
      }
    }, 500)

    setTimeout(() => {
      clearInterval(checkInterval)
      resolve()
    }, 30000)
  })
}

// 启动开发环境
async function startDevEnvironment() {
  console.log('🚀 正在启动开发环境...')

  console.log('🔧 步骤1: 执行组件库打包')
  const buildProcess = concurrently(
    [
      {
        command: 'pnpm run build-test:watch',
        name: 'build',
        prefixColor: 'blue'
      }
    ],
    {
      prefix: 'name',
      killOthers: ['failure']
    }
  )

  // 等待构建文件生成
  console.log('⏳ 等待构建完成...')
  await checkDistFiles()
  console.log('✅ 步骤1完成: 组件库打包完成')

  // 第二步：启动play和docs任务
  console.log('🔧 步骤2: 启动文档库和play环境')
  const otherProcess = concurrently(
    [
      {
        command: 'pnpm -C play dev',
        name: 'play',
        prefixColor: 'green'
      },
      {
        command: 'pnpm -C docs docs:dev',
        name: 'docs',
        prefixColor: 'magenta'
      }
    ],
    {
      prefix: 'name',
      killOthers: ['failure', 'success']
    }
  )

  console.log('✅ 步骤2完成: 文档库和play环境已启动')

  try {
    await Promise.all([buildProcess.result, otherProcess.result])
  } catch (error) {
    console.error('❌ 开发环境启动失败:', error)
  }
}

// 执行开发环境启动
startDevEnvironment().catch((error) => {
  console.error('💥 启动开发环境时出错:', error)
  process.exit(1)
})
