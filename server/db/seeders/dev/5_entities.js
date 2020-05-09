exports.seed = function (knex) {
   const TYPE = {
      COLOR: 'color',
      COLOR_TITLE: 'Цвета', // Используется в CMS для назвния группы сущностей

      SIZE: 'size',
      SIZE_TITLE: 'Размеры',

      STABILITY: 'stability',
      STABILITY_TITLE: 'Стойкость',

      SHADE: 'shade',
      SHADE_TITLE: 'Оттенок',

      FLOWER: 'flower',
      FLOWER_TITLE: 'Цветы',

      PACKING: 'packing',
      PACKING_TITLE: 'Упаковка',

      COLLECTION: 'collection',
      COLLECTION_TITLE: 'Коллекция',

      BOUQUET_TYPE: 'bouquet_type',
      BOUQUET_TYPE_TITLE: 'Тип букета'
   }

   // Deletes ALL existing entries
   return knex('entities')
      .del()
      .then(function () {
         // Inserts seed entries
         return knex('entities').insert([
            { id: 1, eType: TYPE.COLOR, eTypeTitle: TYPE.COLOR_TITLE, value: 'Красный', extra: { color: 'red' } },
            { id: 2, eType: TYPE.COLOR, eTypeTitle: TYPE.COLOR_TITLE, value: 'Синий', extra: { color: 'blue' } },
            { id: 3, eType: TYPE.COLOR, eTypeTitle: TYPE.COLOR_TITLE, value: 'Зеленый', extra: { color: 'green' } },
            { id: 4, eType: TYPE.COLOR, eTypeTitle: TYPE.COLOR_TITLE, value: 'Фиолетовый', extra: { color: 'purple' } },
            { id: 5, eType: TYPE.COLOR, eTypeTitle: TYPE.COLOR_TITLE, value: 'Молочный', extra: { color: '#faf5f1' } },

            { id: 6, eType: TYPE.SIZE, eTypeTitle: TYPE.SIZE_TITLE, value: 'Стандарный' },
            { id: 7, eType: TYPE.SIZE, eTypeTitle: TYPE.SIZE_TITLE, value: 'Большой' },
            { id: 8, eType: TYPE.SIZE, eTypeTitle: TYPE.SIZE_TITLE, value: 'Премиум' },

            { id: 9, eType: TYPE.STABILITY, eTypeTitle: TYPE.STABILITY_TITLE, value: '+' },
            { id: 10, eType: TYPE.STABILITY, eTypeTitle: TYPE.STABILITY_TITLE, value: '++' },
            { id: 11, eType: TYPE.STABILITY, eTypeTitle: TYPE.STABILITY_TITLE, value: '+++' },

            { id: 12, eType: TYPE.SHADE, eTypeTitle: TYPE.SHADE_TITLE, value: 'Нежный' },
            { id: 13, eType: TYPE.SHADE, eTypeTitle: TYPE.SHADE_TITLE, value: 'Яркий' },
            { id: 14, eType: TYPE.SHADE, eTypeTitle: TYPE.SHADE_TITLE, value: 'Темный' },

            { id: 15, eType: TYPE.FLOWER, eTypeTitle: TYPE.FLOWER_TITLE, value: 'Странная зелель' },
            { id: 16, eType: TYPE.FLOWER, eTypeTitle: TYPE.FLOWER_TITLE, value: 'Фиалка' },
            { id: 17, eType: TYPE.FLOWER, eTypeTitle: TYPE.FLOWER_TITLE, value: 'Роза' },
            { id: 18, eType: TYPE.FLOWER, eTypeTitle: TYPE.FLOWER_TITLE, value: 'Кустовая роза' },
            { id: 19, eType: TYPE.FLOWER, eTypeTitle: TYPE.FLOWER_TITLE, value: 'Гортензия' },

            { id: 20, eType: TYPE.PACKING, eTypeTitle: TYPE.PACKING_TITLE, value: 'Бумага флисовая' },
            { id: 21, eType: TYPE.PACKING, eTypeTitle: TYPE.PACKING_TITLE, value: 'Шляпная коробка' },
            { id: 22, eType: TYPE.PACKING, eTypeTitle: TYPE.PACKING_TITLE, value: 'Фет' },
            { id: 23, eType: TYPE.PACKING, eTypeTitle: TYPE.PACKING_TITLE, value: 'Коробка' },

            { id: 24, eType: TYPE.COLLECTION, eTypeTitle: TYPE.COLLECTION_TITLE, value: '8 марта' },
            { id: 25, eType: TYPE.COLLECTION, eTypeTitle: TYPE.COLLECTION_TITLE, value: '23 февраля' },
            { id: 26, eType: TYPE.COLLECTION, eTypeTitle: TYPE.COLLECTION_TITLE, value: 'Новый год' },
            { id: 27, eType: TYPE.COLLECTION, eTypeTitle: TYPE.COLLECTION_TITLE, value: '9 мая' },

            { id: 28, eType: TYPE.BOUQUET_TYPE, eTypeTitle: TYPE.BOUQUET_TYPE_TITLE, value: 'Монобукет' },
            { id: 29, eType: TYPE.BOUQUET_TYPE, eTypeTitle: TYPE.BOUQUET_TYPE_TITLE, value: 'Сборный' },
         ])
      })
}

exports.config = { transaction: true }