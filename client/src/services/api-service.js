import axios from 'axios'

const next = (cb) => new Promise(cb)

export default class ApiService {
  _apiVersion = '/v1'

  _apiBase = process.env.NODE_ENV === 'production' ?
    'https://flower-cms.ru/api' :
    'http://localhost/api' //http://localhost/api

  _imageBase = this._apiBase + '/static/'

  getImage = (name) => `${this._imageBase}${name}`
  getThumbImage = (name) => this.getImage(`thumb_${name}`)
  getSmallImage = (name) => this.getImage(`sm_${name}`)

  getResource = (url) => {
    return axios.get(`${this._apiBase}${this._apiVersion}${url}`, {
      'Accept-Encoding': 'compress, gzip',
      withCredentials: true
    })
      .then(res => {
        // console.log(res.headers)
        return res.data
      })
      .catch(this._apiErrHandler)
  }

  postResource = async (url, obj) => {
    return await axios.post(`${this._apiBase}${this._apiVersion}${url}`, obj, {
      responseType: 'json',
      withCredentials: true
    })
      .then(res => res.data)
      .catch(this._apiErrHandler)
  }


  getAllProducts = async (cityId, date) =>
    await this.getResource(`/products?city_id=${cityId}&convert_entities=true`)

  getProduct = (cityId, id) => async () =>
    await this.getResource(`/products/${id}?city_id=${cityId}&convert_entities=true`)


  getAllReviews = (cityId) => async () =>
    await this.getResource(`/reviews?city_id=${cityId}&limit=30`)

  getLastReviews = (cityId) => async () =>
    await this.getResource(`/reviews?city_id=${cityId}&limit=3`)


  getTeam = (cityId) => async () =>
    await this.getResource(`/team?city_id=${cityId}`)

  confimCustomer = async (data) =>
    await this.postResource(`/customers/confim`, data)

  saveOrder = async (order) =>
    await this.postResource(`/orders`, order)

  getBanner = (cityId, id) => async () =>
    await this.getResource(`/banners/${id}?city_id=${cityId}`)

  getContent = (cityId, id) => async () =>
    await this.getResource(`/content/${id}?city_id=${cityId}`)


  _apiErrHandler = (error) => {
    console.warn('_apiErrHandler')
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      console.warn('error.response.data', error.response.data)
      // console.log(error.response.data);
      console.warn('error.response.headers', error.response.headers)
      // .errors.map(err => err.path + ' ' + err.message)
    } else if (error.request) {
      /*
       * The request was made but no response was received, `error.request`
       * is an instance of XMLHttpRequest in the browser and an instance
       * of http.ClientRequest in Node.js
       */
      console.log(error.request)
    } else {
      // Something happened in setting up the request and triggered an Error
      console.log('Error', error.message)
    }


    // if (error.response.status !== 404)
    // alert('Ошибка в запросе, подробности в консоли')

    // if (error.response.status === 404) {
    //   return next((resolve) => {
    //     resolve()
    //   })
    // }

    return next((resolve, reject) => {
      console.log(error)
      return reject(error)
    })
  }
}