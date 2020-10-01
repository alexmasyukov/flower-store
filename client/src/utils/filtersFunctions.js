import { AVAILABLE_TYPES } from "constants/common"
import { compose, when } from 'utils'

export const byColors = (products, selected = []) =>
  products.filter(product => selected.includes(product.color))

export const byBouquetType = (products, selected = []) =>
  products.filter(({ bouquetType }) => selected.includes(bouquetType))

export const byShades = (products, selected = []) =>
  products.filter(({ shade }) => selected.includes(shade))

export const byPacking = (products, selected = []) =>
  products.filter(({ packing }) => selected.includes(packing))

export const bySizes = (products, selected = []) =>
  products.filter(product =>
    product.sizes.some(size =>
      selected.includes(size.title)
    )
  )

export const bySizesPrice = (products, [min, max]) =>
  products.filter(product =>
    product.sizes.some(size =>
      size.price >= min && size.price <= max
    )
  )


export const byFlowers = (products, selected = []) =>
  products.filter(product =>
    product.sizes.some(size =>
      size.flowers.some(flower => selected.includes(flower))
    )
  )

export const byStability = (products, selected = []) =>
  products.filter(product => {
      if (!product.stability) return false
      return selected.includes(product.stability)
    }
  )

// Всегда в массиве только одна кнопка
// Работает методом исключения в redux
export const byAvailability = (products, [button]) => {
  const availableType = button.extra.type

  const filterFastProducts = (products) => products
    .filter(product => product.sizes.some(({ fast }) => fast === true))
  // .map(({ sizes, ...base }) => ({
  //     ...base,
  //     sizes: sizes.filter(({ fast }) => fast === true)
  // }))

  // все товары кроме тех, у кого КАЖДЫЙ размер "Готовый букет"
  const filterBaseProducts = (products) => products
    .filter(product => !product.sizes.every(({ fast }) => fast === true))
  // .map(({ sizes, ...base }) => ({
  //     ...base,
  //     sizes: sizes.filter(({ fast }) => fast === false)
  // }))

  return compose(
    when(availableType === AVAILABLE_TYPES.FAST, filterFastProducts),
    when(availableType === AVAILABLE_TYPES.BASE, filterBaseProducts)
  )(products)
}

