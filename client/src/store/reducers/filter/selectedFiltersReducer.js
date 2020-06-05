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
            const { filterKey, value, filtersResetHistory } = action
            // todo А что возвращает деструктуризация?
            //  Новый объект или ссылку?
            const { [filterKey]: selected = [] } = state

            console.log('selected', selected)
            console.log('action SELECTED_FILTERS_UPDATE_SELECTED', action)

            // todo Разберись с этим, страшно выглядит push
            // todo Если ссылку переписывай это на filter и ...rest

            let newSelected = []
            switch (filterKey) {
                case 'byAvailability':
                    break

                default:
                    if (selected.includes(value)) {
                        // Если в этом фильтре уже выбран этот элемент,
                        // сбрасываем его (отключаем)
                        // путем удаления из массивы "выделенное"
                        newSelected = selected.filter(item => item !== value)
                    } else {
                        // ЛОГИКА
                        // 1. Нажали кнопку фильтра, она установилась
                        // 2. Ее хотят отключить и нажимают на нее второй раз
                        // 3. Если на этом фильтре (группе кнопок) (filterKey)
                        //   есть multiply=false, то сначала вся группа будет
                        //   сброшена экшеном resetFilter, а затем ЭТА ЖЕ кнопка
                        //   будет повторно установлена (добавлена в selected)
                        //   Чтобы этого избежать, проверяем какая кнопка была
                        //   сброшена последней, если эта она, ничего не делаем
                        //   (подтверждаем сброс)

                        const settings = fitlerButtonsGroupsSettings[filterKey]
                        if ('multiply' in settings
                          && settings.multiply === false
                          && filtersResetHistory.lastFilterKey === filterKey
                          && filtersResetHistory.lastValue === value) {
                            newSelected = [...selected]
                        } else {
                            // добавляем кнопку в выделенные
                            newSelected = [...selected, value]
                        }
                    }
            }

            console.log('filters state', state)

            const resultState = newSelected.length ?
              { ...state, [filterKey]: newSelected } :
              getObjectWithoutKeys(state, [filterKey])

            console.log('resultState', resultState)

            return resultState


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