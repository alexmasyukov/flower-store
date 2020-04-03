import { filtersEntities } from 'constants/filtersEntities'

export const byColors = (products, selected = []) =>
   products.filter(product =>
      selected.includes(product.color)
   )

export const bySizes = (products, selected = []) =>
   products.filter(product =>
      product.sizes.some(size =>
         selected.includes(size.title)
      )
   )

export const byBouquetType = (products, selected = []) =>
   products.filter(({ bouquetType }) => {
         if (!bouquetType) return false
         return selected.includes(bouquetType)
      }
   )

export const byShades = (products, selected = []) =>
   products.filter(({ shade }) => {
         if (!shade) return false
         return selected.includes(shade)
      }
   )

export const byPacking = (products, selected = []) =>
   products.filter(({ packing }) => {
         if (!packing) return false
         return packing.some(pack =>
            selected.includes(pack)
         )
      }
   )

export const bySizesPrice = (products, selected = []) => {
   const [min, max] = selected
   return products.filter(product =>
      product.sizes.some(size =>
         size.price >= min && size.price <= max
      )
   )
}

export const byFlowers = (products, selected = []) =>
   products.filter(product =>
      product.sizes.some(size =>
         size.flowers.some(flowerEntity => {
               const [flowerTitle] = flowerEntity
               return selected.includes(flowerTitle)
            }
         )
      )
   )

export const byStability = (products, selected = []) =>
   products.filter(product => {
         if (!product.stability) return false
         return selected.includes(product.stability)
      }
   )

export const byAvailability = (products, selectedTitles) => {
   const buttons = filtersEntities.byAvailability.buttons
   const fast = selectedTitles.includes(buttons.fast)
   const expect = selectedTitles.includes(buttons.expect)

   // 28.02.2020 Выключаем множественный выбор фильтра, в selectedTitles всегда
   // один элемент
   if (expect) {
      return products.filter(({ available }) => available.expect === true)
   }

   if (fast) {
      return products.filter(({ available }) => available.fast === true)
   }

   // if (selectedTitles.length === 1) {
   // }
   // return products.filter(({ available }) =>
   //    available.expect === true || available.fast === true)
}

