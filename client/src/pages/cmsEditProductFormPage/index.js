import React from 'react'
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
        getAllFlorists: apiService.getAllFlorists,
        getAllCities: apiService.getAllCities,
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
  }),
  withData({
      getDataMethod: 'getAllCities',
      dataPropName: 'cities',
      loadingText: 'cities'
  })
)(ProductForm)

const cmsEditProductFormPage = () => (
  <CmsLayout>
      <ProductFormContainer/>
  </CmsLayout>
)


export default cmsEditProductFormPage


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
