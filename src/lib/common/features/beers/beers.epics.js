import { BeersService } from '../../../services'
import { ofType } from 'redux-observable'
import { of } from 'rxjs'
import { catchError, switchMap, filter, withLatestFrom } from 'rxjs/operators'
import { BeersTypes } from './beers.types'
import { getBeers, beersResponse, setFilteredBeers } from './beers.actions'

const beersService = new BeersService()

export function getBeersEpic(action$, store$) {
  return action$.pipe(
    ofType(BeersTypes.GET_BEERS, BeersTypes.GET_MORE_BEERS),
    withLatestFrom(store$),
    switchMap(([action, state]) => {
      let loadedPage =
        state.beers.pagesLoaded === 0 ? 1 : state.beers.pagesLoaded
      if (action.type === BeersTypes.GET_MORE_BEERS) {
        loadedPage = state.beers.pagesLoaded + 1
      }
      return beersService.getBeers({ page: loadedPage }).pipe(
        switchMap((response) => {
          const beersById = response.data
            .map((item) => {
              const [month, year] = item.first_brewed.split('/')
              const methodData = {
                fermentation: item.method.fermentation.temp,
                mash: item.method.mash_temp.map(
                  (data) =>
                    `Duration: ${data.duration} , Temp: ${data.temp.value} ${data.temp.unit}`
                ),
              }
              return {
                ...item,
                first_brewed_month: month,
                first_brewed_year: year,
                method: methodData,
              }
            })
            .reduce((acc, cur) => ({ ...acc, [cur.id]: cur }), {})
          const beersList = Object.keys(beersById)
          if (beersList.length === 0) {
            loadedPage = state.beers.pagesLoaded
          }
          return of(beersResponse({ beersList, beersById, loadedPage }))
        }),
        catchError((error) => of({ type: 'AXIOS_ERROR', payload: error }))
      )
    })
  )
}

export function filterBeersEpic(action$, store$) {
  return action$.pipe(
    ofType(BeersTypes.FILTER_BEERS),
    withLatestFrom(store$),
    switchMap(([, state]) => {
      if (state.beers.beersFiltered.length > 0) {
        return of(setFilteredBeers({ filtered: [] }))
      }
      const filtered = Object.values(state.beers.beersById)
        .filter((item) => item.first_brewed_year > '2010')
        .map((item) => item.id)
      return of(setFilteredBeers({ filtered }))
    })
  )
}

export function checkLocationEpic(action$) {
  return action$.pipe(
    ofType('@@router/LOCATION_CHANGE'),
    filter(
      ({ payload }) =>
        payload.isFirstRendering &&
        payload.location.pathname.startsWith('/beer/')
    ),
    switchMap(() => {
      return of(getBeers())
    })
  )
}
