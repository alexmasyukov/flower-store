import React from 'react'
import 'mdn-polyfills/Object.assign'
import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from 'react-router-dom'
// import loadable from "@loadable/component"

import CatalogPage from "pages/Catalog"
import ProductPage from "pages/Product"
import Page404 from "pages/404"
import CartPage from "pages/Cart"
import CartPageOld from "pages/Cart/old"


// const Product = loadable(() => import('pages/Product'), () => <div>Loading...</div>)


const App = ({ history }) => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route path="/" exact component={CatalogPage}/>
      <Route path="/catalog/" exact component={CatalogPage}/>
      <Route path="/catalog/:product/" component={ProductPage}/>
      {/*<Route exact path="cabinet" component={Home}/>*/}
      <Route path="/cart/" exact component={CartPage}/>
      <Route path="/cart_old/" exact component={CartPageOld}/>

      <Route path="*" component={Page404}/>
    </Switch>
  </ConnectedRouter>
)

export default App
