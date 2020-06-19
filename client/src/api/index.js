import ApiService from "services/api-service"

const apiServiceInstance = new ApiService()
const getProducts = apiServiceInstance.getAllProducts(true)
const getProduct = apiServiceInstance.getProduct
const confimCustomer = apiServiceInstance.confimCustomer
const sendOrderApi = apiServiceInstance.sendOrder
const sendNotifyApi = apiServiceInstance.sendNotify


// todo Посмотри как объединить api, ведь путь одинаков
//  api/products/
//  api/products/idn1

// import axios from 'axios'

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

export const fetchConfim = async (data) => {
    console.log('api fetchConfim (data)', data)
    // console.log(getProduct(id))
    return confimCustomer(data)
    //   .then(result => result)
    //   .catch((error) => error)
}

export const sendOrder = async (data) => {
    console.log('api sendOrder (data)', data)
    return sendOrderApi(data)
}

export const sendNotify = async (data) => {
    console.log('api sendNotify (data)', data)
    await sendNotifyApi(data)
}


export const fetchAdditionalProducts = async () => {
    return new Promise((resolve, reject) => {
        // setTimeout(() => resolve(mockAdditional), 0)
        resolve([])
    })
}