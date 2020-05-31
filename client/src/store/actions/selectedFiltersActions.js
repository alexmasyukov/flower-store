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

export function updateSelect(filterKey, value) {


    // history.push(`${history.location.pathname}?${filterKey}=${value}`)
    // const { filterKey, value } = action
    // // todo А что возвращает деструктуризация?
    // //  Новый объект или ссылку?
    // const { [filterKey]: selected = [] } = state
    //
    // console.log('SELECTED_FILTERS_UPDATE_SELECTED', action)
    //
    // // todo Разберись с этим, страшно выглядит push
    // // todo Если ссылку переписывай это на filter и ...rest
    // selected.includes(value) ?
    //   selected.splice(selected.indexOf(value), 1) :
    //   selected.push(value)
    //
    // console.log(selected)
    // console.log(state)
    //
    // if (selected.length) {
    //   return {
    //     ...state,
    //     [filterKey]: selected
    //   }
    // } else {
    //   return getObjectWithoutKeys(state, [filterKey])
    // }

    return {
        type: SELECTED_FILTERS_UPDATE_SELECTED,
        filterKey,
        value
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


