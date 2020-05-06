exports.seed = function (knex) {
   return knex('product_sizes')
      .del()
      .then(function () {
         return knex('product_sizes').insert([
            {
               city_id: 1,
               product_id: 1,
               public: true,
               order: 0,
               title: 7,
               price: 1400,
               diameter: 90,
               images: ['/static/media/8.8dc61bc0.jpg', '/static/media/8.8dc61bc0.jpg', '/static/media/8.8dc61bc0.jpg'],
               flowers_count: [19, 16, 15, 18],
            },
            {
               city_id: 1,
               product_id: 3,
               public: true,
               order: 0,
               title: 6,
               price: 1800,
               diameter: 45,
               images: ['/static/media/4.760d10a2.jpeg'],
               flowers_count: [15, 18, 19, 16]
            },
            {
               city_id: 1,
               product_id: 1,
               public: false,
               order: 1,
               title: 8,
               price: 4200,
               diameter: 86,
               images: ['/static/media/9.3482e43d.jpg', '/static/media/9.3482e43d.jpg'],
               flowers_count: [19, 18]
            },
            {
               city_id: 1,
               product_id: 2,
               public: true,
               order: 1,
               title: 7,
               price: 4900,
               diameter: 45,
               images: ['/static/media/4.760d10a2.jpeg'],
               flowers_count: [15, 18]
            },
            {
               city_id: 1,
               product_id: 2,
               public: true,
               order: 0,
               title: 6,
               price: 1800,
               diameter: 45,
               images: ['/static/media/4.760d10a2.jpeg'],
               flowers_count: [19, 15]
            }
         ])
      })
}

exports.config = { transaction: true }