import ApiService from "services/api-service"
const apiServiceInstance = new ApiService()

// export const fetchBanner = async (city_id, id) => {
//   // const a = await apiServiceInstance.getBanner(city_id, id)
//
//   // console.log('fetchBanner', a)
//   return apiServiceInstance.getBanner(city_id, id)
//     .then(banner => banner)
//     .catch((error) => console.log(error))
// }

export const fetchContent = (city_id, id) => {
  return async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const content = await apiServiceInstance.getContent(city_id, id)
        console.log('content', content)
        resolve(content)
      } catch (e) {
        console.log(e)
        reject(e)
      }
    })
  }

//   // const a = await apiServiceInstance.getBanner(city_id, id)
//
//   console.log('b', apiServiceInstance.getBanner(city_id, id)())
//   // console.log('fetchBanner', a)

  // const next = (cb) => new Promise(cb)

  // const res = await apiServiceInstance.getBanner(city_id, id)()
  //   console.log('res', res)
  //
  // return () => {
  //
  // }

    // .then(content => {
    //   console.log('getContent then', content)
    //   return next(resolve => resolve(content))
    // })
    // .catch((error) => {
    //   console.log('fetchContent error', error)
    //   return next((resolve, reject) => reject(error))
    // })

}

export const fetchProducts = async (city_id, date) => {
  return apiServiceInstance.getAllProducts(city_id, date)
    .then(products => products)
    .catch((error) => console.log(error))
}

export const fetchProduct = async (id) => {
  return apiServiceInstance.getProduct(id, true)
    .then(product => product)
    .catch((error) => console.log(error))
}

export const fetchConfim = async (data) => {
  console.log('api fetchConfim (data)', data)

  return apiServiceInstance.confimCustomer(data)
    .then(product => product)
    .catch((error) => console.log(error))
}

export const saveOrder = async (data) => {
  console.log('api saveOrder (data)', data)
  return apiServiceInstance.saveOrder(data)
}

// export const fetchAdditionalProducts = async () => {
//   return new Promise((resolve, reject) => {
//     // setTimeout(() => resolve(mockAdditional), 0)
//     resolve([])
//   })
// }