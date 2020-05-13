import React from "react"
import loadable from "@loadable/component"
import CmsLayout from "layouts/Cms"
import { compose } from "utils"
import withApiService from "components/hoc/withApiService"
import withData from "components/hoc/withData"

const fallback = () => (
  <div>Загрузка модуля...</div>
)
const ProductsList = loadable(() => import('components/CmsLite/ProductsList'), {
    fallback: fallback()
})


const mapMethodsToProps = (apiService) => ({
    getAllProducts: apiService.getAllProducts(true),
    getImage: apiService.getImage,
    updateProductPublic: apiService.updateProductPublic,
    updateProductSizePublic: apiService.updateProductSizePublic,
    updateProductSizeFast: apiService.updateProductSizeFast
})


const ProductListContainer = compose(
  withApiService(mapMethodsToProps),
  withData({
      getDataMethod: 'getAllProducts',
      dataPropName: 'products',
      loadingText: 'products'
  })
)(ProductsList)

const cmsProductsListPage = () => (
  <CmsLayout>
      <ProductListContainer/>
  </CmsLayout>
)

export default cmsProductsListPage