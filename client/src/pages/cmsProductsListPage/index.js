import React from "react"
import loadable from "@loadable/component"
import CmsLayout from "layouts/Cms"

// import pMinDelay from 'p-min-delay' pMinDelay(,2000)

const fallback = () => (
  <div>Загрузка модуля...</div>
)
const ProductsList = loadable(() => import('components/CmsLite/ProductsList'), {
    fallback: fallback()
})


const cmsProductsListPage = () => (
  <CmsLayout>
      <ProductsList/>
  </CmsLayout>
)

export default cmsProductsListPage