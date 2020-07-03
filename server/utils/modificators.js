/**
 *  const where = R.compose(
        addWhenIsDefine(is_florist, { is_florist }),
        addWhenIsDefine(is_public, { public: is_public })
    )({
        public: true
    })
 * @param field
 * @param value
 * @returns {function(*): {[p: string]: *}}
 */
const addWhenIsDefine = (value, field) => (obj) =>
  value !== undefined ?
    {
      ...obj,
      ...field
    } : obj

const removeWhenIsDefine = (value, field) => (obj) => {
  if (value !== undefined) {
    const { [field]: _, ...other } = obj
    return other
  }

  return obj
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
  addWhenIsDefine,
  removeWhenIsDefine,
  removeParamOfQuery
}