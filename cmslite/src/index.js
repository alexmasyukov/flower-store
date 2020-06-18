import React from 'react'
import { render } from 'react-dom'
import App from './App'
import { ApiServiceProvider } from "components/api-service-context"
import ApiService from "services/api-service"
import * as serviceWorker from './serviceWorker'
import "bootstrap/scss/bootstrap-grid.scss"
import "./App.css"

const apiServiceInstance = new ApiService()

render(
  <div >
    <ApiServiceProvider value={apiServiceInstance}>
      <App/>
    </ApiServiceProvider>
  </div>,
  document.getElementById('root')
)

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()