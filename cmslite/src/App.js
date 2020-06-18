import React from 'react'
import loadable from "@loadable/component"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import Page404 from "pages/404"
const CmsProductsListPage = loadable(() => import('pages/ProductsListPage'), () => <div>Loading...</div>)
const CmsProductFormPage = loadable(() => import('pages/ProductFormPage'), () => <div>Loading...</div>)
const CmsTeamPage = loadable(() => import('pages/TeamPage'), () => <div>Loading...</div>)
const CmsTeamPersonFormPage = loadable(() => import('pages/TeamPersonFormPage'), () => <div>Loading...</div>)
const CmsBannersPage = loadable(() => import('pages/BannersPage'), () => <div>Loading...</div>)
const CmsBannerFormPage = loadable(() => import('pages/BannerFormPage'), () => <div>Loading...</div>)
const CmsEntitiesPage = loadable(() => import('pages/EntitiesPage'), () => <div>Loading...</div>)
const CmsEntitieFormPage = loadable(() => import('pages/EntitieFormPage'), () => <div>Loading...</div>)
const CmsOrdersPage = loadable(() => import('pages/OrdersPage'), () => <div>Loading...</div>)
const CmsOrderFormPage = loadable(() => import('pages/OrderFormPage'), () => <div>Loading...</div>)
const CmsContentPage = loadable(() => import('pages/ContentPage'), () => <div>Loading...</div>)
const CmsContentFormPage = loadable(() => import('pages/ContentFormPage'), () => <div>Loading...</div>)
const CmsReviewsPage = loadable(() => import('pages/ReviewsPage'), () => <div>Loading...</div>)
const CmsReviewFormPage = loadable(() => import('pages/ReviewFormPage'), () => <div>Loading...</div>)
const CmsAdditivesPage = loadable(() => import('pages/AdditivesPage'), () => <div>Loading...</div>)
const CmsAdditiveFormPage = loadable(() => import('pages/AdditiveFormPage'), () => <div>Loading...</div>)
const CmsBotViberFormPage = loadable(() => import('pages/BotViberFormPage'), () => <div>Loading...</div>)
const CmsCustomersPage = loadable(() => import('pages/CustomersPage'), () => <div>Loading...</div>)


const App = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={CmsProductsListPage}/>
      <Route path="/products/" exact component={CmsProductsListPage}/>
      <Route path="/products/:id" component={CmsProductFormPage}/>
      <Route path="/products-add" exact>
        <CmsProductFormPage isNew={true}/>
      </Route>

      <Route path="/team" exact component={CmsTeamPage}/>
      <Route path="/team/:id" component={CmsTeamPersonFormPage}/>
      <Route path="/team-add" exact>
        <CmsTeamPersonFormPage isNew={true}/>
      </Route>

      <Route path="/banners" exact component={CmsBannersPage}/>
      <Route path="/banners/:id" component={CmsBannerFormPage}/>
      <Route path="/banners-add" exact>
        <CmsBannerFormPage isNew={true}/>
      </Route>

      <Route path="/entities" exact component={CmsEntitiesPage}/>
      <Route path="/entities/:id" component={CmsEntitieFormPage}/>
      <Route path="/entities-add" exact>
        <CmsEntitieFormPage isNew={true}/>
      </Route>

      <Route path="/content" exact component={CmsContentPage}/>
      <Route path="/content/:id" component={CmsContentFormPage}/>
      <Route path="/content-add" exact>
        <CmsContentFormPage isNew={true}/>
      </Route>

      <Route path="/reviews" exact component={CmsReviewsPage}/>
      <Route path="/reviews/:id" component={CmsReviewFormPage}/>
      <Route path="/reviews-add" exact>
        <CmsReviewFormPage isNew={true}/>
      </Route>

      <Route path="/additives" exact component={CmsAdditivesPage}/>
      <Route path="/additives/:id" component={CmsAdditiveFormPage}/>
      <Route path="/additives-add" exact>
        <CmsAdditiveFormPage isNew={true}/>
      </Route>

      <Route path="/bot-viber/" exact>
        <CmsBotViberFormPage botId={1}/>
      </Route>

      <Route path="/customers" exact component={CmsCustomersPage}/>
      <Route path="/orders" exact component={CmsOrdersPage}/>
      <Route path="/orders/:id" component={CmsOrderFormPage}/>

      <Route path="/404" component={Page404}/>
      <Route path="*" component={Page404}/>
    </Switch>
  </Router>
)

export default App

