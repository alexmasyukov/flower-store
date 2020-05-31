import {
    SELECTED_FILTERS_UPDATE_SELECTED,
    SELECTED_FILTERS_SET_PRICE_RANGE,
    SELECTED_FILTERS_RESET_ALL,
    SELECTED_FILTERS_RESET, SELECTED_FILTERS_SET_MANY
} from "store/actionTypes"
import { getObjectWithoutKeys } from "utils"

const initialState = {}


const selectedFiltersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECTED_FILTERS_RESET_ALL:
            return {}

        case SELECTED_FILTERS_SET_MANY:
            return {
                ...state,
                ...action.filters
            }


        case SELECTED_FILTERS_RESET: {
            return getObjectWithoutKeys(state, [action.filterKey])
        }


        case SELECTED_FILTERS_UPDATE_SELECTED:
            /** !! сбрасываение фильтра цены присходит через middleware **/
            const { filterKey, value } = action
            // todo А что возвращает деструктуризация?
            //  Новый объект или ссылку?
            const { [filterKey]: selected = [] } = state

            console.log('SELECTED_FILTERS_UPDATE_SELECTED', action)

            // todo Разберись с этим, страшно выглядит push
            // todo Если ссылку переписывай это на filter и ...rest
            selected.includes(value) ?
              selected.splice(selected.indexOf(value), 1) :
              selected.push(value)

            console.log(selected)
            console.log(state)

            if (selected.length) {
                return {
                    ...state,
                    [filterKey]: selected
                }
            } else {
                return getObjectWithoutKeys(state, [filterKey])
            }
      // return state


        case SELECTED_FILTERS_SET_PRICE_RANGE:
            /** !! сбрасываение фильтра размера присходит через middleware **/
            const { min, max } = action
            return {
                ...state,
                bySizesPrice: [min, max]
            }

        default:
            return state
    }
}

export default selectedFiltersReducer