import React from "react"
import loadable from "@loadable/component"
import { compose } from "utils"
import CmsLayout from "layouts/Cms"
import withApiService from "components/hoc/withApiService"
import withData from "components/hoc/withData"
import productModel from "models/product"


const fallback = () => (
  <div>Загрузка модуля...</div>
)
const ProductForm = loadable(() => import('components/CmsLite/ProductForm'), {
    fallback: fallback()
})


const mapMethodsToProps = (apiService) => {
    return {
        getAllEntities: apiService.getAllEntities,
        getAllFlorists: apiService.getAllFlorists,
        getAllCities: apiService.getAllCities
    }
}


const ProductFormContainer = compose(
  withApiService(mapMethodsToProps),
  withData({
      getDataMethod: 'getAllEntities',
      dataPropName: 'entities',
      loadingText: 'entities'
  }),
  withData({
      getDataMethod: 'getAllFlorists',
      dataPropName: 'florists',
      loadingText: 'florists'
  }),
  withData({
      getDataMethod: 'getAllCities',
      dataPropName: 'cities',
      loadingText: 'cities'
  })
)(ProductForm)


const cmsNewProductFormPage = () => (
  <CmsLayout>
      <ProductFormContainer product={productModel}/>
  </CmsLayout>
)

export default cmsNewProductFormPage