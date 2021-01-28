import { configService } from '..'
const FEATURE_CONFIG_KEY = 'base.http'
export function getBaseUri() {
  return configService.getStringOrDefault(
    `${FEATURE_CONFIG_KEY}.baseUri`,
    'https://api.punkapi.com'
  )
}
export function getApiKey() {
  return configService.getStringOrDefault(`${FEATURE_CONFIG_KEY}.apiKey`, '')
}
