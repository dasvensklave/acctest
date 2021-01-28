import { AppContextTypes } from './app-context.types'
const INITIAL_STATE = {
  location: {
    locationTo: {},
    locationFrom: {},
  },
}
export function appContext(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AppContextTypes.LOCATION_CHANGED:
      return {
        ...state,
        location: {
          locationTo: {
            ...state.location.locationTo,
            ...action.payload.locationTo,
          },
          locationFrom: {
            ...state.location.locationFrom,
            ...action.payload.locationFrom,
          },
        },
      }
    default:
      return state
  }
}
