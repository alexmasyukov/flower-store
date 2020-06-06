import {
    SELECTED_FILTERS_UPDATE_SELECTED,
    SELECTED_FILTERS_SET_PRICE_RANGE,
    SELECTED_FILTERS_RESET_ALL,
    SELECTED_FILTERS_RESET, SELECTED_FILTERS_SET_MANY
} from "store/actionTypes"
import { fitlerButtonsGroupsSettings } from "constants/filters"
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
            // todo эту функцию можно переписать
            return getObjectWithoutKeys(state, [action.filterKey])
        }


        case SELECTED_FILTERS_UPDATE_SELECTED:
            /** !! сбрасываение фильтра цены присходит через middleware **/
            const { filterKey, value } = action
            // todo А что возвращает деструктуризация?
            //  Новый объект или ссылку?
            const { [filterKey]: selected = [] } = state

            console.log('action SELECTED_FILTERS_UPDATE_SELECTED', action)
            console.log('filters state', state)
            console.log('selected', selected)

            // todo Разберись с этим, страшно выглядит push
            // todo Если ссылку переписывай это на filter и ...rest

            // const filterSettings = fitlerButtonsGroupsSettings[filterKey]

            console.log('filters state', state)

            switch (filterKey) {
                case 'byAvailability':
                case 'byBouquetType':
                    // 1. Ищем кнопку
                    // Кнопка найдена
                    //      удаляем кнопку из массива
                    //      возвращаем массив
                    // Кнопка не найдена
                    //      очишаем массив
                    //      возвращаем массив с новой кнопкой

                    if (!state[filterKey]) {
                        return {
                            ...state,
                            [filterKey]: [value]
                        }
                    }

                    const findButtonsFunctions = {
                        byAvailability: ({ extra: { type } }) => type === value.extra.type,
                        byBouquetType: (title) => title === value
                    }

                    const ff = findButtonsFunctions[filterKey]
                    const foundButton = selected.find(ff)

                    return foundButton ? getObjectWithoutKeys(state, [filterKey]) : {
                        ...state,
                        [filterKey]: [value]
                    }


                default:
                    // Если в этом фильтре уже выбран этот элемент,
                    // сбрасываем его (отключаем)
                    // путем удаления из массивы "выделенное"
                    const selectedWithoutCurrentButton =
                      selected.includes(value) ? selected.filter(item => item !== value) :
                        [...selected, value]

                    return selectedWithoutCurrentButton.length ?
                      { ...state, [filterKey]: selectedWithoutCurrentButton } :
                      getObjectWithoutKeys(state, [filterKey])
            }

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