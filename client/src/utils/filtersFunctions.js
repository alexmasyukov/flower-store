import { fitlerButtonsGroupsSettings } from 'constants/filters'
import { AVAILABLE_TYPES } from "constants/common"

export const byColors = (products, selected = []) =>
  products.filter(product => selected.includes(product.color))

export const byBouquetType = (products, selected = []) =>
  products.filter(({ bouquetType }) =>  selected.includes(bouquetType))

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
      size.flowers.some(flower => selected.includes(flower))
    )
  )

export const byStability = (products, selected = []) =>
  products.filter(product => {
        if (!product.stability) return false
        return selected.includes(product.stability)
    }
  )

export const byAvailability = (products, selectedButtons) => {
    const [button] = selectedButtons
    const availableType = button.extra.type

    switch (availableType) {
        case AVAILABLE_TYPES.FAST:
            return products.filter(product =>
              product.sizes.some(({ fast }) => fast === true))

        case AVAILABLE_TYPES.BASE:
            // все товары кроме тех, у кого КАЖДЫЙ размер "Готовый букет"
            return products.filter(product =>
              !product.sizes.every(({ fast }) => fast === true))
    }
}

