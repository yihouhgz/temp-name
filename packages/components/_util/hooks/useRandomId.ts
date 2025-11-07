export const useRandomId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}
export const useRandomIdWithPrefix = (prefix: string) => {
  return `${prefix}_${Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)}`
}
