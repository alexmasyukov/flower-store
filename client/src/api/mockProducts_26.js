import { date_26 } from "containers/TIME_date"

const products2 = []

export default products2.map((item, i) => {
   if (i === 200) {
      return {
         ...item,
         id: 'id' + (i),
         unavailable: [date_26]
      }
   }

   return {
   ...item,
      id: 'id' + (i + 200)
      // unavailableDates: ['']
   }
})

// export default generateProducts()