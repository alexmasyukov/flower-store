const initialState = {
  bySizesPrice: [0, 10000], // initial min max for price range
  byPacking: ['Бумага флисовая', 'Шляпная коробка', 'Фет', 'Коробка'],
  bySizes: ['Стандартный', 'Большой', 'Премиум'],
  byCollections: ['23 февраля', '8 марта', 'Новый год'],

  // todo это невозмножно получить в таком виде с сервера,
  //  сейчас просто цвет приходит, значит нужно делать отдельный запрос
  //  или вычислять и отправлять в ключе api/products?date=
  //  (как даты недоступности)
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
  ],
  byFlowers: ['Гортензия', 'Розы', 'Кустовая роза', 'Кустовая пионовидная роза',
    'Астра', 'Хризантема'],
  byStability: ['+', '++', '+++'],
  byShades: ['Нежный', 'Яркий', 'Темный'],
  byAvailability: ['Готовые букеты', 'Ожидание 90 минут'],
  byBouquetType: ['Монобукет', 'Сборный']
}

const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default filtersReducer