import React from "react"
import loadable from "@loadable/component"
import CmsLayout from "layouts/Cms"
import { compose } from "utils"
import withRouterParams from "components/hoc/withRouterParams"
import withApiService from "components/hoc/withApiService"
import withData from "components/hoc/withData"

// import pMinDelay from 'p-min-delay' pMinDelay(,2000)

const fallback = () => (
  <div>Загрузка...</div>
)
const ProductForm = loadable(() => import('components/CmsLite/ProductForm'), {
    fallback: fallback()
})


const mapMethodsToProps = (apiService, props) => {
    return {
        getProduct: apiService.getProduct(props.id),
        getAllEntities: apiService.getAllEntities,
        getAllFlorists: apiService.getAllFlorists
        // updatePublicProductSize: apiService.updatePublicProductSize
    }
}


const ProductFormContainer = compose(
  withRouterParams,
  withApiService(mapMethodsToProps),
  withData({
      getDataMethod: 'getProduct',
      dataPropName: 'product',
      loadingText: 'product'
  }),
  withData({
      getDataMethod: 'getAllEntities',
      dataPropName: 'entities',
      loadingText: 'entities'
  }),
  withData({
      getDataMethod: 'getAllFlorists',
      dataPropName: 'florists',
      loadingText: 'florists'
  })
)(ProductForm)


const cmsEditProductFormPage = () => (
  <CmsLayout>
      <ProductFormContainer/>
  </CmsLayout>
)

export default cmsEditProductFormPage