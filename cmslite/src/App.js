import React from 'react'
import loadable from "@loadable/component"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
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
const CitySelectPage = loadable(() => import('pages/CitySelectPage'), () => <div>Loading...</div>)
const LoginPage = loadable(() => import('pages/LoginPage'), () => <div>Loading...</div>)
const LogoutPage = loadable(() => import('pages/LogoutPage'), () => <div>Loading...</div>)
// const CheckCity = loadable(() => import('components/CheckCity'), () => <div>Loading...</div>)

import withRouterParams from "components/hoc/withRouterParams"
import { CITIES } from 'constants/common'


const Check = ({ city }) => {
  return (CITIES.CHITA.ENG !== city && CITIES.MOSCOW.ENG !== city) ?
    <Redirect to="/"/> : <All/>
}

const CheckCity = withRouterParams(Check)


const App = () => (
  <Router>
    <Switch>
      <Route path="/login" exact component={LoginPage}/>
      <Route path="/logout" exact component={LogoutPage}/>

      <Route path="/" exact component={CitySelectPage}/>

      <Route path="/:city" component={CheckCity}/>
    </Switch>
  </Router>
)


const All = () => (
  <>
    <Switch>
      <Route path="/:city" exact component={CmsProductsListPage}/>

      <Route path="/:city/products/" exact component={CmsProductsListPage}/>
      <Route path="/:city/products/add" exact>
        <CmsProductFormPage isNew={true}/>
      </Route>
      <Route path="/:city/products/:id" component={CmsProductFormPage}/>

      <Route path="/:city/team" exact component={CmsTeamPage}/>
      <Route path="/:city/team/add" exact>
        <CmsTeamPersonFormPage isNew={true}/>
      </Route>
      <Route path="/:city/team/:id" component={CmsTeamPersonFormPage}/>

      <Route path="/:city/banners" exact component={CmsBannersPage}/>
      <Route path="/:city/banners/add" exact>
        <CmsBannerFormPage isNew={true}/>
      </Route>
      <Route path="/:city/banners/:id" component={CmsBannerFormPage}/>

      <Route path="/:city/entities" exact component={CmsEntitiesPage}/>
      <Route path="/:city/entities/add" exact>
        <CmsEntitieFormPage isNew={true}/>
      </Route>
      <Route path="/:city/entities/:id" component={CmsEntitieFormPage}/>

      <Route path="/:city/content" exact component={CmsContentPage}/>
      <Route path="/:city/content/add" exact>
        <CmsContentFormPage isNew={true}/>
      </Route>
      <Route path="/:city/content/:id" component={CmsContentFormPage}/>

      <Route path="/:city/reviews" exact component={CmsReviewsPage}/>
      <Route path="/:city/reviews/add" exact>
        <CmsReviewFormPage isNew={true}/>
      </Route>
      <Route path="/:city/reviews/:id" component={CmsReviewFormPage}/>

      <Route path="/:city/additives" exact component={CmsAdditivesPage}/>
      <Route path="/:city/additives/add" exact>
        <CmsAdditiveFormPage isNew={true}/>
      </Route>
      <Route path="/:city/additives/:id" component={CmsAdditiveFormPage}/>

      <Route path="/:city/bot-viber/" exact>
        <CmsBotViberFormPage botId={1}/>
      </Route>

      <Route path="/:city/customers" exact component={CmsCustomersPage}/>

      <Route path="/:city/orders" exact component={CmsOrdersPage}/>
      <Route path="/:city/orders/:id" component={CmsOrderFormPage}/>

      <Route path="/404" exact component={Page404}/>
      <Route path="*" component={Page404}/>
    </Switch>
  </>
)

export default App

