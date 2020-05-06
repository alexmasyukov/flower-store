import React from "react"
import loadable from "@loadable/component"
import CmsLayout from "layouts/Cms"

// import pMinDelay from 'p-min-delay' pMinDelay(,2000)

const fallback = () => (
  <div>Загрузка...</div>
)
const CMS_ProductForm = loadable(() => import('components/CmsLite/ProductForm'), {
    fallback: fallback()
})


const CMS_ProductFormPage = () => (
  <CmsLayout>
      <CMS_ProductForm/>
  </CmsLayout>
)

export default CMS_ProductFormPage