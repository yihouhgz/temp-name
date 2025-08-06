import { writeFile } from 'fs/promises'
import path from 'path'
import * as consola from 'consola'

async function generateVersion() {
  const pkg = require('../package.json')
  const version = pkg.version
  const filePath = path.resolve(__dirname, '../version.ts')
  await writeFile(filePath, `export const version = '${version}'`)
  consola.success(`Version ${version} generated`)
}

generateVersion()
