exports.seed = function (knex) {
   return knex('product_sizes')
      .del()
      .then(function () {
         return knex('product_sizes').insert([
            {
               public: true,
               product_id: 1,
               order: 0,
               title: 7,
               price: 1400,
               diameter: 90,
               images: ['/static/media/8.8dc61bc0.jpg', '/static/media/8.8dc61bc0.jpg', '/static/media/8.8dc61bc0.jpg'],
               flowers: [19, 16, 15, 18]
            },
            {
               public: true,
               product_id: 3,
               order: 0,
               title: 6,
               price: 1800,
               diameter: 45,
               images: ['/static/media/4.760d10a2.jpeg'],
               flowers: [15, 18, 19, 16]
            },
            {
               public: false,
               product_id: 1,
               order: 1,
               title: 8,
               price: 4200,
               diameter: 86,
               images: ['/static/media/9.3482e43d.jpg', '/static/media/9.3482e43d.jpg'],
               flowers: [19, 18]
            },
            {
               public: true,
               product_id: 2,
               order: 1,
               title: 7,
               price: 4900,
               diameter: 45,
               images: ['/static/media/4.760d10a2.jpeg'],
               flowers: [15, 18]
            },
            {
               public: true,
               product_id: 2,
               order: 0,
               title: 6,
               price: 1800,
               diameter: 45,
               images: ['/static/media/4.760d10a2.jpeg'],
               flowers: [19, 15]
            }
         ])
      })
}

exports.config = { transaction: true }