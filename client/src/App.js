import React from 'react'
// import 'mdn-polyfills/Object.assign' // Это не нужно, у нас webpack
import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from 'react-router-dom'
import loadable from "@loadable/component"
import CatalogPage from "pages/Catalog"
import ProductPage from "pages/Product"
import Page404 from "pages/404"
import CartPage from "pages/Cart"
import CartPageOld from "pages/Cart/old"

// import CmsProductsListPage from "pages/CmsProductsListPage"
// import CmsProductFormPage from "pages/CmsProductFormPage"
// import CmsTeamPage from "pages/CmsTeamPage"
// import CmsTeamPersonFormPage from "pages/CmsTeamPersonFormPage"
// import CmsBannersPage from "pages/CmsBannersPage"
// import CmsBannerFormPage from "pages/CmsBannerFormPage"
// import CmsEntitiesPage from "pages/CmsEntitiesPage"
// import CmsEntitieFormPage from "pages/CmsEntitieFormPage"
// import CmsOrdersPage from "pages/CmsOrdersPage"
// import CmsContentPage from "pages/CmsContentsPage"
// import CmsContentFormPage from "pages/CmsContentFormPage"
// import CmsReviewsPage from "pages/CmsReviewsPage"
// import CmsReviewFormPage from "pages/CmsReviewFormPage"
// import CmsAdditivesPage from "pages/CmsAdditivesPage"
// import CmsAdditiveFormPage from "pages/CmsAdditiveFormPage"

import ContactsPage from "pages/Contacts"
import QuestionsPage from "pages/Questions"
import RecomendationsPage from "pages/Recomendations"
import DeliveryPage from "pages/Delivery"
import AboutPage from "pages/About"
import { fetchProducts } from "store/actions/productsActions"


const CmsProductsListPage = loadable(() => import('pages/CmsProductsListPage'), () => <div>Loading...</div>)
const CmsProductFormPage = loadable(() => import('pages/CmsProductFormPage'), () => <div>Loading...</div>)
const CmsTeamPage = loadable(() => import('pages/CmsTeamPage'), () => <div>Loading...</div>)
const CmsTeamPersonFormPage = loadable(() => import('pages/CmsTeamPersonFormPage'), () => <div>Loading...</div>)
const CmsBannersPage = loadable(() => import('pages/CmsBannersPage'), () => <div>Loading...</div>)
const CmsBannerFormPage = loadable(() => import('pages/CmsBannerFormPage'), () => <div>Loading...</div>)
const CmsEntitiesPage = loadable(() => import('pages/CmsEntitiesPage'), () => <div>Loading...</div>)
const CmsEntitieFormPage = loadable(() => import('pages/CmsEntitieFormPage'), () => <div>Loading...</div>)
const CmsOrdersPage = loadable(() => import('pages/CmsOrdersPage'), () => <div>Loading...</div>)
const CmsContentPage = loadable(() => import('pages/CmsContentPage'), () => <div>Loading...</div>)
const CmsContentFormPage = loadable(() => import('pages/CmsContentFormPage'), () => <div>Loading...</div>)
const CmsReviewsPage = loadable(() => import('pages/CmsReviewsPage'), () => <div>Loading...</div>)
const CmsReviewFormPage = loadable(() => import('pages/CmsReviewFormPage'), () => <div>Loading...</div>)
const CmsAdditivesPage = loadable(() => import('pages/CmsAdditivesPage'), () => <div>Loading...</div>)
const CmsAdditiveFormPage = loadable(() => import('pages/CmsAdditiveFormPage'), () => <div>Loading...</div>)
const CmsBotViberFormPage = loadable(() => import('pages/CmsBotViberFormPage'), () => <div>Loading...</div>)

const ReviewsPage = loadable(() => import('pages/Reviews'), () => <div>Loading...</div>)


const App = ({ history }) => {
    // useEffect(() => fetchProducts(), [])

    return (
      <ConnectedRouter history={history}>
          <Switch>
              <Route path="/" exact component={CatalogPage}/>
              <Route path="/catalog/" exact component={CatalogPage}/>
              <Route path="/catalog/:id/" component={ProductPage}/>
              {/*<Route exact path="cabinet" component={Home}/>*/}
              <Route path="/cart/" exact component={CartPage}/>
              <Route path="/cart_old/" exact component={CartPageOld}/>

              <Route path="/about/" exact component={AboutPage}/>
              <Route path="/contacts/" exact component={ContactsPage}/>
              <Route path="/delivery/" exact component={DeliveryPage}/>
              <Route path="/voprosy-i-otvety/" exact component={QuestionsPage}/>
              <Route path="/instrukciya-svezhesti/" exact component={RecomendationsPage}/>

              <Route path="/reviews/" exact component={ReviewsPage}/>

              {/*CMS*/}
              <Route path="/Cmslite/" exact component={CmsProductsListPage}/>
              <Route path="/Cmslite/products/" exact component={CmsProductsListPage}/>
              <Route path="/Cmslite/products/:id" component={CmsProductFormPage}/>
              <Route path="/Cmslite/products-add" exact>
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

              <Route path="/Cmslite/content" exact component={CmsContentPage}/>
              <Route path="/Cmslite/content/:id" component={CmsContentFormPage}/>
              <Route path="/Cmslite/content-add" exact>
                  <CmsContentFormPage isNew={true}/>
              </Route>

              <Route path="/Cmslite/reviews" exact component={CmsReviewsPage}/>
              <Route path="/Cmslite/reviews/:id" component={CmsReviewFormPage}/>
              <Route path="/Cmslite/reviews-add" exact>
                  <CmsReviewFormPage isNew={true}/>
              </Route>

              <Route path="/Cmslite/additives" exact component={CmsAdditivesPage}/>
              <Route path="/Cmslite/additives/:id" component={CmsAdditiveFormPage}/>
              <Route path="/Cmslite/additives-add" exact>
                  <CmsAdditiveFormPage isNew={true}/>
              </Route>

              <Route path="/Cmslite/bot-viber/" exact>
                  <CmsBotViberFormPage botId={1}/>
              </Route>


              {/*<Route path="/Cmslite/orders" exact component={CmsOrdersPage}/>*/}
              {/*<Route path="/Cmslite/orders/:id" component={CmsLitePage}/>*/}

              <Route path="/404" component={Page404}/>
              <Route path="*" component={Page404}/>
          </Switch>
      </ConnectedRouter>
    )
}
//
// const mapDispatchToProps = {
//     fetchProducts
// }
//
// export default connect(
//   null,
//   mapDispatchToProps
// )(App)

export default App