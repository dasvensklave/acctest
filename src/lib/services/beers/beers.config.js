import { configService } from '../../base'
export const CONFIG_FEATURE_NAME = 'beers'
export function getBeersEndpoint() {
  return configService.getStringOrDefault(
    `${CONFIG_FEATURE_NAME}.endpoints.beers`,
    '/v2/beers'
  )
}
