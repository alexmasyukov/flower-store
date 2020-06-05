import React from "react"
import loadable from "@loadable/component"
import PageLayout from "layouts/Page"
import ProductsListContainer from "containers/productsList"
import FilterResetAllButtonContainer from 'containers/filtersResetAllButton'
import SelectedFiltersToRouterContainer from "containers/selectedFiltersToRouter"

// import pMinDelay from 'p-min-delay' pMinDelay(,2000)

const fallback = () => (
  <div>Загрузка...</div>
)
const Filter = loadable(() => import('components/Filter'), {
  fallback: fallback()
})


const CatalogPage = () => (
  <PageLayout>
    <div className="container">
      <div className="row">
        <div className="col-3">
          <Filter/>
          <FilterResetAllButtonContainer/>
          {/*<SelectedFiltersToRouterContainer/>*/}
        </div>
        <div className="col-9 pt-3">
          <ProductsListContainer/>
        </div>
      </div>
    </div>
  </PageLayout>
)

export default CatalogPage