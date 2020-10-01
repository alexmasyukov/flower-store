import { createSelector } from 'reselect'
import * as filtersFunctions from "utils/filtersFunctions"
import { FILTER_KEY_NAMES } from "constants/filters"


const getProducts = state =>
  state.entities.products.allIds.map(id => getProductById(state, id))

export const getProductById = (state, id) => state.entities.products.byId[id]
export const getStatusSizesFilter = state => FILTER_KEY_NAMES.bySizes in state.ui.selectedFilters
export const getStatusPriceFilter = state => FILTER_KEY_NAMES.bySizesPrice in state.ui.selectedFilters
export const getStatusAvailabilityFilter = state => FILTER_KEY_NAMES.byAvailability in state.ui.selectedFilters
export const getTypeAvailabilityFilter = state => {
  if (FILTER_KEY_NAMES.byAvailability in state.ui.selectedFilters) {
    const [selectButton] = state.ui.selectedFilters[FILTER_KEY_NAMES.byAvailability]
    return selectButton.extra.type
  }
  return false
}
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
    console.log('client/src/store/selectors/products.js getSelectedFilters', selectedFilters)
    return Object
      .entries(selectedFilters)
      .reduce((resultProducts, [filterKey, selected]) => {
        const filterFunction = filtersFunctions[filterKey]
        return filterFunction(resultProducts, selected)
      }, products)
  }
)