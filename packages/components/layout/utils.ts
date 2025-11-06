export const provideKey = Symbol('layout')
export type provideType = {
  emitSider: () => void
}
export const isLayout = () => {
  return false
}
