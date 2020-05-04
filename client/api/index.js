import axios from "axios"

export const fetchProducts = async () => {
    const url = '/api/v1/products?' +
        'withUnpublic=true' +
        '&withUnpublicSizes=true' +
        '&convertEntities=false'

    // todo: fix it
    return await axios.get(url)
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            // handle error
            console.log(error)
        })
}


export const fetchEntities = async () => {
    let url = 'http://localhost:3500/api/v1/entities'
    let res = await fetch(url)

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}` +
            `, received ${res.status}`)
    }

    return await res.json()
}

export const fetchProduct = async (id) => {
    const url = `http://localhost:3500/api/v1/products/${id}?` +
        'withUnpublic=true' +
        '&withUnpublicSizes=true' +
        '&convertEntities=false'

    return await axios.get(url)
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            console.log(error)
        })
}