import {
    SELECTED_FILTERS_UPDATE_SELECTED,
    SELECTED_FILTERS_SET_PRICE_RANGE,
    SELECTED_FILTERS_RESET_ALL,
    SELECTED_FILTERS_RESET, SELECTED_FILTERS_SET_MANY
} from "store/actionTypes"
// import { getObjectWithoutKeys } from "utils"
// import { history } from 'store/configureStore'
// import { Link, useHistory, useLocation } from "react-router-dom"
import React from "react"

// let location = useLocation()

export function updateSelect(filterKey, value, filtersResetHistory) {
    return {
        type: SELECTED_FILTERS_UPDATE_SELECTED,
        filterKey,
        value,
        filtersResetHistory
    }
}

export function setManyFilters(filters) {
    return {
        type: SELECTED_FILTERS_SET_MANY,
        filters
    }
}

export function setPriceRange(min, max) {
    return {
        type: SELECTED_FILTERS_SET_PRICE_RANGE,
        min,
        max
    }
}

export function resetFilter(filterKey, value) {
    return {
        type: SELECTED_FILTERS_RESET,
        filterKey,
        value
    }
}

export function resetAllFilters() {
    return {
        type: SELECTED_FILTERS_RESET_ALL
    }
}


