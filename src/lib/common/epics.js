import { combineEpics, ofType } from 'redux-observable'
import { BehaviorSubject } from 'rxjs'
import { mergeMap, takeUntil } from 'rxjs/operators'
import {
  getBeersEpic,
  checkLocationEpic,
  filterBeersEpic,
} from './features/beers'
import { AppContextTypes } from './features/app-context'

export const epics = [getBeersEpic, checkLocationEpic, filterBeersEpic]
export default combineEpics(...epics)
export const epic$ = new BehaviorSubject(combineEpics(...epics))
export const rootEpic = (action$, state$, dependencies) =>
  epic$.pipe(
    mergeMap((epic) => {
      return epic(action$, state$, dependencies).pipe(
        takeUntil(action$.pipe(ofType(AppContextTypes.EPIC_END)))
      )
    })
  )
