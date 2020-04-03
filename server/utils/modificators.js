const addModificator = (modificator, addToQuery) => (query) => {
// console.log(modificator === 'true' ? {
//    ...query,
//    ...addToQuery
// } : query)

   return {
      ...query,
      ...addToQuery
   }
}

const removeParamOfQuery = (modificator, removeKey) => (query) => {
   if (modificator === 'true') {
      const { [removeKey]: _, ...other } = query
      return other
   }
   return query
}

module.exports = {
   addModificator,
   removeParamOfQuery
}