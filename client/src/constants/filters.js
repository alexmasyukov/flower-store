export const FILTER_COMPONENTS_TYPES = {
    ITEMS: 'ITEMS',
    RANGE: 'RANGE',
    COLORS_BUTTONS: 'COLORS_BUTTONS',
    AVAILABLE_BUTTONS: 'AVAILABLE_BUTTONS'
}

export const fitlerButtonsGroupsSettings = {
    bySizesPrice: {
        type: FILTER_COMPONENTS_TYPES.RANGE,
        title: 'Цена'
    },
    bySizes: {
        title: 'Размер',
        type: FILTER_COMPONENTS_TYPES.ITEMS
    },
    byPacking: {
        title: 'Оформление',
        type: FILTER_COMPONENTS_TYPES.ITEMS
    },
    byAvailability: {
        title: 'Наличие',
        type: FILTER_COMPONENTS_TYPES.AVAILABLE_BUTTONS,
        multiply: false
    },
    byBouquetType: {
        title: 'Вид букета',
        type: FILTER_COMPONENTS_TYPES.ITEMS,
        multiply: false,
        openedDefault: true
    },
    byFlowers: {
        title: 'Состав',
        type: FILTER_COMPONENTS_TYPES.ITEMS,
        openedDefault: false
    },
    byShades: {
        title: 'Гамма',
        type: FILTER_COMPONENTS_TYPES.ITEMS,
        openedDefault: false
    },
    byColors: {
        title: 'Цвет',
        // todo восстанорвить тип, когда сделаешь кнопки цветов с extra параметром
        // type: FILTER_COMPONENTS_TYPES.COLORS_BUTTONS,
        type: FILTER_COMPONENTS_TYPES.ITEMS,
        openedDefault: false
    },
    byStability: {
        title: 'Стойкость',
        type: FILTER_COMPONENTS_TYPES.ITEMS,
        openedDefault: false
    }
}