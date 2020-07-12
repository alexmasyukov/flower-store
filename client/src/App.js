import React from 'react'
import { ConnectedRouter } from 'connected-react-router'
import { Redirect, Route, Switch, useParams } from 'react-router-dom'
import loadable from "@loadable/component"
import Page404 from "pages/404"
import { CITIES } from "constants/common"
import { ROUTES } from "constants/routes"

import CatalogPage from "pages/Catalog"
import AboutPage from "pages/About"
import ContactsPage from "pages/Contacts"
import DeliveryPage from "pages/Delivery"
import QuestionsPage from "pages/Questions"
import RecomendationsPage from "pages/Recomendations"
import { getCityIdByEngName } from "utils"

const ProductPage = loadable(() => import('pages/Product'), () => <div>Loading...</div>)
const ReviewsPage = loadable(() => import('pages/Reviews'), () => <div>Loading...</div>)
const CartPage = loadable(() => import('pages/Cart'), () => <div>Loading...</div>)
// const Yandex = loadable(() => import('components/Yandex'), () => <div>Loading...</div>)
export const CityContext = React.createContext()

const components = {
  'CatalogPage': CatalogPage,
  'AboutPage': AboutPage,
  'ContactsPage': ContactsPage,
  'DeliveryPage': DeliveryPage,
  'QuestionsPage': QuestionsPage,
  'RecomendationsPage': RecomendationsPage,
  'ProductPage': ProductPage,
  'ReviewsPage': ReviewsPage,
  'CartPage': CartPage
}

const CheckCity = ({ children }) => {
  const { city } = useParams()
  const foundCity = getCityIdByEngName(city, CITIES)

  if (!foundCity)
    return <Redirect to="/404"/>

  return (
    <CityContext.Provider value={foundCity}>
      {children}
    </CityContext.Provider>
  )
}


const App = ({ history }) => {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path={`/`} exact>
          <Redirect to={`/${CITIES.CHITA.eng}`}/>
        </Route>

        <Route path="/404" exact component={Page404}/>

        <Route path={`/:city`}>
          <CheckCity>
            <Switch>
              {ROUTES.map(({ path, componentName, ...props }, i) => {
                const Component = components[componentName]
                return (
                  <Route
                    key={i}
                    path={`/:city${path}`}
                    component={Component}
                    {...props}
                  />
                )
              })}
              <Route path="/:city/404" exact component={Page404}/>
              <Route path="/:city/*" component={Page404}/>
            </Switch>
          </CheckCity>
        </Route>

        <Route path="*" component={Page404}/>
      </Switch>
    </ConnectedRouter>
  )
}

export default App