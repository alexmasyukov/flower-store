function extractFileExt(filename) {
    return filename.split('.').pop()
}

const error = (status, code, message) => {
    const error = new Error(message)
    error.status = status
    error.code = code
    return error
}


/**
 * Convert entitie id (or array ids) to entitie value from
 * normalize object 'entities'
 *
 * entities = {
 *    e4fe3: {
 *       title: 'Роза'
 *    }
 * }
 * --->
 * entities['e4fe3'].title --> 'Роза
 *
 * @param key - key of product
 * @param entities - normalize object of entities
 * @returns {Object} - product object
 */
const convertEntitie = (key, entities) => baseObject => {
    const getValue = (id, entities) =>
       entities[id] ? entities[id].value : id

    const { [key]: etitieId, ...basic} = baseObject

    let value
    if (Array.isArray(etitieId)) {
        value = etitieId.map(id => getValue(id, entities))
    } else {
        value = getValue(etitieId, entities)
    }

    return {
        ...basic,
        [key]: value
    }
}

function normalize(object, fromKey) {
    const res = {}
    object.forEach(item => res[item[fromKey]] = { ...item })
    return res
}

const isBoolean = val => 'boolean' === typeof val


const when = (cond, f) => x => {
    if (typeof cond === 'boolean') {
        return cond ? f(x) : x;
    }
    return cond(x) ? f(x) : x;
}

module.exports = {
    error,
    extractFileExt,
    convertEntitie,
    normalize,
    isBoolean,
    when
}