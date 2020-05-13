exports.seed = function(knex) {
    return knex('product_sizes')
      .del()
      .then(function() {
          return knex('product_sizes').insert([
              {
                  product_id: 1,
                  city_id: 1,
                  public: true,
                  fast: false,
                  order: 0,
                  title: 8,
                  price: 1400,
                  diameter: 90,
                  flowers: [19, 16, 15, 18],
                  flowers_counts: [4, 3, 8, 19],
                  images: ['fd7835aa-ad88-4800-bd6f-0606b0079d68.jpeg', '2e05ff78-6b6c-4858-8336-3b9872184949.jpg']
              },
              {
                  product_id: 1,
                  city_id: 1,
                  public: true,
                  fast: false,
                  order: 0,
                  title: 6,
                  price: 1400,
                  diameter: 90,
                  flowers: [19, 16, 15, 18],
                  flowers_counts: [4, 3, 8, 19],
                  images: ['fd7835aa-ad88-4800-bd6f-0606b0079d68.jpeg', '2e05ff78-6b6c-4858-8336-3b9872184949.jpg']
              },
              {
                  product_id: 2,
                  city_id: 1,
                  public: true,
                  fast: false,
                  order: 0,
                  title: 7,
                  price: 6000,
                  diameter: 60,
                  flowers: [19, 15, 18],
                  flowers_counts: [4, 8, 19],
                  images: ['fd7835aa-ad88-4800-bd6f-0606b0079d68.jpeg', '2e05ff78-6b6c-4858-8336-3b9872184949.jpg']
              },
              {
                  product_id: 2,
                  city_id: 1,
                  public: true,
                  fast: false,
                  order: 0,
                  title: 6,
                  price: 9080,
                  diameter: 87,
                  flowers: [19, 16, 15],
                  flowers_counts: [4, 3, 8],
                  images: ['fd7835aa-ad88-4800-bd6f-0606b0079d68.jpeg', '2e05ff78-6b6c-4858-8336-3b9872184949.jpg']
              }
          ])
      })
}

exports.config = { transaction: true }