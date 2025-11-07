import type { App, Component } from 'vue'
export function withInstall(app: App, components: Component[]) {
  components.forEach((component) => {
    if (component.name) app.component(component.name as string, component)
  })
}
