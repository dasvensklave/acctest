import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { createEpicMiddleware } from 'redux-observable'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  connectRouter,
  routerMiddleware,
  ConnectedRouter,
} from 'connected-react-router'
import { Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { httpService } from './lib/base'
import rootEpic from './lib/common/epics'
import { beers, appContext } from './lib/common/reducers'
import GlobalStyles from './GlobalStyles'
import App from './containers/App'
import BeerDetails from './containers/BeerDetails'
import Header from './components/Header'

// there we initialize http axios factory/service
// enhanced with RxJs as a observable quite fancy stuff :)
httpService.init()

const routeHistory = createBrowserHistory()

const reducers = combineReducers({
  router: connectRouter(routeHistory),
  appContext,
  beers,
})

// in my opinion epics / redux observables - by RxJs
// are pritty powerful
// we can create an action and dispatch it without touching any state and or components
// like:
// dispatch action BEFORE_GET_BEERS
// catch that in a epic ofType('BEFORE_GET_BEERS')
// and then do anything with the whole app state/data
// fire action to wait when user or other app parts / components will finish something and then
// proceed to next manipulations and or actions
// like collect all user input data with paralelly fetched data from API's
// and so on - almost limitless posibilities (but only if we follow instructins)
// p.s. and these RxJs epics/observables/subject tgings are framweork agnostic
// also could be combined loaded dynamically conditionally and so on so on....
const epicMiddleware = createEpicMiddleware()

let middleware = applyMiddleware(
  routerMiddleware(routeHistory),
  require('redux-freeze'),
  epicMiddleware
)

if (process.env.NODE_ENV !== 'production') {
  middleware = composeWithDevTools(middleware)
}

const store = createStore(reducers, {}, compose(middleware))

epicMiddleware.run(rootEpic)

const routes = [
  {
    path: '/',
    component: App,
    id: 'BEERS_LIST',
  },
  {
    path: '/beer/:id',
    component: BeerDetails,
    id: 'BEER_DETAIL',
  },
]

const routeRender = routes.map((route, i) => <Route key={i} exact {...route} />)

render(
  <Provider store={store}>
    <GlobalStyles />
    <ConnectedRouter history={routeHistory}>
      <Header />
      <Switch>{routeRender}</Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
