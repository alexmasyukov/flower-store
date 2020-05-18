import React from 'react'
import loadable from "@loadable/component"
import CmsLayout from "layouts/Cms"
import { compose } from "utils"
import withRouterParams from "components/hoc/withRouterParams"
import withApiService from "components/hoc/withApiService"
import withData from "components/hoc/withData"
import productModel from "models/product"
import productSizeModel from "models/productSize"

// import pMinDelay from 'p-min-delay' pMinDelay(,2000)

const fallback = () => (
  <div>Загрузка модуля...</div>
)
const ProductForm = loadable(() => import('components/CmsLite/ProductForm'), {
    fallback: fallback()
})


const mapMethodsToProps = (apiService, props) => {
    return {
        getProduct: apiService.getProduct(props.id),
        getAllEntities: apiService.getAllEntities,
        getAllFlorists: apiService.getAllFlorists,
        saveProduct: apiService.updateProduct,
        uploadImages: apiService.uploadImages,
        getImage: apiService.getImage
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


const mapMethodsToProps_NewItem = (apiService) => {
    return {
        getAllEntities: apiService.getAllEntities,
        getAllFlorists: apiService.getAllFlorists,
        saveProduct: apiService.saveProduct,
        uploadImages: apiService.uploadImages,
        getImage: apiService.getImage
    }
}

const ProductFormContainer_NewItem = compose(
  withRouterParams,
  withApiService(mapMethodsToProps_NewItem),
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

const emptyProductWithEmptySize = {
    ...productModel,
    sizes: [
        {
            ...productSizeModel
        }
    ]
}

const CmsProductFormPage = ({ isNew }) => (
  <CmsLayout>
      {isNew ? (
        <ProductFormContainer_NewItem product={emptyProductWithEmptySize}/>
      ) : (
        <ProductFormContainer/>
      )}
  </CmsLayout>
)


export default CmsProductFormPage


/**
 withRouterParams
 withApiService(mapMethodsToProps) - проброс нужных методов в компонент из api
 withData - запрос на получение товара по id в data props

 Получить id
 получить методы из api (с уже включенным id)
 получить данные о товаре props -> product={product}
 получить данные о справочнике props -> entities={entities}
 получить данные о флористах props -> florists={florists}

 пробросить все это в компонент
 <Component product={} entities={} florists={}

 данные может получить один и тотже hoc, нужно указать метод
 и название пропса
 dynamicProps[someVariable] = value;
 <component {...dynamicProps}/>s
 **/
