import { AppContextTypes } from './app-context.types'
export function locationChanged(payload) {
  return {
    type: AppContextTypes.LOCATION_CHANGED,
    payload,
  }
}
