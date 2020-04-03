exports.seed = function (knex) {
   return knex('additional_products')
      .del()
      .then(function () {
         return knex('additional_products').insert([
            {
               id: 1,
               public: true,
               title: 'Modern clear vase',
               desc: 'Vase made from clear glass. Height 20 cm and width 13 cm made from good quality thick glass',
               price: 900,
               image: '/static/media/333.f496686f.jpg'
            },
            {
               id: 2,
               public: true,
               title: 'Bellante Sparkling Rosé',
               desc: 'Bottle Size:75cl Only 18+ can buy this item Not available to send separately Price includes delivery',
               price: 400,
               image: '/static/media/22.jpeg'
            },
            {
               id: 3,
               public: false,
               title: 'Доп товар',
               desc: 'Описание его',
               price: 999,
               image: '/static/media/22.jpeg'
            }
         ])
      })
}

exports.config = { transaction: true }