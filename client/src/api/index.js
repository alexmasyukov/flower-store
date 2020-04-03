import mockProducts from './mockProducts_OLD'
import mockProducts_25 from './mockProducts_25'
import mockProducts_26 from './mockProducts_26'
import mockAdditional from './mockAdditionalProducts'
import axios from "axios"
import { date_25, date_26 } from "containers/TIME_date"

// console.log(mockProducts)
// console.log(mockAdditional)

// todo Посмотри как объединить api, ведь путь одинаков
//  api/products/
//  api/products/idn1

export const fetchProducts = async (date) => {
   return new Promise((resolve, reject) => {
      switch (date) {
         case date_25:
            // setTimeout(() => resolve(mockProducts_25), 500)
            setTimeout(() => resolve(mockProducts), 0)
            break

         case date_26:
            // setTimeout(() => resolve(mockProducts_26), 500)
            setTimeout(() => resolve(mockProducts), 0)
            break

         default:
            setTimeout(() => resolve(mockProducts), 500)
      }

      // resolve()
   })
}

export const fetchProduct = async (slug) => {
   // console.log('api fetchProduct', slug)
   return new Promise((resolve, reject) => {
      const product = mockProducts.find(item => item.slug === slug)
      // console.log(product, slug)
      product ?
         setTimeout(() => resolve(product), 0) :
         reject('no product 404')
   })
}

export const fetchAdditionalProducts = async () => {
   return new Promise((resolve, reject) => {
      setTimeout(() => resolve(mockAdditional), 0)
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
