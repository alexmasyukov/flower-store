// import mockProducts from './mockProducts_OLD'
// import mockAdditional from './mockAdditionalProducts'
// import { compose } from "utils"
// import withRouterParams from "components/hoc/withRouterParams"
// import withApiService from "components/hoc/withApiService"
// import withData from "components/hoc/withData"
// import mockProducts_26 from './mockProducts_26'
// import mockProducts_25 from './mockProducts_25'
// import { date_25, date_26 } from "containers/TIME_date"

// console.log(mockProducts)
// console.log(mockAdditional)

// todo Посмотри как объединить api, ведь путь одинаков
//  api/products/
//  api/products/idn1

import axios from 'axios'
import ApiService from "services/api-service"
const apiServiceInstance = new ApiService()
const getProducts = apiServiceInstance.getAllProducts(true)

export const fetchProducts = async (date) => {
   return getProducts()
     .then(products => {
        return products.map(apiServiceInstance._transformProduct)
     })
     .catch((error) => {
        console.log(error)
     })
   // compose(
   //   withRouterPsarams,
   //   ,
   //   withData({
   //      getDataMethod: 'getAllEntities',
   //      dataPropName: 'entities',
   //      loadingText: 'entities'
   //   }),
   // return new Promise((resolve, reject) => {
   //    // switch (date) {
   //       resolve([])
   //       // case date_25:
   //       //    // setTimeout(() => resolve(mockProducts_25), 500)
   //       //    setTimeout(() => resolve(mockProducts), 0)
   //       //    break
   //       //
   //       // case date_26:
   //       //    // setTimeout(() => resolve(mockProducts_26), 500)
   //       //    setTimeout(() => resolve(mockProducts), 0)
   //       //    break
   //       //
   //       // default:
   //       //    setTimeout(() => resolve(mockProducts), 500)
   //    // }
   //
   //    // resolve()
   // })
}

export const fetchProduct = async (slug) => {
   // console.log('api fetchProduct', slug)
   return new Promise((resolve, reject) => {
      resolve({})
      // const product = mockProducts.find(item => item.slug === slug)
      // console.log(product, slug)
      // product ?
      //    setTimeout(() => resolve(product), 0) :
      //    reject('no product 404')
   })
}

export const fetchAdditionalProducts = async () => {
   return new Promise((resolve, reject) => {
      // setTimeout(() => resolve(mockAdditional), 0)
      resolve([])
   })
}

export const fetchOrderConfirmation = async () => {
   const url = `http://localhost:3500/api/v1/order-confirmation`

   return await axios.get(url)
      .then(function (response) {
         return response.data
      })
      .catch(function (error) {
         console.log(error)
      })
}
