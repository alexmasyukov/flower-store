import axios from 'axios'

export default class ApiService {
    // https://create-react-app.dev/docs/adding-custom-environment-variables/
    _apiBase = process.env.NODE_ENV === 'production' ?
      '/api/v1' :
      'http://localhost/api/v1'

    _uploadImagesBase = 'http://localhost/api/upload/'

    _imageBase = '/api/static/'

    getImage = (name) =>
      `${this._imageBase}${name}`

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`, {
            'Accept-Encoding': 'compress, gzip'
        })
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
              `, received ${res.status}`)
        }
        return await res.json()
    }

    // postResource = async (url) => {
    //     return await axios.post(`${this._apiBase}${url}`, {}, {
    //         responseType: 'json'
    //     })
    //       .then(res => res.data)
    //       .catch(function(error) {
    //           alert('Ошибка в запросе / ' + error)
    //           throw new Error(`Could not fetch ${url}` +
    //             `, received ${error}`)
    //       })
    // }

    putResource = async (url, obj = {}, params = {}) => {
        return await axios.put(`${this._apiBase}${url}`, obj, params)
          .then(res => res.data)
          .catch(this._apiErrHandler)
    }

    deleteResource = async (url, params = {}) => {
        return await axios.delete(`${this._apiBase}${url}`, params)
          .then(res => res.data)
          .catch(this._apiErrHandler)
    }

    postResource = async (url, obj) => {
        return await axios.post(`${this._apiBase}${url}`, obj, {
            responseType: 'json'
        })
          .then(res => res.data)
          .catch(this._apiErrHandler)
    }

    // todo: fix it on async await like as above
    uploadImages = (files) => {
        const data = new FormData()
        data.append('attachments', files)
        return axios.post(this._uploadImagesBase, data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
          .then(res => res.data.result)
          .catch(errors => {
              alert('Ошибка при загрузке изображения. Попробуйте другое изображение.')
              console.log(errors)
              console.log(errors.response.data)
          })
    }


    // Products
    saveProduct = async (product) =>
      await this.postResource(`/products`, product)

    updateProduct = async (product) =>
      await this.putResource(`/products/${product.id}`, product, {
          responseType: 'json'
      })

    getAllProducts = (convertEntities = false) => async () => {
        return await this.getResource(`/products?withUnpublic=true&withUnpublicSizes=true&convertEntities=${convertEntities}`)
        //.map(this._transformProduct)
    }

    updateProductPublic = async (id, boolValue = true) =>
      await this.putResource(`/products/${id}/public?public=${boolValue}`)

    updateProductSizePublic = async (id, boolValue = true) =>
      await this.putResource(`/product-sizes/${id}/public?value=${boolValue}`)

    updateProductSizeFast = async (id, boolValue = true) =>
      await this.putResource(`/product-sizes/${id}/fast?value=${boolValue}`)

    getProduct = (id) => async () => await this.getResource(`/products/${id}?withUnpublic=true&withUnpublicSizes=true&convertEntities=false`)
    deleteProduct = async (id) => await this.deleteResource(`/products/${id}`)

    // Entities
    getAllEntities = async () => await this.getResource(`/entities`)
    getEntitie = (id) => async () => await this.getResource(`/entities/${id}`)
    updateEntitie = async (entitie) => await this.putResource(`/entities/${entitie.id}`, entitie, {
        responseType: 'json'
    })
    saveEntitie = async (entitie) =>
      await this.postResource(`/entities`, entitie)


    // Team
    getAllFlorists = async () => await this.getResource(`/team?isFlorist=true`)
    getTeam = async () => await this.getResource(`/team?withUnpublic=true`)
    getTeamPerson = (id) => async () => await this.getResource(`/team/${id}?withUnpublic=true`)
    updateTeamPerson = async (person) => await this.putResource(`/team/${person.id}`, person, {
        responseType: 'json'
    })
    saveTeamPerson = async (person) => await this.postResource(`/team`, person)
    deleteTeamPerson = async (id) => await this.deleteResource(`/team/${id}`)



    // Banners
    getAllBanners = async () => await this.getResource(`/banners?withUnpublic=true`)
    getBanner = (id) => async () => await this.getResource(`/banners/${id}?withUnpublic=true`)
    updateBanner = async (banner) => await this.putResource(`/banners/${banner.id}`, banner, {
        responseType: 'json'
    })
    saveBanner = async (banner) => await this.postResource(`/banners`, banner)


    // Content
    getAllContent = async () => await this.getResource(`/content?withUnpublic=true`)
    getContent = (id) => async () => await this.getResource(`/content/${id}?withUnpublic=true`)
    updateContent = async (content) => await this.putResource(`/content/${content.id}`, content, {
        responseType: 'json'
    })
    saveContent = async (content) => await this.postResource(`/content`, content)


    getAllCities = async () => {
        return await this.getResource(`/cities`)
    }


    _apiErrHandler = (error) => {
        alert('Ошибка в запросе')
        if (error.response) {
            /*
             * The request was made and the server responded with a
             * status code that falls out of the range of 2xx
             */
            console.log(error.response.data)
            // console.log(error.response.data);
            console.log(error.response.headers)
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
        // console.log(error.errors.map(err => err.message).join('\n'))
        // console.log()
        // alert('Ошибка в запросе / ' + error)
        // throw new Error(`Could not fetch` +
        //   `, received ${error}`)
    }


    // OTHER
    //
    // _transformProduct = product => ({
    //         ...product
    //     })
    getAllPeople = async () => {
        const res = await this.getResource(`/people/`)
        return res.results.map(this._transformPerson)
    }


    getPerson = async id =>
      await this.getResource(`/people/${id}/`)
        .then(this._transformPerson)


    getAllPlanets = async () => {
        const res = await this.getResource(`/planets/`)
        return res.results.map(this._transformPlanet)
    }


    getPlanet = async id =>
      await this.getResource(`/planets/${id}`)
        .then(this._transformPlanet)


    getAllStarships = async () => {
        const res = await this.getResource(`/starships/`)
        return res.results.map(this._transformStarship)
    }


    getStarship = async id =>
      await this.getResource(`/starships/${id}/`)
        .then(this._transformStarship)


    getPersonImage = ({ id }) =>
      `${this._imageBase}/characters/${id}.jpg`

    getStarshipImage = ({ id }) =>
      `${this._imageBase}/starships/${id}.jpg`

    getPlanetImage = ({ id }) =>
      `${this._imageBase}/planets/${id}.jpg`


    _extractIdFromUrl = url => {
        const idRegExp = /\/([0-9]*)\/$/
        return url.match(idRegExp)[1]
    }


    _transformPerson = person => ({
        id: this._extractIdFromUrl(person.url),
        name: person.name,
        gender: person.gender,
        birthYear: person.birth_year,
        eyeColor: person.eye_color
    })


    _transformPlanet = planet => ({
        id: this._extractIdFromUrl(planet.url),
        diameter: planet.diameter,
        rotationPeriod: planet.rotation_period,
        population: planet.population,
        name: planet.name
    })


    _transformStarship = starship => ({
        id: this._extractIdFromUrl(starship.url),
        name: starship.name,
        model: starship.model,
        manufacturer: starship.manufacturer,
        costInCredits: starship.cost_in_credits,
        length: starship.length,
        crew: starship.crew,
        passengers: starship.passengers,
        cargoCapacity: starship.cargo_capacity
    })
}