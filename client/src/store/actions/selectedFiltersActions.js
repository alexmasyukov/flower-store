import {
  SELECTED_FILTERS_UPDATE_SELECTED,
  SELECTED_FILTERS_SET_PRICE_RANGE,
  SELECTED_FILTERS_RESET_ALL,
  SELECTED_FILTERS_RESET
} from "store/actionTypes"


export function updateSelect(filterKey, value) {
  return {
    type: SELECTED_FILTERS_UPDATE_SELECTED,
    filterKey,
    value
  }
}

export function setPriceRange(min, max) {
  return {
    type: SELECTED_FILTERS_SET_PRICE_RANGE,
    min,
    max
  }
}

export function resetFilter(filterKey) {
  return {
    type: SELECTED_FILTERS_RESET,
    filterKey
  }
}

export function resetAllFilters() {
  return {
    type: SELECTED_FILTERS_RESET_ALL
  }
}


