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
import cmsProductsListPage from "pages/cmsProductsListPage"
import cmsEditProductFormPage from "pages/cmsEditProductFormPage"
import cmsNewProductFormPage from "pages/cmsNewProductFormPage"
import cmsTeamPage from "pages/cmsTeamPage"
import cmsTeamPersonFormPage from "pages/cmsTeamPersonFormPage"
import cmsTeamNewPersonFormPage from "pages/cmsTeamNewPersonFormPage"
import cmsBannersPage from "pages/cmsBannersPage"
import cmsBannerFormPage from "pages/cmsBannerFormPage"
import cmsBannerNewFormPage from "pages/cmsBannerNewFormPage"


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

          <Route path="/cmslite/" exact component={cmsProductsListPage}/>
          <Route path="/cmslite/products/" exact component={cmsProductsListPage}/>
          <Route path="/cmslite/products/:id" component={cmsEditProductFormPage}/>
          <Route path="/cmslite/add-product" exact component={cmsNewProductFormPage}/>

          <Route path="/cmslite/team" exact component={cmsTeamPage}/>
          <Route path="/cmslite/team/:id" component={cmsTeamPersonFormPage}/>
          <Route path="/cmslite/team-add" exact component={cmsTeamNewPersonFormPage}/>

          <Route path="/cmslite/banners" exact component={cmsBannersPage}/>
          <Route path="/cmslite/banners/:id" component={cmsBannerFormPage}/>
          <Route path="/cmslite/banners-add" exact component={cmsBannerNewFormPage}/>


          {/*<Route path="/cmslite/orders" exact component={CmsLitePage}/>*/}
          {/*<Route path="/cmslite/orders/:id" component={CmsLitePage}/>*/}

          <Route path="*" component={Page404}/>
      </Switch>
  </ConnectedRouter>
)

export default App
