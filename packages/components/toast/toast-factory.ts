import { type ConfigType, defaultConfig } from './type'

export const ToastFactory = {
  create(config: ConfigType = defaultConfig) {
    console.log('ToastFactory create', config)
  }
}
