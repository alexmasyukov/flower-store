import React from "react"
import loadable from "@loadable/component"
import CmsLayout from "layouts/Cms"

// import pMinDelay from 'p-min-delay' pMinDelay(,2000)

const fallback = () => (
  <div>Загрузка...</div>
)
const ProductForm = loadable(() => import('components/CmsLite/ProductForm'), {
    fallback: fallback()
})


const cmsNewProductFormPage = () => (
  <CmsLayout>
      <ProductForm/>
  </CmsLayout>
)

export default cmsNewProductFormPage