import { BeersTypes } from './beers.types'

export function getBeers(payload) {
  return {
    type: BeersTypes.GET_BEERS,
    payload,
  }
}
export function getMoreBeers(payload) {
  return {
    type: BeersTypes.GET_MORE_BEERS,
    payload,
  }
}
export function beersResponse(payload) {
  return {
    type: BeersTypes.BEERS_RESPONSE,
    payload,
  }
}
export function filterBeers(payload) {
  return {
    type: BeersTypes.FILTER_BEERS,
    payload,
  }
}
export function setFilteredBeers(payload) {
  return {
    type: BeersTypes.SET_FILTERED_BEERS,
    payload,
  }
}
