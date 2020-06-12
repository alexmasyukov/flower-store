import {
    SELECTED_FILTERS_UPDATE_SELECTED,
    SELECTED_FILTERS_SET_PRICE_RANGE
} from "store/actionTypes"
import { resetFilter } from "store/actions/selectedFiltersActions"
import { FILTER_KEY_NAMES, fitlerButtonsGroupsSettings } from "constants/filters"

/**
 * UI
 * При использовании фильтра выбора цены сбрасывает фильтр размера (bySizes)
 * При использовании фильтра выбора размера сбрасывает фильтр цены (bySizesPrice)
 *
 * @param store
 * @returns {function(*): Function}
 */
const resetFilters = store => next => action => {
    const { filterKey, value } = action

    switch (action.type) {
        case SELECTED_FILTERS_UPDATE_SELECTED:
            // При использовании фильтра выбора цены сбрасывает фильтр размера (bySizes)
            if (filterKey === FILTER_KEY_NAMES.bySizes)
                next(resetFilter(FILTER_KEY_NAMES.bySizesPrice, value))

            if (filterKey === FILTER_KEY_NAMES.byAvailability)
                next(resetFilter(FILTER_KEY_NAMES.bySizes, value))

            if (filterKey === FILTER_KEY_NAMES.bySizes)
                next(resetFilter(FILTER_KEY_NAMES.byAvailability, value))

            // Если у фильтра свойство multiply = false, нужно отключить возможность
            // множественного выборsа (например: одновременно выбранные кнопки - Ожидание и Готовые букеты)
            // Находим фильтр по его ключу
            // console.log('action resetFilters middleware', action)
            const filter = fitlerButtonsGroupsSettings[filterKey]
            if (filter) {
                if ('multiply' in filter && filter.multiply === false) {
                    next(resetFilter(filterKey, value))
                }
            }

            return next(action)

        case SELECTED_FILTERS_SET_PRICE_RANGE:
            // При использовании фильтра выбора размера сбрасывает фильтр цены (bySizesPrice)
            next(resetFilter('bySizes', action.value))
            return next(action)

        default:
            return next(action)
    }
}

export default resetFilters