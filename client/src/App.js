import React from 'react'
import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from 'react-router-dom'
import loadable from "@loadable/component"
import CatalogPage from "pages/Catalog"
import ProductPage from "pages/Product"
import Page404 from "pages/404"
import ContactsPage from "pages/Contacts"
import QuestionsPage from "pages/Questions"
import RecomendationsPage from "pages/Recomendations"
import DeliveryPage from "pages/Delivery"
import AboutPage from "pages/About"
const ReviewsPage = loadable(() => import('pages/Reviews'), () => <div>Loading...</div>)
const CartPage = loadable(() => import('pages/Cart'), () => <div>Loading...</div>)


const App = ({ history }) => {
    return (
      <ConnectedRouter history={history}>
          <Switch>
              <Route path="/" exact component={CatalogPage}/>
              <Route path="/catalog/" exact component={CatalogPage}/>
              <Route path="/catalog/:id/" component={ProductPage}/>
              <Route path="/cart/" exact component={CartPage}/>
              <Route path="/about/" exact component={AboutPage}/>
              <Route path="/contacts/" exact component={ContactsPage}/>
              <Route path="/delivery/" exact component={DeliveryPage}/>
              <Route path="/voprosy-i-otvety/" exact component={QuestionsPage}/>
              <Route path="/instrukciya-svezhesti/" exact component={RecomendationsPage}/>
              <Route path="/reviews/" exact component={ReviewsPage}/>
              <Route path="/404" component={Page404}/>
              <Route path="*" component={Page404}/>
          </Switch>
      </ConnectedRouter>
    )
}

export default App