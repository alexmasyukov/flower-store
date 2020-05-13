const addParamOfQuery = (modificator, addToQuery) => (query) => {
    if (!modificator) return false

    return {
        ...query,
        ...addToQuery
    }
}

const removeParamOfQuery = (modificator, removeKey) => (query) => {
    //todo fix it like as above? Or remove key is other logic?

    if (modificator === 'true') {
        const { [removeKey]: _, ...other } = query
        return other
    }
    return query
}

module.exports = {
    addParamOfQuery,
    removeParamOfQuery
}