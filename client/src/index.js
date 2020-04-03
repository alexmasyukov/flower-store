import React from 'react'
import { render } from 'react-dom'
import configureStore, { history } from "store/configureStore"
import { Provider } from "react-redux"
import App from './App'

import "bootstrap/scss/bootstrap-grid.scss"
import './index.css'

const store = configureStore()

render(
  <Provider store={store}>
    <App history={history}/>
  </Provider>,
  document.getElementById('root'))