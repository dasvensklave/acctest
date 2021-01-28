import { BeersTypes } from './beers.types'

const INITIAL_STATE = {
  authErrors: [],
  beersById: {},
  beersDetails: {},
  beersList: [],
  beersFiltered: [],
  pagesLoaded: 0,
  isLoading: false,
}

export function beers(state = INITIAL_STATE, action) {
  switch (action.type) {
    case BeersTypes.GET_BEERS:
      return {
        ...state,
        isLoading: true,
      }
    case BeersTypes.SET_FILTERED_BEERS:
      return {
        ...state,
        beersFiltered: [...action.payload.filtered],
      }
    case BeersTypes.BEERS_RESPONSE:
      return {
        ...state,
        pagesLoaded: action.payload.loadedPage,
        beersById: {
          ...state.beersById,
          ...action.payload.beersById,
        },
        beersList: [...state.beersList, ...action.payload.beersList],
        isLoading: false,
      }
    default:
      return state
  }
}
