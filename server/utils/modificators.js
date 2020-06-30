/**
 *  const where = R.compose(
 addWhenIsDefine({ is_florist }, is_florist),
 addWhenIsDefine({ public: is_public }, is_public)
 )({
        public: true
      })
 * @param field
 * @param value
 * @returns {function(*): {[p: string]: *}}
 */
const addWhenIsDefine = (field, value) => (obj) =>
  value !== undefined ?
    {
      ...obj,
      ...field
    } : obj


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
  removeParamOfQuery
}