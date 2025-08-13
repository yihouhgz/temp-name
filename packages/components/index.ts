import type { App } from 'vue'
import { withInstall } from './_util/install'
import Button from './button/index'
import Watermark from './watermark/index'

const components = [Button, Watermark]
export const install = (app: App) => withInstall(app, components)
