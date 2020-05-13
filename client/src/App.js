import React from 'react'
// import 'mdn-polyfills/Object.assign' // Это не нужно, у нас webpack
import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from 'react-router-dom'
// import loadable from "@loadable/component"

import CatalogPage from "pages/Catalog"
import ProductPage from "pages/Product"
import Page404 from "pages/404"
import CartPage from "pages/Cart"
import CartPageOld from "pages/Cart/old"
import CmsProductsListPage from "pages/CmsProductsListPage"
import CmsProductFormPage from "pages/CmsProductFormPage"
import CmsTeamPage from "pages/CmsTeamPage"
import CmsTeamPersonFormPage from "pages/CmsTeamPersonFormPage"
import CmsBannersPage from "pages/CmsBannersPage"
import CmsBannerFormPage from "pages/CmsBannerFormPage"
import CmsEntitiesPage from "pages/CmsEntitiesPage"
import CmsEntitieFormPage from "pages/CmsEntitieFormPage"


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

          <Route path="/Cmslite/" exact component={CmsProductsListPage}/>
          <Route path="/Cmslite/products/" exact component={CmsProductsListPage}/>
          <Route path="/Cmslite/products/:id" component={CmsProductFormPage}/>
          <Route path="/Cmslite/product-add" exact>
              <CmsProductFormPage isNew={true}/>
          </Route>

          <Route path="/Cmslite/team" exact component={CmsTeamPage}/>
          <Route path="/Cmslite/team/:id" component={CmsTeamPersonFormPage}/>
          <Route path="/Cmslite/team-add" exact>
              <CmsTeamPersonFormPage isNew={true}/>
          </Route>

          <Route path="/Cmslite/banners" exact component={CmsBannersPage}/>
          <Route path="/Cmslite/banners/:id" component={CmsBannerFormPage}/>
          <Route path="/Cmslite/banners-add" exact>
              <CmsBannerFormPage isNew={true}/>
          </Route>

          <Route path="/Cmslite/entities" exact component={CmsEntitiesPage}/>
          <Route path="/Cmslite/entities/:id" component={CmsEntitieFormPage}/>
          <Route path="/Cmslite/entities-add" exact>
              <CmsEntitieFormPage isNew={true}/>
          </Route>


          {/*<Route path="/Cmslite/orders" exact component={CmsLitePage}/>*/}
          {/*<Route path="/Cmslite/orders/:id" component={CmsLitePage}/>*/}

          <Route path="*" component={Page404}/>
      </Switch>
  </ConnectedRouter>
)

export default App
