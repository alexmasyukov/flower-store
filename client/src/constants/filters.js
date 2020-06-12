export const FILTER_COMPONENTS_TYPES = {
    ITEMS: 'ITEMS',
    RANGE: 'RANGE',
    COLORS_BUTTONS: 'COLORS_BUTTONS',
    AVAILABLE_BUTTONS: 'AVAILABLE_BUTTONS'
}

export const FILTER_KEY_NAMES = {
    bySizesPrice: 'bySizesPrice',
    bySizes: 'bySizes',
    byPacking: 'byPacking',
    byAvailability: 'byAvailability',
    byBouquetType: 'byBouquetType',
    byFlowers: 'byFlowers',
    byShades: 'byShades',
    byColors: 'byColors',
    byStability: 'byStability'
}

export const fitlerButtonsGroupsSettings = {
    [FILTER_KEY_NAMES.bySizesPrice]: {
        type: FILTER_COMPONENTS_TYPES.RANGE,
        title: 'Цена'
    },
    [FILTER_KEY_NAMES.bySizes]: {
        title: 'Размер',
        type: FILTER_COMPONENTS_TYPES.ITEMS
    },
    [FILTER_KEY_NAMES.byPacking]: {
        title: 'Оформление',
        type: FILTER_COMPONENTS_TYPES.ITEMS
    },
    [FILTER_KEY_NAMES.byAvailability]: {
        title: 'Наличие',
        type: FILTER_COMPONENTS_TYPES.AVAILABLE_BUTTONS
    },
    [FILTER_KEY_NAMES.byBouquetType]: {
        title: 'Вид букета',
        type: FILTER_COMPONENTS_TYPES.ITEMS,
        openedDefault: true
    },
    [FILTER_KEY_NAMES.byFlowers]: {
        title: 'Состав',
        type: FILTER_COMPONENTS_TYPES.ITEMS,
        openedDefault: false
    },
    [FILTER_KEY_NAMES.byShades]: {
        title: 'Гамма',
        type: FILTER_COMPONENTS_TYPES.ITEMS,
        openedDefault: false
    },
    [FILTER_KEY_NAMES.byColors]: {
        title: 'Цвет',
        // todo восстанорвить тип, когда сделаешь кнопки цветов с extra параметром
        // type: FILTER_COMPONENTS_TYPES.COLORS_BUTTONS,
        type: FILTER_COMPONENTS_TYPES.ITEMS,
        openedDefault: false
    },
    [FILTER_KEY_NAMES.byStability]: {
        title: 'Стойкость',
        type: FILTER_COMPONENTS_TYPES.ITEMS,
        openedDefault: false
    }
}