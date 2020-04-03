const products = []

export default products.map((item, i) => {

   return {
   ...item,
   id: 'id' + (i)
   // unavailableDates: ['']
}})

// export default generateProducts()