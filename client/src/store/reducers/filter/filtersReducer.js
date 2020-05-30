import { FETCH_PRODUCTS_SUCCESS, FILTERS_SET_ITEMS } from "store/actionTypes"
import { AVAILABLE_TYPES } from "constants/common"

// todo Пока не используем, нужно сделать кнопки цвета с extra
// todo это невозмножно получить в таком виде с сервера,
//  сейчас просто цвет приходит, значит нужно делать отдельный запрос
//  или вычислять и отправлять в ключе api/products?date=
//  (как даты недоступности)
const filters_colors = {
    byColors: [
        {
            title: 'Разноцветный',
            color: 'miltiply'
        },
        {
            title: 'Фиолетовый',
            color: 'purple'
        },
        {
            title: 'Молочный',
            color: '#eee7dc'
        }
    ]
}


const initialState = {
    bySizesPrice: [0, 0],
    byAvailability: [{
        title: 'Готовые букеты',
        extra: {
            type: AVAILABLE_TYPES.FAST,
        }
    }, {
        title: 'Ожидание 90 минут',
        extra: {
            type: AVAILABLE_TYPES.BASE,
        }
    }],
    bySizes: [],
    byFlowers: [],
    byStability: [],
    byShades: [],
    byPacking: [],
    byColors: [],
    byBouquetType: [],
    // НЕ ИСПОЛЬЗУЕТСЯ пока
    // byCollections: [],//['23 февраля', '8 марта', 'Новый год'],
}


const filtersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS_SUCCESS:
            const { entities } = action.response
            const products = Object.values(entities.items)

            // Собираем все возможные варианты элементов для фильтра
            // из нужных полей всех товаров
            const baseFilters = products.reduce((state, {
                stability = '',
                shade = '',
                bouquetType = '',
                packing = '',
                color = '',
                sizes = []
            }) => {
                const sizesTitles = sizes.map(({ title = '' }) => title)
                const flowers = sizes.map(({ flowers = [] }) => flowers)

                return {
                    ...state,
                    bySizes: [...state.bySizes, ...sizesTitles],
                    byFlowers: [...state.byFlowers, ...flowers.flat(1)],
                    byStability: [...state.byStability, stability],
                    byShades: [...state.byShades, shade],
                    byBouquetType: [...state.byBouquetType, bouquetType],
                    byPacking: [...state.byPacking, packing],
                    byColors: [...state.byColors, color]
                }
            }, { ...state })

            // Удаляем дубликаты в каждом ключе фильтра
            const baseFiltersWithRemovedDublicates = Object
              .entries(baseFilters)
              .reduce((results, [key, value]) => ({
                  ...results,
                  [key]: Array.from(new Set(value))
              }), state)

            const allPrices = products.reduce((prices, { sizes }) =>
                [...prices, ...sizes.map(({ price }) => price)]
              , [])

            return {
                ...baseFilters,
                ...baseFiltersWithRemovedDublicates,
                bySizesPrice: [Math.min(...allPrices), Math.max(...allPrices)]
            }

        default:
            return state
    }
}

export default filtersReducer