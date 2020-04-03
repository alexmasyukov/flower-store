import {
   SELECTED_FILTERS_UPDATE_SELECTED,
   SELECTED_FILTERS_SET_PRICE_RANGE
} from "store/actionTypes"
import { resetFilter } from "store/actions/selectedFiltersActions"
import { filtersEntities } from "constants/filtersEntities"

/**
 * UI
 * При использовании фильтра выбора цены сбрасывает фильтр размера (bySizes)
 * При использовании фильтра выбора размера сбрасывает фильтр цены (bySizesPrice)
 *
 * @param store
 * @returns {function(*): Function}
 */
const resetFilters = store => next => action => {
   const { filterKey } = action

   switch (action.type) {
      case SELECTED_FILTERS_UPDATE_SELECTED:
         // При использовании фильтра выбора цены сбрасывает фильтр размера (bySizes)
         if (filterKey === 'bySizes') next(resetFilter('bySizesPrice'))

         // Если у фильтра свойство multiply = false, нужно отключить возможность
         // множественного выбора (например: одновременно выбранные кнопки - Ожидание и Готовые букеты)
         // Находим фильтр по его ключу
         const filter = filtersEntities[filterKey]
         if (filter) {
            if ('multiply' in filter && filter.multiply === false) {
               next(resetFilter(filterKey))
            }
         }

         return next(action)

      case SELECTED_FILTERS_SET_PRICE_RANGE:
         // При использовании фильтра выбора размера сбрасывает фильтр цены (bySizesPrice)
         next(resetFilter('bySizes'))
         return next(action)

      default:
         return next(action)
   }
}

export default resetFilters