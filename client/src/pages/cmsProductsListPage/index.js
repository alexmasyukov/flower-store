import React from "react"
import loadable from "@loadable/component"
import CmsLayout from "layouts/Cms"
import { compose } from "utils"
import withApiService from "components/hoc/withApiService"
import withData from "components/hoc/withData"
import withRouterParams from "components/hoc/withRouterParams"

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
    updateProductSizeFast: apiService.updateProductSizeFast,
    deleteProduct: apiService.deleteProduct,
})


const ProductListContainer = compose(
  withRouterParams,
  withApiService(mapMethodsToProps),
  withData({
      getDataMethod: 'getAllProducts',
      dataPropName: 'products',
      loadingText: 'products'
  })
)(ProductsList)

const CmsProductsListPage = () => (
  <CmsLayout>
      <ProductListContainer/>
  </CmsLayout>
)

export default CmsProductsListPage