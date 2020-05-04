export default class ApiService {
    // https://create-react-app.dev/docs/adding-custom-environment-variables/
    _apiBase = process.env.NODE_ENV === 'production' ?
        '/api/v1' :
        'http://localhost/api/v1'

    _imageBase = '/static/'

    getResource = async (url) => {
        console.log(this._apiBase)
        const res = await fetch(`${this._apiBase}${url}`)
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
                `, received ${res.status}`)
        }
        return await res.json()
    }


    getAllProducts = async (date = '') => {
        const res = await this.getResource(`/products/
            withUnpublic=true
            &withUnpublicSizes=true
            &convertEntities=false`)
        return res.results.map(this._transformProduct)
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