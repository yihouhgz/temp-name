import Button from './button/index'
import Watermark from './watermark/index'

export const components = [Button, Watermark]

type App = {
  use: (...args: unknown[]) => unknown
  component: (name: string, component: any) => void
}
export const install = (app: App) => {
  components.forEach((component) => {
    console.log(app, component)
    app.component(
      component.name as typeof component & { name: string },
      component
    )
  })
}
