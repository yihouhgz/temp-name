export const useRandomId = (length = 10) => {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}
export const useRandomIdWithPrefix = (prefix: string, length = 10) => {
  return `${prefix}_${useRandomId(length)}`
}
