import React from 'react'
import { render } from 'react-dom'
import configureStore, { history } from "store/configureStore"
import { Provider } from "react-redux"
import App from './App'

import "bootstrap/scss/bootstrap-grid.scss"
import './index.css'
import ApiService from "services/api-service"
import { ApiServiceProvider } from "components/api-service-context"

const store = configureStore()
const apiServiceInstance = new ApiService()

render(
    <ApiServiceProvider value={apiServiceInstance}>
        <Provider store={store}>
            <App history={history}/>
        </Provider>
    </ApiServiceProvider>,
    document.getElementById('root')
)