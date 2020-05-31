import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'

// import monitorReducersEnhancer from 'store/enhancers/monitorReducer'
// import loggerMiddleware from 'store/middleware/logger'
import createRootReducer from './reducers/rootReducer'

import resetFilters from "store/middleware/resetFilters"
import cleanerAdditionalProductsMiddleware from "store/middleware/cleanerAdditionalProducts"
import verifierUnavailableProductsInCart from "store/middleware/verifierUnavailableProductsInCart"

export const history = createBrowserHistory({ basename: process.env.PUBLIC_URL })

history.listen((location) => {
  console.log('history listen', location)
  // store.dispatch(fireThisAction(location));
})

export default function configureStore(preloadedState) {
  const middlewares = [thunkMiddleware, routerMiddleware(history),
    resetFilters, cleanerAdditionalProductsMiddleware,
    verifierUnavailableProductsInCart] //loggerMiddleware
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer] //monitorReducersEnhancer
  const composedEnhancers = composeWithDevTools(...enhancers)

  const store = createStore(
    createRootReducer(history),
    preloadedState,
    composedEnhancers
  )

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers/rootReducer', () => store.replaceReducer(createRootReducer(history)))
  }

  return store
}