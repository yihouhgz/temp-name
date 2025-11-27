import { useRandomId } from '../_util'
import { inject } from 'vue'
import type { ConfigProviderData } from './type'
export const configProviderKey = useRandomId()
export const getConfigProviderInjection = () => inject<ConfigProviderData>(configProviderKey)
export const useConfigProvider = () => {
  const configProvider = getConfigProviderInjection()
  return configProvider
}
