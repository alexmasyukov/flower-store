import { SELECTED_FILTERS_RESET } from "store/actionTypes"

const initialState = {
    lastFilterKey: undefined,
    lastValue: undefined
}

const filtersResetHistory = (state = initialState, action) => {
    switch (action.type) {
        case SELECTED_FILTERS_RESET:
            // console.log('filtersResetHistory action SELECTED_FILTERS_RESET', action)
            return {
                ...state,
                lastFilterKey: action.filterKey,
                lastValue: action.value,
            }

        default:
            return state
    }
}

export default filtersResetHistory