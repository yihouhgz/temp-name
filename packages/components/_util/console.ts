import { consola } from 'consola'
import { prefix } from 'constants/config'

const types = [
  'info',
  'start',
  'success',
  'error',
  'log',
  'warn',
  'error',
  'box'
] as const
type LogType = (typeof types)[number]
type LogFunctions = Record<
  LogType,
  (message: unknown, ...args: unknown[]) => void
>
const generateConsola = () => {
  const functions: LogFunctions | Record<string, unknown> = {}
  const consolaTag = consola.withTag(prefix)
  types.forEach((type) => {
    functions[type] = (
      message: consola.InputLogObject | unknown,
      ...args: unknown[]
    ) => {
      consolaTag[type](message, ...args)
    }
  })
  return functions as LogFunctions
}
const consolaWapper = generateConsola()
export default consolaWapper
