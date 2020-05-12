import React from 'react'
import loadable from "@loadable/component"
import { compose } from "utils"
import CmsLayout from "layouts/Cms"
import withApiService from "components/hoc/withApiService"
import withData from "components/hoc/withData"
import productModel from "models/product"
import productSizeModel from "models/productSize"


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
        getAllCities: apiService.getAllCities,
        saveProduct: apiService.saveProduct,
        uploadImages: apiService.uploadImages,
        getImage: apiService.getImage
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

const emptyProductWithEmptySize = {
    ...productModel,
    sizes: [
        {
            ...productSizeModel,
            flowers: [0, 0],
            flowers_counts: [0, 0],
        }
    ]
}

const cmsNewProductFormPage = () => (
  <CmsLayout>
      <ProductFormContainer product={emptyProductWithEmptySize}/>
  </CmsLayout>
)

export default cmsNewProductFormPage