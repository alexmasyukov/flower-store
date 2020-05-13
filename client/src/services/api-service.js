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

    postResource = async (url) => {
        return await axios.post(`${this._apiBase}${url}`, {}, {
            responseType: 'json'
        })
          .then(res => res.data)
          .catch(function(error) {
              alert('Ошибка в запросе / ' + error)
              throw new Error(`Could not fetch ${url}` +
                `, received ${error}`)
          })
    }

    putResource = async (url) => {
        return await axios.put(`${this._apiBase}${url}`)
          .then(res => {
              console.log(res)
              return res.data
          })
          .catch(function(error) {
              alert('Ошибка в запросе / ' + error)
              throw new Error(`Could not fetch ${url}` +
                `, received ${error}`)
          })
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

    // todo fix it on async await like as above
    saveProduct = (product) => {
        alert('saveProduct' + product)
    }

    // todo fix it on async await like as above
    updateProduct = (product) => {
        alert('updateProduct' + product)
    }

    getAllProducts = (convertEntities = false) => async () => {
        const res = await this.getResource(`/products?withUnpublic=true&withUnpublicSizes=true&convertEntities=${convertEntities}`)
        return res //.map(this._transformProduct)
    }

    updateProductPublic = async (id, boolValue = true) => {
        return await this.putResource(`/products/${id}/public?public=${boolValue}`)
    }

    updateProductSizePublic = async (id, boolValue = true) => {
        return await this.putResource(`/product-sizes/${id}/public?value=${boolValue}`)
    }

    updateProductSizeFast = async (id, boolValue = true) => {
        return await this.putResource(`/product-sizes/${id}/fast?value=${boolValue}`)
    }

    getProduct = (id) => async () => {
        const res = await this.getResource(`/products/${id}?withUnpublic=true&withUnpublicSizes=true&convertEntities=false`)
        return res //.map(this._transformProduct)
    }

    getAllEntities = async () => {
        return await this.getResource(`/entities`)
    }

    getAllFlorists = async () => {
        return await this.getResource(`/team?isFlorist=true`)
    }

    getTeam = async () => {
        return await this.getResource(`/team?withUnpublic=true`)
    }

    getTeamPerson = (id) => async () => {
        return await this.getResource(`/team/${id}?withUnpublic=true`)
    }

    getAllBanners = async () => {
        return await this.getResource(`/banners?withUnpublic=true`)
    }

    getBanner = (id) => async () => {
        return await this.getResource(`/banners/${id}?withUnpublic=true`)
    }

    getAllCities = async () => {
        return await this.getResource(`/cities`)
    }

    _transformProduct = product => ({
        ...product
    })


    // OTHER
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