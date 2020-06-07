import { createSelector } from 'reselect'
import * as filtersFunctions from "utils/filtersFunctions"

const getProducts = state =>
  state.entities.products.allIds.map(id => getProductById(state, id))

export const getProductById = (state, id) => state.entities.products.byId[id]
export const getStatusSizesFilter = state => 'bySizes' in state.ui.selectedFilters
export const getStatusPriceFilter = state => 'bySizesPrice' in state.ui.selectedFilters
// export const getFilterSelectedByKey = (state, filterKey = '') => state.ui.selectedFilters[filterKey]


// export const getSelectedFilters = state => state.ui.selectedFilters
export const getSelectedFilters = createSelector(
  (state) => state.ui.selectedFilters,
  (selectedFilters) => selectedFilters)



export const getSizesAndPriceSelectedFilters = state => {
  const { bySizes, bySizesPrice } = getSelectedFilters(state)
  return {
    bySizes,
    bySizesPrice
  }
}
export const getCountSelectedFilters = (state) =>
  Object.keys(getSelectedFilters(state)).length

export const getFilteredProducts = createSelector(
  [getSelectedFilters, getProducts],
  (selectedFilters, products) => {
    return Object.entries(selectedFilters).reduce((resultProducts, [filterKey, selected]) => {
      const filterFunction = filtersFunctions[filterKey]
      return filterFunction(resultProducts, selected)
    }, products)
  }
)