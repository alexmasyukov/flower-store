import axios from 'axios'

export default class ApiService {
  _apiVersion = '/v1'

  _apiBase = process.env.NODE_ENV === 'production' ?
    'https://flower-cms.ru/api' :
    'http://localhost/api'

  _uploadImagesBase = process.env.NODE_ENV === 'production' ?
    'https://flower-cms.ru/api/upload/' :
    'http://localhost/api/upload/'

  _imageBase = this._apiBase + '/static/'

  getImage = (name) => `${this._imageBase}${name}`
  getThumbImage = (name) => this.getImage(`thumb_${name}`)
  getSmallImage = (name) => this.getImage(`sm_${name}`)

  getResource = async (url) => {
    return await axios.get(`${this._apiBase}${this._apiVersion}${url}`, {
      'Accept-Encoding': 'compress, gzip',
      withCredentials: true
    })
      .then(res => res.data)
      .catch(this._apiErrHandler)
  }

  putResource = async (url, obj = {}, params = {}) => {
    return await axios.put(`${this._apiBase}${this._apiVersion}${url}`, obj, {
      ...params,
      responseType: 'json',
      withCredentials: true
    })
      .then(res => res.data)
      .catch(this._apiErrHandler)
  }

  deleteResource = async (url, params = {}) => {
    return await axios.delete(`${this._apiBase}${this._apiVersion}${url}`, {
      ...params,
      withCredentials: true
    })
      .then(res => res.data)
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

  // todo: fix it on async await like as above
  uploadImages = (files) => {
    const data = new FormData()
    data.append('attachments', files)
    return axios.post(this._uploadImagesBase, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
      withCredentials: true
    })
      .then(res => res.data.result)
      .catch(err => {
        alert('Ошибка при загрузке изображения. Попробуйте другое изображение.')
        this._apiErrHandler(err)
      })
  }


  // Products
  getAllProducts = (cityId, convert_entities = true) => async () =>
    await this.getResource(`/products?city_id=${cityId}&all=true&convert_entities=${convert_entities}`)

  getProduct = (id, convert_entities = false) => async () =>
    await this.getResource(`/products/${id}?&all=true&convert_entities=${convert_entities}`)

  saveProduct = async (product) =>
    await this.postResource(`/products`, product)

  updateProduct = async (product) =>
    await this.putResource(`/products/${product.id}`, product)

  deleteProduct = async (id) =>
    await this.deleteResource(`/products/${id}`)

  updateProductPublic = async (id, boolValue = true) =>
    await this.putResource(`/products/${id}`, { public: boolValue })

  updateProductSizePublic = async (id, boolValue = true) =>
    await this.putResource(`/products-sizes/${id}`, { public: boolValue })

  updateProductSizeFast = async (id, boolValue = true) =>
    await this.putResource(`/products-sizes/${id}`, { fast: boolValue })

  updateProductOrderUp = async (order) =>
    await this.putResource(`/products/update-order`, {
      direction: 'up',
      value: order
    })

  updateProductOrderDown = async (order) =>
    await this.putResource(`/products/update-order`, {
      direction: 'down',
      value: order
    })


  // Entities
  getAllEntities = (cityId) => async () =>
    await this.getResource(`/entities?city_id=${cityId}`)

  getEntitie = (id) => async () =>
    await this.getResource(`/entities/${id}`)

  updateEntitie = async (entitie) =>
    await this.putResource(`/entities/${entitie.id}`, entitie)

  saveEntitie = async (entitie) =>
    await this.postResource(`/entities`, entitie)


  // Reviews
  getAllReviews = (cityId) => async () =>
    await this.getResource(`/reviews?city_id=${cityId}&all=true`)

  getReview = (id) => async () =>
    await this.getResource(`/reviews/${id}?all=true`)

  updateReview = async (review) =>
    await this.putResource(`/reviews/${review.id}`, review)

  saveReview = async (review) =>
    await this.postResource(`/reviews`, review)

  deleteReview = async (id) =>
    await this.deleteResource(`/reviews/${id}`)


  // Additives
  getAllAdditives = (cityId) => async () =>
    await this.getResource(`/additives?city_id=${cityId}&all=true`)

  getAdditive = (id) => async () =>
    await this.getResource(`/additives/${id}?all=true`)

  updateAdditive = async (additive) =>
    await this.putResource(`/additives/${additive.id}`, additive)

  saveAdditive = async (additive) =>
    await this.postResource(`/additives`, additive)

  deleteAdditive = async (id) =>
    await this.deleteResource(`/additives/${id}`)


  // BotViber
  getBotViber = (cityId) => async () =>
    await this.getResource(`/bot-viber/${cityId}?city_id=${cityId}&all=true`)

  updateBotViber = async (data) =>
    await this.putResource(`/bot-viber/${data.id}`, data)

  testBotViber = async () =>
    await this.getResource(`/bot-viber/test`)


  // Customers
  getAllCustomers = (cityId) => async () =>
    await this.getResource(`/customers?city_id=${cityId}&all=true`)

  confimCustomer = async (data) =>
    await this.putResource(`/customers/confim`, data)


  // Orders
  getAllOrders = (cityId) => async () =>
    await this.getResource(`/orders?city_id=${cityId}&all=true`)

  getOrder = (id) => async () =>
    await this.getResource(`/orders/${id}?all=true`)


  // Team
  getTeam = (cityId) => async () =>
    await this.getResource(`/team?city_id=${cityId}&all=true`)

  getAllFlorists = (cityId) => async () =>
    await this.getResource(`/team?city_id=${cityId}&is_florist=true`)

  getTeamPerson = (id) => async () =>
    await this.getResource(`/team/${id}?all=true`)

  updateTeamPerson = async (person) =>
    await this.putResource(`/team/${person.id}`, person)

  saveTeamPerson = async (person) =>
    await this.postResource(`/team`, person)

  deleteTeamPerson = async (id) =>
    await this.deleteResource(`/team/${id}`)


  // Banners
  getAllBanners = (cityId) => async () =>
    await this.getResource(`/banners?city_id=${cityId}&all=true`)

  getBanner = (id) => async () =>
    await this.getResource(`/banners/${id}?all=true`)

  updateBanner = async (banner) =>
    await this.putResource(`/banners/${banner.id}`, banner)

  saveBanner = async (banner) =>
    await this.postResource(`/banners`, banner)


  // Content
  getAllContent = (cityId) => async () =>
    await this.getResource(`/content?city_id=${cityId}&all=true`)

  getContent = (id) => async () =>
    await this.getResource(`/content/${id}?all=true`)

  updateContent = async (content) =>
    await this.putResource(`/content/${content.id}`, content)

  saveContent = async (content) =>
    await this.postResource(`/content`, content)


  // Auth
  login = async (username, password) =>
    await this.postResource(`/login`, {
      username,
      password
    })

  logout = async () =>
    await this.getResource(`/logout`)


  // Cities
  getAllCities = async () =>
    await this.getResource(`/cities`)

  _apiErrHandler = (error) => {
    console.error('_apiErrHandler')
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

    const next = (cb) => new Promise(cb)

    if (error.response.status !== 404)
      alert('Ошибка в запросе, подробности в консоли')

    if (error.response.status === 404) {
      return next((resolve) => {
        resolve([])
      })
    }

    return next((resolve, reject) => {
      reject(error)
    })
  }
}