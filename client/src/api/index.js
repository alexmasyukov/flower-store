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
const getProduct = apiServiceInstance.getProduct

export const fetchProducts = async (date) => {
    return getProducts(true, false, false)
      .then(products => {
          return products
          // .map(apiServiceInstance._transformProduct)
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

// const _transformProduct = ({ sizes, florist, ...base }) => ({
//     ...base,
//     florist: {
//         ...florist,
//         photo: apiServiceInstance.getImage(florist.photo)
//     },
//     sizes: sizes.map(({ images, ...sizeBase }) => ({
//         images: images.map(img => apiServiceInstance.getImage(img)),
//         ...sizeBase
//     }))
// })

export const fetchProduct = async (id) => {
    console.log('api fetchProduct (id)', id)
    console.log(getProduct(id))
    return getProduct(id, true, false, false)()
      .then(product => product)
      .catch((error) => console.log(error))
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
      .then(function(response) {
          return response.data
      })
      .catch(function(error) {
          console.log(error)
      })
}
