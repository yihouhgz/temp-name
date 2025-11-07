import { type ConfigType, defaultConfig } from './type'
import ToastImplement from './implement'

const ToastFactory = {
  create(config: ConfigType = defaultConfig) {
    return new ToastImplement(config)
  }
}
export default ToastFactory
