import React from "react"
import loadable from "@loadable/component"
import CmsLayout from "layouts/Cms"
import { compose } from "utils"
import withApiService from "components/hoc/withApiService"
import withData from "components/hoc/withData"
import withRouterParams from "components/hoc/withRouterParams"
import { Link } from "react-router-dom"
import styles from "layouts/Cms/cmsLayout.module.sass"

const fallback = () => (
  <div>Загрузка модуля...</div>
)
const ProductsList = loadable(() => import('components/ProductsList'), {
    fallback: fallback()
})


const mapMethodsToProps = (apiService) => ({
    getAllProducts: apiService.getAllProducts(true, true),
    getImage: apiService.getImage,
    updateProductPublic: apiService.updateProductPublic,
    updateProductSizePublic: apiService.updateProductSizePublic,
    updateProductSizeFast: apiService.updateProductSizeFast,
    updateProductOrderUp: apiService.updateProductOrderUp,
    updateProductOrderDown: apiService.updateProductOrderDown,
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
      <h1>Букеты</h1>
      <Link className={styles.addBtn} to="/products-add">Добавить</Link>
      <ProductListContainer/>
  </CmsLayout>
)

export default CmsProductsListPage